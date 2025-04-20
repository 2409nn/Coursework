export function dropContextMenu(...contextElems) {

    const elems = [...contextElems]
    const menu = $("#contextMenu")

    menu.html("<ul></ul>")

    for (let elem of elems) {
        $("#contextMenu ul").append(`<li><button class="${elem.toLowerCase()}Btn">${elem}</button></li>`)
    }

    menu.css("display", "flex")

}

export function hideContextMenu(contextMenu) {

    contextMenu.css("display", "none")
    contextMenu.html("<ul></ul>")

}
