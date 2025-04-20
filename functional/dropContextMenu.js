import { dropContextMenu, hideContextMenu } from "../functional/contextMenu.js"
import { popUp } from "../functional/popUpFuncs.js";

$(document).ready(function () {


    $("#tasks .task, #projects .goal, #todayTasks .task").on("contextmenu", function (event) {

        event.preventDefault()
        let thisTask = $(this)

        dropContextMenu("Change", "Remove")

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)

        $(".changeBtn").click(function () {

            popUp("popWindowTask")
            hideContextMenu($("#contextMenu"))

        })

        $(".removeBtn").click(function () {
            thisTask.remove()
            hideContextMenu($("#contextMenu"))

        })

        $("body").click(function (event) {

            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })
    })

})