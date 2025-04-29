import { dropContextMenu, hideContextMenu, popUp } from "./functions.js"
import { addEmptyState, defToTime } from "./functions.js";

$(document).ready(function () {

    // контекстное меню (только с кнопкой удалить)

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

    // контекстное меню (с кнопками "изменить" и "удалить")

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
                $("#popWindowTask input[type='submit']").val("Change")
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

            if ($(".pop__up input[type='submit']").val() === "Change") {
                // получаю данные из элемента, которое мы изменяем
                let itemTitle = thisElem.children(".mainData").children("h4").text()
                let itemDeadline = thisElem.children(".mainData").children(".deadline").text().split("till")

                for (let i = 0; i < itemDeadline.length; i++) {
                    itemDeadline[i] = itemDeadline[i].trim()
                }

                defToTime(itemDeadline[0])
            }

        })

        $(".removeBtn").click(function () {

            if (elemClassName === "project") {
                if (confirm("Are you sure you want to delete this project?")) {
                    thisElem.remove()
                }
            }

            let list = thisElem.closest("ul")
            let emptyState = thisElem.closest(".goals").siblings(".empty__state")
            let weekGoalsList = $("#projects .weekGoals").children("li") // берутся li и игнорируются те, что содержат h5
            let monthGoalsList = $("#projects .monthGoals").children("li") // берутся li и игнорируются те, что содержат h5

            thisElem.remove()

            console.log(weekGoalsList.length)
            console.log(monthGoalsList.length)

            hideContextMenu($("#contextMenu"))

            if (weekGoalsList.length === 1 && monthGoalsList.length === 1) {
                console.log('sex')
                $(".goals").css("display", "none")
            }

            addEmptyState(list, list.siblings(".empty__state"))

            if (addEmptyState($("#tasks .tasks__list .task"), $("#tasks .empty__state"))) {
                $("#tasks .controls").css("display", "none")
            }

            else {
                $("#tasks .empty__state").css("display", "none")
                $("#tasks .controls").css("display", "flex")
                $("#tasks .tasks__list").css("display", "flex")
            }
        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))
            }
        })

    })

})