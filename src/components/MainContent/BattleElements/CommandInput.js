import { Box, Input, Typography, CircularProgress } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react'

import { WebSocketContext } from '../../../WebSocket';
import { editDistance } from './utils';
import allMoves from '../../../constants/allMoves.json';
import styles from './styles';
import MoveSearchResult from './MoveSearchResult';

import Fuse from 'fuse.js'
import CastLogic, { Fail } from '../../../gameLogic/CastLogic'
import InfoBar from './InfoBar';
import KeyIcons from './KeyIcons';

// CommandInput is the component that allows the user to type in a command and see the results
// A rather complex component that handles search logic, user input, and references game logic to determine if a move is valid

// the first word of any command needs to be a command
const commands = Object.keys(allMoves).map(s => s.toLowerCase()).sort();

const allMovesList = [...allMoves.cast, ...allMoves.equip];
const resultsPerPage = 5;
const numDisplayedResults = (searchData) => {
    return Math.min(searchData.results.length - searchData.page * resultsPerPage, resultsPerPage);
}
const parseInput = (input) => {
    for (let i = 0; i < commands.length; i++) {
        if (input.toLowerCase().startsWith(commands[i])) {
            return { command: commands[i], input: input.slice(commands[i].length) };
        }
    }
    return { command: '', input };
}
const CommandInput = ({ player, opponent, gameId, ts }) => {
    const ws = React.useContext(WebSocketContext);

    const [availableMoves, setAvailableMoves] = useState(allMovesList.filter(move => CastLogic.playerMeetsBaseRequirements(player, move)))

    // the search functionality originally used edit distance as a (bad) heuristic, but now uses the awesome fuse.js
    const [fuse, setFuse] = useState({
        cast: new Fuse(availableMoves.filter(move => move.command === 'cast'), { keys: ['name', 'fullName'], threshold: 0.8 }),
        equip: new Fuse(availableMoves.filter(move => move.command === 'equip'), { keys: ['name', 'fullName'], threshold: 0.8 }),
        all: new Fuse(availableMoves, { keys: ['name', 'fullName'], threshold: 0.8 })
    })
    const getResults = (command, input) => {
        if (command === '') {
            // if input is empty or one letter, display commands only
            if (input.length == 0)
                return { results: commands, resultType: 'command' };
            if (input.length == 1 || commands.find(c => c.startsWith(input)))
                return { results: commands.sort((a, b) => editDistance(a, input) - editDistance(b, input)), resultType: 'command' };

            // otherwise, use fuse to find closest matches
            const filteredValue = input.toLowerCase();
            return {
                // results: availableMoves.sort((a, b) => editDistance(filteredValue, a.commandName) - editDistance(filteredValue, b.commandName)),
                results: fuse.all.search(filteredValue).map(result => result.item),
                resultType: 'move'
            }
        } else {
            // if command is given, search within that command
            const filteredValue = input.toLowerCase();
            if (input.length === 0) {
                return {
                    results: allMoves[command.toLowerCase()].filter(move => CastLogic.playerMeetsBaseRequirements(player, move)).sort((a, b) => (a.priority || 1000) - (b.priority || 1000)),
                    resultType: 'move'
                }
            }
            return {
                results: fuse[command.toLowerCase()].search(filteredValue).map(result => result.item),
                resultType: 'move'
            }
        }
    }
    const { results: defaultResults, resultType: defaultResultType } = getResults('', '');
    const [search, setSearch] = React.useState({
        command: '',
        input: '',
        results: defaultResults,
        resultType: defaultResultType,
        page: 0,
        selectIndex: 0,
        submit: false,
    });
    const [lastBackspace, setLastBackspace] = React.useState(null);
    const [selectionAnimation, setSelectionAnimation] = React.useState({
        ts: null,
        type: null,
    });
    const [searchDecoratorAnimation, setSearchDecoratorAnimation] = React.useState({
        ts: null,
        type: null,
    });
    const castMove = (move) => {
        const req = CastLogic.playerCanCast(player, move);
        if (req.res) {
            ws.castMove(gameId, player, move);
        } else {
            console.log(req);
        }
        return req
    }
    const submitMove = (move) => {
        const { res, reason } = castMove(move)
        if (res) {
            setSelectionAnimation({
                ts: Date.now(),
                type: 'move',
            });
        } else {
            if (reason === Fail.alreadyCasting) {
                setSearchDecoratorAnimation({
                    ts: Date.now(),
                    type: 'error',
                });
            } else {
                setSelectionAnimation({
                    ts: Date.now(),
                    type: 'error',
                });
            }
        }
        setSearch({
            ...search,
            submit: false,
        });
    }
    const submitCommand = (command) => {
        const input = '';
        const { results, resultType } = getResults(command, input);
        setSearch({
            ...search,
            input,
            command,
            results,
            resultType,
            selectIndex: 0,
            page: 0,
            submit: false,
        });
    }
    const submitSearch = () => {
        if (search.resultType === 'move') {
            submitMove(search.results[search.page * resultsPerPage + search.selectIndex])
        } else {
            submitCommand(search.results[search.page * resultsPerPage + search.selectIndex]);
        }
    }
    useEffect(() => {
        if (search.submit) {
            submitSearch();
        }
    }, [search.submit]);
    const selectionBorder = () => {
        if (!selectionAnimation.ts || ts - selectionAnimation.ts > 330) return '2px solid #0000ff';
        if (selectionAnimation.type === 'move') {
            if (Math.floor((ts - selectionAnimation.ts) / 100) % 2 === 0) return '2px solid #00ff00';
            return '2px solid #ffffff';
        } else if (selectionAnimation.type === 'error') {
            if (Math.floor((ts - selectionAnimation.ts) / 100) % 2 === 0) return '2px solid #ff0000';
            return '2px solid #ffffff';
        }
    }
    const decoratorBorder = () => {
        if (!searchDecoratorAnimation.ts || ts - searchDecoratorAnimation.ts > 330) return '';
        if (searchDecoratorAnimation.type === 'error') {
            if (Math.floor((ts - selectionAnimation.ts) / 100) % 2 === 0) return '2px solid #ff0000';
            return '2px solid #ffffff';
        }
    }

    const handleSearch = (e) => {
        if (search.command === '') {
            //see if we can retrieve command from input
            const { command, input } = parseInput(e.target.value);
            const { results, resultType } = getResults(command, input);
            setSearch({
                ...search,
                command,
                input,
                results,
                resultType
            });
        } else {
            //otherwise, just update input
            const input = e.target.value;
            const command = search.command;
            const { results, resultType } = getResults(command, input);
            setSearch({
                ...search,
                command,
                input,
                results,
                resultType
            });
        }
    }
    return (
        <Box sx={styles.commandInput}>
            {/* <Box>{`here"${player.actionTime && ts < player.actionTime + player.castTime}"`}</Box> */}
            <Box sx={styles.inputContainer}>
                <Typography sx={{ ...styles.resultNumber, ...styles.searchDecorator, border: decoratorBorder() }}>
                    {(player.actionTime && ts < player.actionTime + player.castTime) ? <CircularProgress size={20} color='error' /> : <ArrowForwardIosIcon sx={{ color: 'green' }} />}
                </Typography>
                <Typography sx={{ ...(search.command && styles.resultCommandSmall), ...styles.searchHead }}>
                    {search.command.length > 0 ? search.command.charAt(0).toUpperCase() + search.command.slice(1) + ':' : ''}
                </Typography>
                <Input disableUnderline autoFocus autoComplete='off'
                    sx={styles.searchBar}
                    value={search.input}
                    onChange={handleSearch}
                    onKeyDown={(e) => {
                        // double backspace allows user to clear input
                        // removed because users thought it was annoying
                        // if (e.key === 'Backspace') {
                        //     if (lastBackspace && Date.now() - lastBackspace < 500) {
                        //         setSearch({
                        //             ...search,
                        //             command: '',
                        //             input: '',
                        //             results: defaultResults,
                        //             resultType: defaultResultType,
                        //             page: 0,
                        //             selectIndex: 0,
                        //         });
                        //         return false;
                        //     }
                        //     setLastBackspace(Date.now());
                        // } else {
                        //     setLastBackspace(null);
                        // }

                        if (e.key === 'Backspace' && search.input === '' && search.command !== '') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                command: '',
                                input: '',
                                results: defaultResults,
                                resultType: defaultResultType,
                                page: 0,
                                selectIndex: 0,
                            });
                        } else if (e.key === 'Tab') {
                            e.preventDefault();
                            // set search to selected result
                            const targetMove = search.results[search.page * resultsPerPage + search.selectIndex];
                            const command = search.resultType === 'move' ? targetMove.command : targetMove;
                            const input = search.resultType === 'move' ? targetMove.fullName : '';
                            const { results, resultType } = getResults(command, input);
                            setSearch({
                                ...search,
                                input,
                                command,
                                results,
                                resultType,
                                selectIndex: 0,
                                page: 0,
                            });
                        } else if (e.key == '0') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                command: '',
                                input: '',
                                results: defaultResults,
                                resultType: defaultResultType,
                                page: 0,
                                selectIndex: 0,
                            });
                            return false;
                        } else if (e.key > '0' && e.key <= '9') {
                            e.preventDefault();
                            const num = parseInt(e.key);
                            if (num <= numDisplayedResults(search)) {
                                setSearch({
                                    ...search,
                                    selectIndex: num - 1,
                                    submit: true,
                                });
                            }
                        } else if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                selectIndex: 0,
                                page: Math.max(search.page - 1, 0)
                            });
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                selectIndex: 0,
                                page: Math.min(search.page + 1, Math.ceil(search.results.length / resultsPerPage) - 1)
                            });
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                selectIndex: search.selectIndex > 0 ? search.selectIndex - 1 : numDisplayedResults(search) - 1
                            });
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setSearch({
                                ...search,
                                selectIndex: search.selectIndex < numDisplayedResults(search) - 1 ? search.selectIndex + 1 : 0
                            });
                        } else if (e.key === 'Enter') {
                            e.preventDefault();
                            submitSearch();
                        }
                        e.target.selectionStart = e.target.value.length;
                        return false;
                    }}
                />
            </Box>
            <Box sx={styles.results}>
                {search.resultType === 'move' ?
                    search.results.slice(search.page * resultsPerPage, search.page * resultsPerPage + resultsPerPage).map((move, index) =>
                        <MoveSearchResult key={move.name} move={move} index={index} search={search} player={player} ts={ts} border={index === search.selectIndex ? selectionBorder() : ''} />) :
                    search.results.map((command, index) => <Box key={command} sx={styles.result}>
                        {index === search.selectIndex && <Box sx={{ ...styles.resultHighlight, border: selectionBorder() }} />}
                        <Typography sx={styles.resultNumber}>{index + 1}.</Typography>
                        <Typography sx={styles.resultCommand}>{command} _____</Typography>
                    </Box>)}
            </Box>
            <InfoBar player={player} opponent={opponent} selection={search.results[search.page * resultsPerPage + search.selectIndex]} />
            <KeyIcons page={search.page + 1} maxPage={Math.ceil(search.results.length / resultsPerPage)} />

        </Box>
    )
}

export default CommandInput