export function switchElement(elemList, currentElem, back, next) {

    let currentElemIndex = elemList.indexOf(currentElem.text())

    currentElem.on("selectstart", function (event) {
        event.preventDefault()
    })

    next.click(function () {
        currentElemIndex++

        if (currentElemIndex === elemList.length) {
            currentElemIndex = 0
        }

        currentElem.text(elemList[currentElemIndex])
    })

    back.click(function () {

        currentElemIndex--

        if (currentElemIndex < 0) {
            currentElemIndex = elemList.length
        }

        currentElem.text(elemList[currentElemIndex])
    })

}