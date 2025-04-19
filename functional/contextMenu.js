export function dropContextMenu(...contextElems) {

    const elems = [...contextElems]
    const menu = $("#contextMenu")

    contextMenu.html("<ul></ul>")

    for (let elem of elems) {
        $("#contextMenu ul").append(`<li><button>${elem}</button></li>`)
    }

    menu.css("display", "block")

}

export function hideContextMenu(contextMenu) {

    contextMenu.css("display", "none")
    contextMenu.html("<ul></ul>")

}