import bg from '../images/chars/chaze/bg.png';
import sprite from '../images/chars/chaze/sprite.png';
import mechanics from '../constants/mechanics.json';
import colors from '../constants/colors';

export default {
    fullName: 'Chaze XS',
    name: 'chaze',
    alignment: mechanics.alignment.fire,
    classType: mechanics.classType.valiant,
    characterSelectStyles: {
        container: {
            backgroundImage: `url(${bg})`,
            backgroundPosition: '20% 0%',
        },
        sprite: {
            top: '10%',
            height: '90%',
            backgroundImage: `url(${sprite})`,
        },
        glow: {
            top: '70%',
            color: '#faa'
        }
    },
    avatarStyles: {
        avatar: {
            backgroundImage: `url(${sprite})`,
        }
    },
    bg,
    sprite,
    lore: 'Valiant warriors are always bad to the bone. Even so, Venus is smitten by their courage in battle, and smiles upon them with blessings of fire. Chaze has been killing and pillaging long before some love deity came along to dub him “extra spicy”. Though, he doesn’t mind being able to burn his enemies to a crisp.',
    strategy: () => [`Valiants focus on physical damage, which scales with their `, colors.statSpan(mechanics.stat.attack, `ATK (attack)`, 'bold'), `. Equipping any weapon gives you the ability to slash your opponents with fast, efficient attacks.`, colors.statSpan(mechanics.alignment.fire, `Fire alignment`), `gives you mana disruption in the form of mana burn, and a burning splinter attack that melts shields.

Chaze XS is a`, colors.boldSpan(`rushdown`), `character that focuses on pressuring the opponent's health total early. His gains fire`, colors.boldSpan(`DIV (divinity)`), `with his attacks, which in turn raises his power level, letting him burn his opponents out of the game before they come online. Tools like`, colors.italicSpan(`Pillage`), `and`, colors.italicSpan(`Mana Burn`), `let him deny at the opponent's resources, so that slower opponents will be totally locked out of the game. He also has a magical splinter attack that excels at quick chip damage. His fire variant is a weak multihit that deals 10x shield damage, perfect for pesky priests that rely on shields for defense.
    
Like all valiants, he has`, colors.boldSpan(`equipment`), `for a variety of situations, and gains access to equipment upgrades once he reaches 10 DIV. Look out for a blessing from`, colors.statSpan(mechanics.alignment.fire, `Venus`, 'bold'), `that is instant and free! Equipment adds a new dimension to your strategy—depending on the opponent, Chaze can still go all in on early offense with`, colors.italicSpan(`Flame Slash`), `and other fire tools, or he can opt for a stronger late game equipment build before spending mana.

Fast, aggressive, and tanky, Chaze XS is a great character for players learning the mechanics of the game.`]

}