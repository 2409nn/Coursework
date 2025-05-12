import {changeElem, dropContextMenu, getTimeDef, hideContextMenu, popUp} from "./functions.js"
import { addEmptyState, defToTime, createElem } from "./functions.js";

function getDeviceType() {
    const ua = navigator.userAgent

    if (/mobile/i.test(ua)) return "Mobile"
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet"
    if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return "Tablet"
    return "Desktop"
} // проверка типа устройства

$(document).ready(function () {
    const selectors = "#tasks .task, #projects .goal, #todayTasks .task, #projects .project";

    // контекстное меню
    if (getDeviceType() === "Desktop") {
        // контекстное меню (только с кнопкой "удалить")
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
    }
    else {

        $(selectors).on("contextmenu", function (event) {event.preventDefault()})

        $(selectors).each(function () {
            const el = this;
            let timer = null;
            let isLongPress = false;

            $(document).on("touchstart", el, function (event) {
                isLongPress = false;

                timer = setTimeout(() => {
                    isLongPress = true;

                    const thisElem = $(el);
                    const elemClassName = thisElem.attr("class");

                    const touch = event.originalEvent.touches[0];
                    const x = touch.pageX;
                    const y = touch.pageY;

                    $("#contextMenu").css("transform", `translate(${x}px, ${y}px)`);
                    dropContextMenu("Change", "Remove");

                    // Делегирование событий на меню
                    $("#contextMenu").off("touchstart").on("touchstart", ".changeBtn", function () {
                        changeElem(thisElem);
                        hideContextMenu($("#contextMenu"));
                    });

                    $("#contextMenu").on("touchstart", ".removeBtn", function () {
                        let list = thisElem.closest("ul");

                        if (elemClassName === "project") {
                            if (confirm("Are you sure you want to delete this project?")) {
                                thisElem.remove();
                            }
                        } else {
                            thisElem.remove();
                        }

                        hideContextMenu($("#contextMenu"));

                        let weekGoalsList = $("#projects .weekGoals");
                        let monthGoalsList = $("#projects .monthGoals");

                        if (
                            monthGoalsList.children("li").not(":has(h5)").length === 0 &&
                            weekGoalsList.children("li").not(":has(h5)").length === 0
                        ) {
                            $(".goals").css("display", "none");
                            monthGoalsList.parent(".goals").siblings(".empty__state").css("display", "flex");
                        }

                        addEmptyState(list, list.siblings(".empty__state"));
                    });

                    // Скрыть контекстное меню при нажатии вне его
                    $("body").off("touchstart").on("touchstart", function (e) {
                        if (!e.target.closest("#contextMenu")) {
                            hideContextMenu($("#contextMenu"));
                        }
                    });

                }, 500);
            });

            $(el).on("touchend touchmove touchcancel", function () {
                clearTimeout(timer);
            });
        });
    }

    $(".new__project").click(function () {
        createElem("project")
    })
})