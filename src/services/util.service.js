export const utilService = {
    saveToStorage,
    loadFromStorage,
    getTimePassed,
    capitalizeFirstLetter
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTimePassed(timestamp) {
    const currTime = new Date()
    const timeDiff = currTime - timestamp

    const secDiff = timeDiff / 1000

    if (secDiff < 120) {
        return "Just now"
    } else if (secDiff < 3600) {
        const minutes = Math.floor(secDiff / 60)
        return `${minutes} minutes ago`
    } else if (secDiff < 86400) {
        const hours = Math.floor(secDiff / 3600)
        return `${hours} hour(s) ago`
    } else if (secDiff < 604800) { // 7 days in seconds
        const days = Math.floor(secDiff / 86400)
        return `${days} day(s) ago`
    } else if (secDiff < 2629800) { // 30.44 days in seconds (average month)
        const weeks = Math.floor(secDiff / 604800)
        return `${weeks} week(s) ago`
    } else if (secDiff < 31557600) { // 365.25 days in seconds (average year)
        const months = Math.floor(secDiff / 2629800)
        return `${months} month(s) ago`
    } else {
        const years = Math.floor(secDiff / 31557600)
        return `${years} year(s) ago`
    }
}