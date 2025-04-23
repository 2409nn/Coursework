
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

