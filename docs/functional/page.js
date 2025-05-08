import {changeElem, dropContextMenu, getTimeDef, hideContextMenu, popUp} from "./functions.js"
import { addEmptyState, defToTime, createElem } from "./functions.js";

$(document).ready(function () {

    // контекстное меню (только с кнопкой удалить)
    $(document).on("contextmenu", ".notifications .notif, #chats .project", function (event) {
        let thisElem = $(this)
        event.preventDefault()

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)
        dropContextMenu("Remove")

        $(".removeBtn").click(function () {
            let list = thisElem.closest("ul")

            hideContextMenu($("#contextMenu"))
            thisElem.remove()

            addEmptyState(list, list.siblings(".empty__state"))
        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })

    })

    // контекстное меню (с кнопками "изменить" и "удалить")
    $(document).on("contextmenu", "#tasks .task, #projects .goal, #todayTasks .task, #projects .project", function (event) {

        event.preventDefault()
        dropContextMenu("Change", "Remove")
        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)

        let thisElem = $(this)
        let elemClassName = thisElem.attr("class")

        $(".changeBtn").click(function () {
            changeElem(thisElem)
            hideContextMenu($("#contextMenu"))
        })

        $(".removeBtn").click(function () {

            let list = thisElem.closest("ul")

            if (elemClassName === "project") {
                if (confirm("Are you sure you want to delete this project?")) {
                    thisElem.remove()
                }
            } else {
                thisElem.remove()
            }
            hideContextMenu($("#contextMenu"))

            let weekGoalsList = $("#projects .weekGoals")
            let monthGoalsList = $("#projects .monthGoals")

            if (monthGoalsList.children("li").not(":has(h5)").length === 0 && weekGoalsList.children("li").not(":has(h5)").length === 0) {
                $(".goals").css("display", "none")

                monthGoalsList.parent(".goals").siblings(".empty__state").css("display", "flex")
            }


            addEmptyState(list, list.siblings(".empty__state"))
        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))
            }
        })
    })

    // обработка нажатия пальцем
    const elems = $("#tasks .task, #projects .goal, #todayTasks .task, #projects .project")

    elems[0].each(function () {
        const hammer = new Hammer(this)
        hammer.on("tap", function (event) {
            const x = event.center.x
            const y = event.center.y

            dropContextMenu("Change", "Remove")
            $("#contextMenu").css("transform", `translate(${x}px, ${y}px)`)

            let thisElem = $(this)
            let elemClassName = thisElem.attr("class")

            $(".changeBtn").on("touchstart", function () {
                changeElem(thisElem)
                hideContextMenu($("#contextMenu"))
            })

            $(".removeBtn").on("touchstart", function () {

                let list = thisElem.closest("ul")

                if (elemClassName === "project") {
                    if (confirm("Are you sure you want to delete this project?")) {
                        thisElem.remove()
                    }
                } else {
                    thisElem.remove()
                }
                hideContextMenu($("#contextMenu"))

                let weekGoalsList = $("#projects .weekGoals")
                let monthGoalsList = $("#projects .monthGoals")

                if (monthGoalsList.children("li").not(":has(h5)").length === 0 && weekGoalsList.children("li").not(":has(h5)").length === 0) {
                    $(".goals").css("display", "none")

                    monthGoalsList.parent(".goals").siblings(".empty__state").css("display", "flex")
                }

                addEmptyState(list, list.siblings(".empty__state"))
            })

            $("body").on("touchstart", function (event) {
                if (!event.target.closest("#contextMenu")) {
                    hideContextMenu($("#contextMenu"))
                }
            })
        })
    })

    $(".new__project").click(function () {
        createElem("project")
    })
})