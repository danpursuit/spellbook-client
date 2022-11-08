
const plusSign = (val) => {
    if (val > 0) return `+${Math.round(val)}`
    return Math.round(val)
}

export default {
    plusSign,
}