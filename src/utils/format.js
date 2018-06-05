export const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const minuteFormatted = minute < 10 ? '0' + minute : minute

    return `${day}.${month}.${year} ${hour}:${minuteFormatted}`
}
