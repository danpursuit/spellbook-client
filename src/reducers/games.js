import { JOIN_BATTLE_ROOM, GAME_NOTIF, GAME_OVER, FINDING_GAME, CLIENT_CAST_MOVE, GAME_UPDATE, GAME_STEP, LEAVE_BATTLE_ROOM, NEW_CHALLENGER, CLEAR_CHALLENGER } from '../constants/actionTypes';
import CastLogic from '../gameLogic/CastLogic';

// manages games
export default (state = { games: {}, local: {}, findingGame: false, ts: null, gamesPlayed: 0, challenger: null }, action) => {
    let game, update, player, move, local;
    try {
        switch (action.type) {
            case FINDING_GAME:
                return { ...state, findingGame: true };
            case LEAVE_BATTLE_ROOM:
                // delete game from state
                game = state.games[action.roomName];
                if (state.games[action.roomName]) {
                    delete state.games[action.roomName];
                }
                if (state.local[action.roomName]) {
                    delete state.local[action.roomName];
                }
                return { ...state, games: { ...state.games }, local: { ...state.local } };
            case JOIN_BATTLE_ROOM:
                if (!state.games[action.game.id]) {
                    return { ...state, games: { ...state.games, [action.game.id]: action.game }, local: { ...state.local, [action.game.id]: { notifs: [], animations: [], p1: { animation: null }, p2: { animation: null } } }, findingGame: false };
                }
                return state
            case CLIENT_CAST_MOVE:
                // locally update player when move is cast
                player = action.player;
                move = action.move;
                game = state.games[action.gameId];
                const localPlayer = game.p1.username === player.username ? game.p1 : game.p2;
                const localEnemy = game.p1.username === player.username ? game.p2 : game.p1;
                const castInfo = CastLogic.castMove(localPlayer, localEnemy, move);
                const { res, effects, actionTime, castTime } = castInfo;
                if (!res) {
                    console.log('move failed', move.name, castInfo);
                    return;
                }
                game.p1.username === player.username ? CastLogic.resolveEffects(game.p1, game.p2, effects) : CastLogic.resolveEffects(game.p1, game.p2, effects);
                return { ...state, games: { ...state.games, [action.gameId]: game } };
            case GAME_UPDATE:
                game = action.update;
                // fastforward game using its updates
                game.ts = Date.now();
                while (game.updates.length > 0 && game.updates[0].ts < game.ts) {
                    update = game.updates.shift();
                    game.p1 = update.p1;
                    game.p2 = update.p2;
                    game.updateNum = update.updateNum;
                }
                return { ...state, games: { ...state.games, [action.gameId]: game } };
            case GAME_NOTIF:
                game = state.games[action.gameId];
                local = state.local[action.gameId];
                if (game && local) {
                    // sample: {action: 'equips', actionTime: 1665801269922, castTime: 1000, username: 'dan', moveName: 'Questing Dagger'}
                    local.notifs = [...local.notifs, action.notif];
                    if (action.notif.moveName) {
                        if (action.notif.username === game.p1.username) {
                            local.p1.animation = action.notif;
                        } else if (action.notif.username === game.p2.username) {
                            local.p2.animation = action.notif;
                        }
                    }
                    return { ...state, local: { ...state.local, [action.gameId]: local } };
                }
                return state;
            case GAME_STEP:
                // process updates for all games
                const newTs = Date.now();
                const games = { ...state.games };
                Object.keys(games).forEach(gameId => {
                    game = games[gameId];
                    // process all updates with ts <= newTs
                    while (game.updates.length > 0 && game.updates[0].ts <= newTs) {
                        update = game.updates.shift();
                        update.fromP1 ? CastLogic.resolveEffects(game.p1, game.p2, update.effects) : CastLogic.resolveEffects(game.p2, game.p1, update.effects);
                        game.updateNum = update.updateNum;
                        game.ts = newTs;
                    }
                });

                // process local animations for all games
                const localGames = { ...state.local };
                Object.keys(localGames).forEach(gameId => {
                    local = localGames[gameId];
                    local.animations.filter(animation => animation.startTime <= newTs).forEach(animation => {
                        local[animation.userNum].animation = animation;
                    })
                    local.animations = local.animations.filter(animation => animation.startTime > newTs);
                });
                return { ...state, games, ts: newTs, local: localGames };
            case GAME_OVER:
                return { ...state, gamesPlayed: state.gamesPlayed + 1 };
            case NEW_CHALLENGER:
                return { ...state, challenger: action.challengerName };
            case CLEAR_CHALLENGER:
                return { ...state, challenger: null };
            default:
                return state;
        }
    } catch (e) {
        console.log('error in game reducer', e, action);
    }
}