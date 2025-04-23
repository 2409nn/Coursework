import { dropContextMenu, hideContextMenu } from "../functional/contextMenu.js"
import { popUp } from "../functional/popUpFuncs.js";

$(document).ready(function () {


    $("#tasks .task, #projects .goal, #todayTasks .task, #projects .project").on("contextmenu", function (event) {

        event.preventDefault()
        let thisElem = $(this)

        dropContextMenu("Change", "Remove")
        let elemClassName = thisElem.attr("class")

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)

        $(".changeBtn").click(function () {

            if (elemClassName === "task") {
                popUp("popWindowTask")
            }

            if (elemClassName === "project") {
                popUp("popWindowProject")
            }

            hideContextMenu($("#contextMenu"))

        })

        $(".removeBtn").click(function () {

            if (elemClassName === "project") {
                if (confirm("Are you sure you want to delete this project?")) {
                    thisElem.remove()
                }
            }

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