import { dropContextMenu, hideContextMenu } from "./contextMenu.js"
import {addEmptyState} from "./addEmptyState.js";

$(document).ready(function () {

    $(".notifications .notif, #chats .project").on("contextmenu", function (event) {

        let thisElem = $(this)
        let elemSection = thisElem.closest("section")

        event.preventDefault()

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)
        dropContextMenu("Remove")

        $(".removeBtn").on("click", function () {

            let emptyState = thisElem.closest("ul").siblings(".empty__state")
            thisElem.remove()
            hideContextMenu($("#contextMenu"))

            console.log(thisElem.closest("ul").length)

            addEmptyState(thisElem.closest("ul"), emptyState)

        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })

    })
})