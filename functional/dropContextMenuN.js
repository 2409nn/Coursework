import { dropContextMenu, hideContextMenu } from "../functional/contextMenu.js"
// import { addEmptyState } from "./addEmptyState.js";

$(document).ready(function () {

    $(".notifications .notif, #chats .project").on("contextmenu", function (event) {

        let thisElem = $(this)
        event.preventDefault()

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)
        dropContextMenu("Remove")

        $(".removeBtn").on("click", function () {
            addEmptyState(notifications)
            thisElem.remove()
            hideContextMenu($("#contextMenu"))

            addEmptyState($(".notifications"), $("#tasks .empty__state"))

        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })

    })
})