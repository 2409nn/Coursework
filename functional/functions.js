export function addEmptyState(listBlock, picture) {

    if (listBlock.children().length === 0 && picture !== undefined) { // если пусто и ссылка на картинку добавлена
        picture.css("display", "flex") // обращаемся к картинке и делаем ее отображаемой

        return true
    }
} // проверка и вставка "заглушки" для пустых списов

export function dropContextMenu(...contextElems) {

    const elems = [...contextElems]
    const menu = $("#contextMenu")

    menu.html("<ul></ul>")

    for (let elem of elems) {
        $("#contextMenu ul").append(`<li><button class="${elem.toLowerCase()}Btn">${elem}</button></li>`)
    }

    menu.css("display", "flex")

} // показать контекстное меню

export function hideContextMenu(contextMenu) {

    contextMenu.css("display", "none")
    contextMenu.html("<ul></ul>")

} // спрятать контекстное меню

export function closePopUp(popup) {
    popup.removeClass("active")
}

export function popUp(popId) {

    const popup = $(`#${popId}`)
    const closeBtn = $(`#${popId} .close__button`)
    const submit = $(`#${popId} input[type="submit"]`)

    popup.toggleClass("active")
    closeBtn.click(function () {
        closePopUp(popup)
    })

    $(window).on("keydown", function (event) {
        if (event.key === "Escape") {
            closePopUp(popup)
        }
    })

    submit.click(function (event) {
        event.preventDefault()
        closePopUp(popup)
    })

}

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

export function monthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function switchElement(elemList, currentElem, back, next, elemIndex) {

    let currentElemIndex

    if (typeof elemIndex === "undefined") {
        currentElemIndex = elemList.indexOf(currentElem.text()) // если аргумент elemIndex не указан, то найти индекс самостоятельно
    }
    else {
        currentElemIndex = elemIndex
    }

    currentElem.on("selectstart", function (event) {
        event.preventDefault()
    })

    currentElem.text(elemList[currentElemIndex])

    next.click(function () {
        currentElemIndex++

        if (currentElemIndex === elemList.length) {
            currentElemIndex = 0
        }

        currentElem.text(elemList[currentElemIndex])

        return currentElemIndex

    })

    back.click(function () {

        currentElemIndex--

        if (currentElemIndex < 0) {
            currentElemIndex = elemList.length
        }

        currentElem.text(elemList[currentElemIndex])

        return currentElemIndex
    })
}

export function getMonthDays(year, month) {

    if (typeof month === "string") {
        switch (month.toLowerCase()) {
            case "january":
                month = 1
                break
            case "february":
                month = 2
                break
            case "march":
                month = 3
                break
            case "april":
                month = 4
                break
            case "may":
                month = 5
                break
            case "june":
                month = 6
                break
            case "july":
                month = 7
                break
            case "august":
                month = 8
                break
            case "september":
                month = 9
                break
            case "october":
                month = 10
                break
            case "november":
                month = 11
                break
            case "december":
                month = 12
                break
        }
    }

    return new Date(year, month, 0).getDate()
}

export function defToTime(date) {
    let now = new Date();

    if (date.toLowerCase() === "today") {
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    }

    if (date.toLowerCase() === "tomorrow") {
        let tomorrow = new Date(now)
        tomorrow.setDate(now.getDate() + 1)
        return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`
    }

    if (date.toLowerCase() === "yesterday") {
        let yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`
    }
}