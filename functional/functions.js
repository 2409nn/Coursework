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
    let now = new Date()

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
        console.log(monthDays(now.getFullYear(), currentElemIndex))

    })

    back.click(function () {

        currentElemIndex--

        if (currentElemIndex < 0) {
            currentElemIndex = elemList.length
        }

        currentElem.text(elemList[currentElemIndex])

        console.log(monthDays(now.getFullYear(), currentElemIndex))
    })



}

export function defToTime(date) {
    let now = new Date()
    if (date.toLowerCase() === "today") {
        return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
    }

    if (date.toLowerCase() === "tomorrow") {
        console.log(now.getDate() + 1)
    }
}