import { dropContextMenu, hideContextMenu } from "./contextMenu.js"
import { popUp } from "./popUpFuncs.js"
import { addEmptyState } from "./addEmptyState.js"

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

            if (elemClassName.includes("week__goal")) {
                let elemTitle = thisElem.children("label")

                $("#popWindowWeekGoal input[type='text']").val(elemTitle.text())

                $("#popWindowWeekGoal input[type='submit']").click(function () {
                    let inputText = $("#popWindowWeekGoal input[type='text']").val()
                    elemTitle.text(inputText)
                })


                popUp("popWindowWeekGoal")
            }

            if (elemClassName.includes("month__goal")) {
                popUp("popWindowMonthGoal")
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

            const checkElems = [$("#tasks .tasks__list .task")]

            for (let elem of checkElems) {
                if (addEmptyState(elem, $("#tasks .empty__state"))) {

                    $("#tasks .controls").css("display", "none")
                }

                else {
                    $("#tasks .empty__state").css("display", "none")
                    $("#tasks .controls").css("display", "flex")
                    $("#tasks .tasks__list").css("display", "flex")
                }
            }

        })

        $("#contextMenu button").click(function () {

            if (addEmptyState($("#tasks .tasks__list"), $("#tasks .empty__state"))) {

                $("#tasks .controls").css("display", "none")
            }

            else {
                $("#tasks .empty__state").css("display", "none")
                $("#tasks .controls").css("display", "flex")
                $("#tasks .tasks__list").css("display", "flex")
            }

            let weekGoalsList = $("#projects .weekGoals li:has(div)")
            let monthGoalsList = $("#projects .monthGoals li:has(div)")

            let emptyState = $("#projects .empty__state")

            if (addEmptyState(weekGoalsList, emptyState) && addEmptyState(monthGoalsList, emptyState)) {
                $("#projects .goals").css("display", "none")
            }

        })

        $("body").click(function (event) {

            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })
    })
})