import allMoves from '../../../constants/allMoves.json';
import mechanics from '../../../constants/mechanics.json';
import crimson from '../../../images/projectile/crimson.png';
import star from '../../../images/projectile/prayerStarShadow.png';
import drainSkull from '../../../images/projectile/drainSkull.png';
import shadowBlastProjectile from '../../../images/projectile/shadowBlastProjectile.png';
import shadowCrystal from '../../../images/projectile/shadowCrystal.png';
import fireHand from '../../../images/projectile/fireHand.png';
import fireOrb from '../../../images/projectile/fireOrb.png';
import shadowEye from '../../../images/icons/shadow/eye.png';
import shadowHeart from '../../../images/icons/shadow/heart.png';
import shadowDagger from '../../../images/icons/shadow/dagger.png';
import { css, keyframes } from "@emotion/react";

// playerAnimations are generated when player casts a move
// animations are either attached to player themselves (e.g. physical attack), or to a projectile (e.g. magic attack/buff)

const allMovesDict = {};
allMoves.cast.forEach((move) => {
    allMovesDict[move.fullName] = move;
});
allMoves.equip.forEach((move) => {
    allMovesDict[move.fullName] = move;
});

// player slamming into the opponent
const slam = (x, y) => keyframes`
    0% {
        transform: translate(0px, 0px);
    }
    10% {
        transform: translate(${x * -0.4}px, ${y * -0.1}px);
    }
    15% {
        transform: translate(${x * -0.4}px, ${y * -0.1}px);
    }
    50% {
        transform: translate(${x * 1.1}px, ${y * 1.1}px);
    }
    100% {
        transform: translate(0px, 0px);
    }
`;

// projectile lowering then flying at opponent
const fire = (x, y, i, projSize) => keyframes`
    0% {
        transform: translate(0px, 0px);
    }
    60% {
        transform: translate(${(-3 + 2 * i) * projSize / 2}px, ${projSize / 2}px);
    }
    80% {
        transform: translate(${x * 1.1}px, ${y * 1.1}px);
        opacity: 0.8;
    }
    100% {
        transform: translate(${x * 1.1}px, ${y * 1.1}px);
        opacity: 0;
    }
`;

// like fire, but for bigger projectiles
const rise = (x, y, projSize) => keyframes`
    0% {
        transform: translate(0px, 0px);
        opacity: 0;
    }
    85% {
        transform: translate(${0}px, ${30}px);
        opacity: 1;
    }
    93% {
        transform: translate(${1.1 * x}px, ${y}px) scale(0.9);
        opacity: 0.8;
    }
    100% {
        transform: translate(${1.1 * x}px, ${y}px) scale(0.7);
        opacity: 0;
    }
`;
// a projectile starting from the enemy
const drainSpacing = 46
const drain = (x, y, projSize, angle, hitPct = 93) => keyframes`
    0% {
        transform: translate(${1 * x + Math.cos(angle) * drainSpacing}px, ${y + Math.sin(angle) * drainSpacing + 20}px) scale(0.7);
        opacity: 0;
    }
    ${hitPct}% {
        transform: translate(${1.02 * x + Math.cos(angle) * drainSpacing}px, ${y + Math.sin(angle) * drainSpacing - 37}px) scale(1);
        opacity: 0.8;
    }
    100% {
        transform: translate(0px, 0px) scale(0.3);
        opacity: 0;
    }
`;

// a quick glitter around player (prayer shield)
const shine = (projSize) => keyframes`
    0% {
        transform: translate(0px, 0px);
        opacity: 0.5;
    }
    30% {
        transform: translate(${projSize}px, 0px) rotate(180deg) scale(1.2);
        opacity: 1;
    }
    60% {
        transform: rotate(360deg);
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

// a projectile getting sucked into player, as a buff
const inhale = (projSize, angle) => keyframes`
    0% {
        transform: translate(${Math.cos(angle) * projSize}px, ${Math.sin(angle) * projSize}px);
        opacity: 0.5;
    }
    80% {
        transform: translate(0px, 0px) scale(0.4);
        opacity: 1;
    }
    100% {
        transform: translate(0px, 0px) scale(0.2);
        opacity: 0;
    }
`;

const glyph = (projSize) => keyframes`
0% {
    transform: translate(0px, -80px) scale(0.95);
    opacity: 0.01;
}
5% {
    transform: translate(0px, -80px) scale(0.95);
    opacity: 0.2;
}
15% {
    transform: translate(0px, 10px);
    opacity: 0.5;
}
34% {
    transform: translate(0px, 0px);
    opacity: 0.7;
}
67% {
    transform: translate(0px, 0px);
    opacity: 0.7;
}
100% {
    transform: translate(0px, 0px);
    opacity: 0;
}
`;

const createPrayerStar = (endTime) => {
    const projSize = 40;
    const animationLength = 1000;
    const animationStartup = endTime - animationLength;
    return {
        style: {
            animation: `${shine(projSize)} ${animationLength}ms ease-in-out forwards`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: `${projSize}px`,
            width: `${projSize}px`,
            backgroundImage: `url(${star})`,
            top: 0,
            right: '20%',
        },
        animationLength,
        animationStartup,
    }
}
const createCrystal = (endTime, degrees, sprite) => {
    const projSize = 40;
    const animationLength = 800;
    const animationStartup = endTime - animationLength;
    return {
        style: {
            animation: `${inhale(projSize, degrees * Math.PI / 180)} ${animationLength}ms ease-in-out forwards`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: `${projSize}px`,
            width: `${projSize}px`,
            backgroundImage: `url(${sprite})`,
            top: `calc(50% - ${projSize / 2}px)`,
            left: `calc(50% - ${projSize / 2}px)`,
        },
        animationLength,
        animationStartup,
    }
}
const createSkull = (x, y, animationLength, endTime, degrees) => {
    const projSize = 80;
    const animationStartup = endTime - animationLength;
    const hitPct = Math.round((1 - (600 / animationLength)) * 100)
    // console.log('hitPct', hitPct, degrees);
    return {
        style: {
            animation: `${drain(x, y, projSize, degrees * Math.PI / 180, hitPct)} ${animationLength}ms ease-in-out forwards`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: `${projSize}px`,
            width: `${projSize}px`,
            backgroundImage: `url(${drainSkull})`,
            top: `calc(50% - ${projSize / 2}px)`,
            left: `calc(50% - ${projSize / 2}px)`,
        },
        animationLength,
        animationStartup,
    }
}
export const createGlyph = (sprite, castTime, projSize = 250, offsetY = 0, animationLength = 2000) => {
    const animationStartup = castTime;
    return {
        style: {
            animation: `${glyph(projSize)} ${animationLength}ms ease-in-out forwards`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: `${projSize}px`,
            width: `${projSize}px`,
            backgroundImage: `url(${sprite})`,
            top: `calc(50% - ${projSize / 2 + offsetY}px)`,
            left: `calc(50% - ${projSize / 2}px)`,
        },
        animationLength,
        animationStartup,
    }
}

const getPlayerAnimation = ({ moveName, castTime }, playerBox, enemyBox) => {
    const x = enemyBox.x - playerBox.x;
    const y = enemyBox.y - playerBox.y;
    const move = allMovesDict[moveName];

    let projSize, animationLength, animationStartup, leakTime, endTime;
    let projectiles = [];
    if (move.tags[mechanics.effectType.equip]) {
        return {}
    } else if (move.tags[mechanics.effectType.physicalDamage]) {
        return {
            animation: { animation: `${slam(x, y)} 0.5s ease-in-out forwards` },
            animationLength: 500,
            animationStartup: castTime - 250
        }
    } else if (move.tags[mechanics.effectType.magicalDamage]) {
        if (move.name === 'crimsonSplinters') {
            projSize = 40;
            animationLength = 2500;
            leakTime = 500;
            animationStartup = castTime - animationLength + leakTime
            return {
                animation: { animation: '' },
                animationLength,
                animationStartup,
                projectiles: [
                    {
                        style: {
                            animation: `${fire(x, y, 0, projSize)} ${animationLength}ms ease-in-out forwards`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: `${projSize}px`,
                            width: `${projSize}px`,
                            backgroundImage: `url(${crimson})`,
                        },
                        animationLength,
                        animationStartup,
                        // top: `calc(50% - ${projSize / 2}px)`,
                        // left: `calc(50% - ${projSize / 2}px)`,
                    },
                    {
                        style: {
                            animation: `${fire(x, y, 1, projSize)} ${animationLength - 100}ms ease-in-out forwards`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: `${projSize}px`,
                            width: `${projSize}px`,
                            backgroundImage: `url(${crimson})`,
                            animationDelay: `200ms`,
                        },
                        animationLength,
                        animationStartup,
                        // top: `calc(50% - ${projSize / 2}px)`,
                        // left: `calc(50% - ${projSize / 2}px)`,
                    },
                    {
                        style: {
                            animation: `${fire(x, y, 2, projSize)} ${animationLength - 100}ms ease-in-out forwards`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: `${projSize}px`,
                            width: `${projSize}px`,
                            backgroundImage: `url(${crimson})`,
                            animationDelay: `400ms`,
                        },
                        animationLength,
                        animationStartup,
                        // top: `calc(50% - ${projSize / 2}px)`,
                        // left: `calc(50% - ${projSize / 2}px)`,
                    }
                ]
            }
        } else if (move.name === 'prayerBlast') {
            projSize = 100;
            animationLength = 4700;
            animationStartup = castTime - animationLength + 100
            return {
                animation: { animation: '' },
                animationLength,
                animationStartup,
                projectiles: [
                    {
                        style: {
                            animation: `${rise(x, y, projSize)} ${animationLength}ms ease-in-out forwards`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: `${projSize}px`,
                            width: `${projSize}px`,
                            backgroundImage: `url(${shadowBlastProjectile})`,
                            top: 0,
                            left: 0,
                        },
                        animationLength,
                        animationStartup,
                    },
                    createPrayerStar(1000)
                ]
            }
        } else if (move.name === 'drainSoul') {
            animationLength = 3000;
            endTime = castTime + 600;
            const timeSpace = 500;
            return {
                projectiles: [
                    createSkull(x, y, animationLength, endTime, 0),
                    createSkull(x, y, animationLength - timeSpace, endTime, 120),
                    createSkull(x, y, animationLength - timeSpace - timeSpace, endTime, 240),
                ]
            }
        }
    } else if (move.tags[mechanics.castEffect.buff]) {
        if (move.tags[mechanics.alignment.shadow]) {
            let crystalNum = 0;
            while (castTime - (-500 + crystalNum * 85 + crystalNum * crystalNum * 4) > 800 || crystalNum < 3) {
                projectiles.push(createCrystal(castTime - (-500 + crystalNum * 85 + crystalNum * crystalNum * 4), (180 + crystalNum * 135) % 360, shadowCrystal));
                crystalNum += 1
            }
        }
        if (move.tags[mechanics.alignment.fire]) {
            let crystalNum = 0;
            while (castTime - (-500 + crystalNum * 85 + crystalNum * crystalNum * 4) > 800 || crystalNum < 3) {
                projectiles.push(createCrystal(castTime - (-500 + crystalNum * 85 + crystalNum * crystalNum * 4), (180 + crystalNum * 135) % 360, fireOrb));
                crystalNum += 1
            }
        }
        if (move.name === 'corruptedPossessions') {
            projectiles.push(createGlyph(shadowEye, castTime));
        } else if (move.name === 'bleedingHeart') {
            projectiles.push(createGlyph(shadowHeart, castTime, 200, 20));
        } else if (move.name === 'prayerUltimatum') {
            projectiles.push(createGlyph(shadowDagger, castTime, 175, 10));
        } else if (move.name === 'hotHanded') {
            projectiles.push(createGlyph(fireHand, castTime, 180));
        }
        return { projectiles }
    } else if (move.tags[mechanics.castEffect.prayer]) {
        projSize = 40;
        animationLength = 1000;
        animationStartup = castTime - animationLength + 100;
        return {
            projectiles: [createPrayerStar(castTime + 100)]
        }
    }
    // console.log('unknown move', moveName);
    return {}
}

export default getPlayerAnimation;