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

    // для IOS
    const elements = document.querySelectorAll("#tasks .task, #projects .goal, #todayTasks .task, #projects .project");

    elements.forEach(el => {
        const hammertime = new Hammer(el);

        // Настройка события press (удержание ~500ms)
        hammertime.get('press').set({ time: 600 });

        hammertime.on('press', function (event) {
            const jEl = $(el);
            const elemClassName = jEl.attr("class");

            dropContextMenu("Change", "Remove");

            // Координаты касания
            const touch = event.srcEvent;
            $("#contextMenu").css("transform", `translate(${touch.pageX}px, ${touch.pageY}px)`);

            $(".changeBtn").off("click").on("click", function () {
                changeElem(jEl);
                hideContextMenu($("#contextMenu"));
            });

            $(".removeBtn").off("click").on("click", function () {
                let list = jEl.closest("ul");

                if (elemClassName === "project") {
                    if (confirm("Are you sure you want to delete this project?")) {
                        jEl.remove();
                    }
                } else {
                    jEl.remove();
                }

                hideContextMenu($("#contextMenu"));

                let weekGoalsList = $("#projects .weekGoals");
                let monthGoalsList = $("#projects .monthGoals");

                if (monthGoalsList.children("li").not(":has(h5)").length === 0 &&
                    weekGoalsList.children("li").not(":has(h5)").length === 0) {
                    $(".goals").css("display", "none");
                    monthGoalsList.parent(".goals").siblings(".empty__state").css("display", "flex");
                }

                addEmptyState(list, list.siblings(".empty__state"));
            });

            $("body").off("click.contextmenu").on("click.contextmenu", function (e) {
                if (!e.target.closest("#contextMenu")) {
                    hideContextMenu($("#contextMenu"));
                }
            })
        })
    })

    $(".new__project").click(function () {
        createElem("project")
    })
})