function monthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function switchElement(elemList, currentElem, back, next, elemIndex) {

    let currentElemIndex
    let now = new Date()

    if (typeof elemIndex === "undefined") {
        currentElemIndex = elemList.indexOf(currentElem.text())
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