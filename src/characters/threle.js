import bg from '../images/chars/threle/bg.png';
import sprite from '../images/chars/threle/sprite.png';
import mechanics from '../constants/mechanics.json';
import colors from '../constants/colors';

export default {
    fullName: 'Threle',
    name: 'threle',
    alignment: mechanics.alignment.shadow,
    classType: mechanics.classType.priest,
    characterSelectStyles: {
        container: {
            backgroundImage: `url(${bg})`,
            backgroundPosition: '70% 0%',
        },
        sprite: {
            top: '20%',
            height: '80%',
            backgroundImage: `url(${sprite})`,
        },
        glow: {
            top: '70%',
            color: '#98d',
        }
    },
    avatarStyles: {
        avatar: {
            backgroundImage: `url(${sprite})`,
        }
    },
    bg,
    sprite,
    lore: 'Disciples of the dark deity Hecate are intimately aware of the fine balance between power and sacrifice. In order to fuel her obsession for magic and beauty, Threle searches relentlessly for mortal souls to satiate her liege, lest she one day be claimed as well...',
    strategy: () => [`As a priest with incredibly powerful spells that scale with`, colors.statSpan(mechanics.stat.psyche, `PSY (psyche)`, 'bold'), `and`, colors.statSpan(mechanics.stat.divinity, `DIV (divinity),`, 'bold'), `Threle owns the late game. her damage is primarily magic based, completely ignoring enemy`, colors.boldSpan(`armor`), `— though opposing priests with high psyche will be resistant. A priest's primary challenge is getting to a high enough`, colors.boldSpan(`DIV`), `where their spells can quickly win the game, as they are constrained on multiple fronts—low HP, expensive spells, and long cast times.

Threle compensates for this weakness with an incredible early game tool in the form of`, colors.italicSpan(`Prayer - Shield.`), `This is a fast, cheap spell that creates stronger shields with each use, while strengthening her connection to`, colors.statSpan(mechanics.alignment.shadow, `Hecate`, 'bold'), `(read: increases DIV). Be sure to`, colors.italicSpan(`Dissipate`), `your shield before attacking though - the shield will contain magical attacks, causing them to reflect and cause recoil damage. Piloting a priest is a complex game that requires juggling your prayer shield for defense while dropping it on occasion to push damage through; or finding clever ways to use recoil to your advantage.
    
Threle's`, colors.statSpan(mechanics.alignment.shadow, `shadow alignment`, 'bold'), `fits her priesthood like a glove.`, colors.italicSpan(`Drain Soul`), `allows her to stabilize sooner by stealing HP from the opponent, while`, colors.italicSpan(`Bleeding Heart`), `can vastly accelerate her DIV gain, if she takes damage during the move's effect.`, colors.italicSpan(`Corrupted Possessions`), `allows her to curse her enemy's equipment while enhancing her DIV for each item equipped—enhance enough item slots, and she can obtain the coveted 100% damage reduction shield.
    
If she can reach 100 DIV, Threle gains a new tool in`, colors.italicSpan(`Prayer - Ultimatum.`), `This move sacrifices her divine powers for an unholy ritual knife that puts Valiant physical attacks to shame. She can then finish the opponent off with several quick slashes, while taking no recoil from her shield.
    `]
}