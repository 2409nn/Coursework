
export function getTimeDef(date) {
    let now = new Date()
    let time = date.split("-")


    if (now.getDate() === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Today"
    } else if (now.getDate() + 1 === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Tomorrow"
    } else if (now.getDate() - 1 === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Yesterday"
    } else {
        return `${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()}`
    }
}
