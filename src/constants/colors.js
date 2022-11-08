import mechanics from './mechanics.json';

// contains universal colors for stats, statuses, etc.

const statColor = (stat) => {
    if (stat === 'health') return '#ff0000'
    if (stat === mechanics.stat.mana) return 'blue'
    if (stat === mechanics.stat.divinity) return '#ffff99'
    if (stat === mechanics.stat.psyche) return 'purple'
    if (stat === 'gold') return 'gold'
    if (stat === mechanics.stat.attack) return 'darkred'
    if (stat === mechanics.stat.armor) return 'darkgreen'
    if (stat === mechanics.stat.shieldDamage) return '#e4e4e4'
    if (stat === mechanics.alignment.shadow) return '#4d0048'
    if (stat === mechanics.alignment.fire) return '#ff4d00'
    return 'white'
}

const statusColors = {
    'sacrifice': {
        color: 'rgb(225,240,255)',
        backgroundColor: 'rgb(150, 0, 90)',
    }
}

const statSpan = (stat, text, fontWeight = 'normal') => {
    return (<span key={text} style={{ color: statColor(stat), fontWeight: fontWeight }}>
        {' '}{text}{' '}
    </span>)
}

const boldSpan = (text) => {
    return (<span key={text} style={{ fontWeight: 'bold' }}>
        {' '}{text}{' '}
    </span>)
}
const italicSpan = (text) => {
    return (<span key={text} style={{ fontStyle: 'italic' }}>
        {' '}{text}{' '}
    </span>)
}

export default {
    statColor,
    statSpan,
    statusColors,
    boldSpan,
    italicSpan
}