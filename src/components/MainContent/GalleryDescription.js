import { Typography } from '@mui/material'
import React from 'react'

// Used by welcome screen to display a description of the selected item

const style = {
    display: 'flex',
    padding: 1,
    boxSizing: 'border-box',
    marginBottom: 2,
    borderRadius: 2,
    display: 'block',
    whiteSpace: 'pre-wrap',
    backgroundColor: theme => theme.palette.primary.light + theme.palette.transparencyHigh,
}

const names = {
    'dagger': 'Questing Dagger',
    'sword': 'Questing Sword',
    'mystical': 'Mystical Gauntlets',
    'blacksmiths': 'Blacksmiths Gloves',
    'steelChestplate': 'Steel Chestplate',
    'ceremonialGarb': 'Ceremonial Garb',
    'goldPendant': 'Gold Pendant',
    'hellslicer': 'Hellslicer',
    'magmaticBarbs': 'Magmatic Barbs',
    'eternalFlame': 'Eternal Flame',
    'gashGray': 'Slash',
    'gashRed': 'Flame Slash',
    'pillage': 'Pillage',
    'crimson': 'Crimson Splinters',
    'boom': 'Mana Burn',
    'fireHand': 'Hot Handed',
    'star': 'Prayer - Shield',
    'starGray': 'Prayer - Shield (Dissipate)',
    'shadowBlastProjectile': 'Prayer - Blast (Shadow)',
    'shadowBlastExplosion': 'Prayer - Blast (Shadow)',
    'drainSkull': 'Drain Soul',
    'shadowEye': 'Corrupted Possessions',
    'shadowHeart': 'Bleeding Heart',
    'shadowDagger': 'Prayer - Ultimatum'
}
const descriptions = {
    'dagger': 'A simple dagger available to all classes. Though it does not provide much attack, it gives the user access to Slash, a fast physical damage attack. Physical attacks will also be slightly faster than the sword.',
    'sword': 'A basic sword for valiants that can later be upgraded into the Hellslicer. Much stronger than the dagger, but slower to equip and more expensive.',
    'mystical': 'A pair of gauntlets for the Shadow alignment. Offers a solid boost to PSY (psyche), which amplifies the user\'s magical damage while also providing resistance to enemy magic attacks.',
    'blacksmiths': 'A pair of gloves for the Fire alignment. Offers a small boost to ATK (attack), which amplifies the user\'s physical damage, and a small boost to armor, which provides resistance to enemy physical attacks. Gloves allow valiants to perform Splinter attacks, which are magical attacks exquisitely suited for harassing casters.',
    'steelChestplate': 'A basic chestplate for valiants that can later be upgraded (fire alignment only) into Magmatic Barbs. Offers a great boost to armor, which provides resistance to enemy physical attacks.',
    'ceremonialGarb': 'A basic robe for priests that provides a little armor and enhances divinity effects. Though priests don\'t have much time to accessorize, Ceremonial Garb is an essential for survivability and stronger Prayer Blasts/Shields.',
    'goldPendant': 'A gold necklance that instantly restores and increases the user\'s max mana by 100. Mana is a valuable resource for all classes, so that priests and valiants alike can put the Gold Pendant to good use.',
    'hellslicer': 'A powerful sword available to Chaze once he reaches 10 DIV and has equipped the Questing Sword. Offers even more attack, and allows his basic attacks to destroy shields.',
    'magmaticBarbs': 'A powerful chestplate available to Chaze once he reaches 10 DIV and has equipped the Steel Chestplate. Offers an absurd amount of armor, allows his physical attacks to burn mana. A large investment to make, but wreaks havoc once equipped.',
    'eternalFlame': 'A powerful auxilliary item available to Chaze once he reaches 10 DIV. Venus\'s blessing in physical form, the Eternal Flame skyrockets his attack based on his current divinity. Equipping this is fast and free, allowing experienced users to toggle between this item\'s attack boost and Gold Pendant\'s mana refresh.',
    'gashGray': 'A basic physical attack available to all classes once a slashing weapon is equipped. Deals a small amount of damage based on the user\'s ATK, but is fast and can be used to harass, break shields, or close games out.',
    'gashRed': 'Similar to the Slash, but costs a bit of mana. In return, Flame Slash packs extra fiery damage based on the user\'s DIV (divinity), while raising the user\'s DIV at the same time.',
    'pillage': 'A universal attack for valiants. Weaker than the Slash, but steals gold from the enemy equal to damage dealt. Can be used to deny gold from the enemy, or farm gold for the user.',
    'crimson': 'A magical attack available to valiants with gloves equipped. Deals damage three times in rapid succession while also dealing extra shield damage. Each splinter guarantees a minimum amount of damage, and can be further enhanced by the user\'s PSY (psyche) and DIV (divinity).',
    'boom': 'A powerful physical fire attack that burns mana based on the opponent\'s PSY (psyche) while also raising the user\'s DIV. Has a much longer cast time and cooldown when compared to other Valiant attacks, but can seriously hamper a priest\'s plans.',
    'fireHand': 'A fast, cheap enchantment available to Chaze with gloves equipped. Enhances all fire attacks, which can be the make or break when racing other valiants for damage.',
    'star': `The bread and butter for all priests. Shield fast, shield often. Prayer - Shield will boost the user\'s DIV (divinity), then create a shield that absorbs damage equal to 0.8x the user\'s DIV, and has a max health equal to 10x the user\'s PSY (psyche). Damaged shields will proportionately allow more damage through, but casting a new shield will restore it to max health.
    
Proper shield management is the key to winning games as a priest. Shields should be dissipated before using strong magical attacks, as they will cause recoil damage to the user. Though divinity caps out at 100, allowing for a maximum of 80% damage reduction, using divinity enhancing effects can bring the user\'s shield to a legendary 100% damage reduction!`,
    'shadowBlastProjectile': 'A destructive magical attack that scales with the user\'s PSY (psyche) and, more importantly, DIV (divinity). Once a priest reaches a high amount of DIV, they can often end the game with a series of Prayer Blasts, interwoven between temporary Prayer Shields to keep themselves alive.',
    'drainSkull': 'A magical attack for shadow priest Threle. Deals damage based on the user\'s PSY (psyche) and DIV (divinity), and also heals for the damage dealt. Costs more mana than Prayer - Blast, but can after coming online, Threle can utilize Drain Soul to get out of an aggro player\'s burn range .',
    'shadowEye': 'A shadow spell that corrupts all items both players have equipped. For Threle, this provides a boost to divinity effects; for non-shadow alignments, a negative boost to divinity effects. Great for punishing any opponents that would contest Threle in an arms race.',
    'shadowHeart': 'A shadow spell that grants the user the SACRIFICE status temporarily, converting 10% of damage into divinity. A lightning fast move that can catch opponents off guard and cheat into some 100 DIV plays.',
    'shadowDagger': 'Threle\'s ultimate shadow spell. Only usable at 100 DIV. Upgrades her dagger into the unholy Ritual Knife (+666 ATK) in exchange for voiding her divinity. In late game situations with little mana, this lets her go toe-to-toe with a fully upgraded Valiant. Be sure to cast a maxed Prayer Shield before performing Ultimatum, as this will be Threle\'s last prayer.'
}
descriptions.starGray = descriptions.star;
descriptions.shadowBlastExplosion = descriptions.shadowBlastProjectile;

const GalleryDescription = ({ selected }) => {
    return (
        <Typography variant="body2" fontWeight='400' sx={style}>
            {selected.target && <span style={{ fontWeight: 'bold' }}>{names[selected.target]}:&nbsp;</span>}
            {selected.target ? descriptions[selected.target] : 'Select an item from the gallery to view its description!'}
        </Typography>
    )
}

export default GalleryDescription