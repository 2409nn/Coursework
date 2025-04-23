import { dropContextMenu, hideContextMenu } from "../functional/contextMenu.js"

$(document).ready(function () {

    $(".notifications .notif").on("contextmenu", function (event) {

        let thisElem = $(this)
        event.preventDefault()

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)
        dropContextMenu("Remove")

        $(".removeBtn").on("click", function () {
            thisElem.remove()
            hideContextMenu($("#contextMenu"))

        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })

    })
})