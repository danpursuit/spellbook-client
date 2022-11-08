import goldIcon from '../../../images/icons/gold.png';
import manaIcon from '../../../images/icons/mana.png';
import shieldIcon from '../../../images/icons/shield.png';
import shieldBreakIcon from '../../../images/icons/shieldBreak.png';
import commonFrame from '../../../images/icons/common_frame.png';
import rareFrame from '../../../images/icons/rare_frame.png';
import swordFrame from '../../../images/icons/swordframe_small_gray.png';
import pendantFrame from '../../../images/icons/pendant_small_gray.png';
import armorFrame from '../../../images/icons/armor_small_gray.png';
import gloveFrame from '../../../images/icons/glove_small_gray.png';
import shieldBubble from '../../../images/fx/shieldGlow.png';
import shieldLight from '../../../images/fx/shieldLight.png';
import shieldMedium from '../../../images/fx/shieldMedium.png';
import shieldHeavy from '../../../images/fx/shieldHeavy.png';
import shieldDivine from '../../../images/fx/shieldDivine.png';
import shieldImp from '../../../images/fx/shieldImp.png';
import { frameWidth } from './equipStyles';
import { keyframes } from "@emotion/react";
const myEffect = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const slideInLeft = keyframes`
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    50% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;
const slideInRight = keyframes`
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

export default {
    playerContainer: {
        maxWidth: '400px',
    },
    slideInLeft: {
        animation: `${slideInLeft} 1s ease-in-out`,
    },
    slideInRight: {
        animation: `${slideInRight} 0.5s ease-in-out`,
    },
    statBars: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },
    statBarOuter: {
        position: 'relative',
    },
    statBarText: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        px: 0.5,
        boxSizing: 'border-box',
    },
    usernameBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.5,
    },
    statusFx: {
        fontSize: '0.6rem',
        border: '1px solid black',
    },
    statusLoader: {
        position: 'absolute',
        backgroundColor: 'rgba(230,230,230,0.3)',
        height: '100%',
    },
    statBar: {
        height: '20px',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        transition: 'width 0.6s',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
    },
    statBarSmall: {
        height: '2px',
        borderRadius: 0,
    },
    gold: {
        backgroundImage: `url(${goldIcon})`,
        backgroundSize: 'contain',
        height: '20px',
        width: '20px',
        mx: 1
    },
    avatarContainer: {
        position: 'relative',
        // backgroundColor: 'yellow',
        // border: '1px solid black',
        height: '100%',
    },
    avatar: {
        height: '100%',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    },
    shieldBubble: {
        position: 'absolute',
        top: '0',
        left: '0%',
        height: '150%',
        width: '150%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${shieldBubble})`,
        transform: 'translate(-19%, -17%)',
        opacity: 0.7,
        transition: 'opacity 0.6s'
    },
    shieldLight: {
        backgroundImage: `url(${shieldLight})`,
    },
    shieldMedium: {
        backgroundImage: `url(${shieldMedium})`,
    },
    shieldHeavy: {
        backgroundImage: `url(${shieldHeavy})`,
    },
    shieldDivine: {
        backgroundImage: `url(${shieldDivine})`,
        filter: 'brightness(60%)'
    },
    shieldImp: {
        backgroundImage: `url(${shieldImp})`,
    },
    projectile: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1,
    },
    equipBoxes: {
        // backgroundColor: 'blue',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
    },
    equipRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    equipFrame: {
        width: `${frameWidth}px`,
        height: `${frameWidth}px`,
        backgroundSize: 'contain',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    commonFrame: {
        backgroundImage: `url(${commonFrame})`,
    },
    rareFrame: {
        backgroundImage: `url(${rareFrame})`,
    },
    swordFrame: {
        backgroundImage: `url(${swordFrame})`,
    },
    auxFrame: {
        backgroundImage: `url(${pendantFrame})`,
    },
    armorFrame: {
        backgroundImage: `url(${armorFrame})`,
    },
    gloveFrame: {
        backgroundImage: `url(${gloveFrame})`,
    },

    // command styles
    commandInput: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchHead: {
        display: 'flex',
        alignItems: 'center',
    },
    searchBar: {
        borderRadius: 0,
        flex: '1 1 auto',
    },
    results: {
    },
    result: {
        position: 'relative',
        display: 'flex',
        border: '0.4px solid #000000',
        backgroundColor: '#00e7f8',
    },
    searchDecorator: {
        backgroundColor: '#bbbbbb'
    },
    resultNumber: {
        backgroundColor: '#af8756',
        width: '20px',
        textAlign: 'right',
        paddingLeft: 2,
        paddingRight: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    resultCommand: {
        backgroundColor: '#1fa7e3',
        flex: '1 1 auto',
        paddingLeft: 1,
    },
    resultCommandSmall: {
        backgroundColor: '#1fa7e3',
        flex: '0 0 50px',
        paddingLeft: 1,
    },
    resultMove: {
        flex: '1 1 auto',
        paddingLeft: 1,
    },
    resultMoveCannotCast: {
        backgroundColor: '#999999',
    },
    resultHighlight: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 235, 253, 0.2)',
        zIndex: 10,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
    },
    resultCannotCast: {
        position: 'absolute',
        backgroundColor: 'rgba(180, 0, 0, 0.4)',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
    },
    resultCanCast: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 180, 0, 0.25)',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
    },
    resultStatus: {
        backgroundColor: '#4bb543',
        px: 1,
        flex: '0 0 100px',
        textAlign: 'right',
        borderLeft: '0.4px solid #000000',
        position: 'relative',
    },
    resultProgress: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#222222',
        zIndex: 2,
    },
    resultStatusCannotCast: {
        backgroundColor: 'transparent',
    },
    costBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 0.5
    },
    costIcon: {
        backgroundSize: 'contain',
        height: '20px',
        width: '20px',
        mx: 0.5,
    },
    costgold: {
        backgroundImage: `url(${goldIcon})`,
    },
    costmana: {
        backgroundImage: `url(${manaIcon})`,
    },
    narration: {
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        backgroundColor: '#d2b48c',
        height: '200px',
        width: '100%',
        my: 1,
        borderRadius: 2,
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
    },
    narrationHead: {
        py: 1,
        borderBottom: '1px solid #000000',
        textAlign: 'center',
        boxSizing: 'border-box',
        flex: '0 0 20px',
    },
    narrationEvents: {
        px: 1,
        py: 0.5,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        flex: '1 1 200px',
    },
    notif: {
        padding: 0.5,
        display: 'flex',
        flexWrap: 'wrap',
        // gap: 1,
    },
    gameOver: {
        fontWeight: 'bold',
        color: 'red',
    },
    notifProgress: {
        marginLeft: 'auto',
        backgroundColor: '#544556',
        flex: '0 0 50px',
        border: '2px solid #000000',
    },
    notifProgressInner: {
        height: '100%',
    },
    shieldIcon: {
        backgroundImage: `url(${shieldIcon})`,
        height: '20px',
        width: '20px',
        backgroundSize: 'contain',
    },
    shieldBreakIcon: {
        backgroundImage: `url(${shieldBreakIcon})`,
        height: '20px',
        width: '20px',
        backgroundSize: 'contain',
    },
    infoBar: {
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        backgroundColor: '#d2b48c',
        height: 'fit-content',
        width: '100%',
        borderRadius: 2,
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-start',
        px: 1,
        py: 1,
        gap: 2,
        flexDirection: 'column',
        zIndex: 3,
    },
    clock: {
        mx: 1,
        my: 0.5,
        color: '#00000080',
    },
    resultPagination: {
        mx: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    keyIcons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2
    },
    upDownArrows: {
        display: 'flex',
        flexDirection: 'column',
    },
    resultPaginationText: {
        marginLeft: 2
    }
}