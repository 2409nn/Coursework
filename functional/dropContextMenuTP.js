import { dropContextMenu, hideContextMenu } from "./contextMenu.js"
import { popUp } from "./popUpFuncs.js"
import { addEmptyState } from "./addEmptyState.js"

$(document).ready(function () {


    $("#tasks .task, #projects .goal, #todayTasks .task, #projects .project").on("contextmenu", function (event) {

        event.preventDefault()
        let thisElem = $(this)

        dropContextMenu("Change", "Remove")
        let elemClassName = thisElem.attr("class")
        let elemSection = thisElem.closest("section")

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

            let list = thisElem.closest("ul")
            let emptyState = thisElem.closest(".goals").siblings(".empty__state")
            let weekGoalsList = thisElem.closest(".weekGoals").find("li:has(div)") // берутся li и игнорируются те, что содержат h5
            let monthGoalsList = thisElem.closest(".monthGoals").find("li:has(div)") // берутся li и игнорируются те, что содержат h5

            thisElem.remove()
            hideContextMenu($("#contextMenu"))

            console.log(thisElem)
            console.log(weekGoalsList)
            console.log(monthGoalsList)

            if (weekGoalsList.children("li").length === 0 && monthGoalsList.children("li").length === 0) {
                $(".goals").css("display", "none")
                emptyState.css("display", "flex")
            }


            if (addEmptyState($("#tasks .tasks__list .task"), $("#tasks .empty__state"))) {
                $("#tasks .controls").css("display", "none")
            }

                else {
                    $("#tasks .empty__state").css("display", "none")
                    $("#tasks .controls").css("display", "flex")
                    $("#tasks .tasks__list").css("display", "flex")
                }
            })

        })

        $("body").click(function (event) {

            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })
})