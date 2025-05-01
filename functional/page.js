import {dropContextMenu, getTimeDef, hideContextMenu, popUp} from "./functions.js"
import { addEmptyState, defToTime } from "./functions.js";

$(document).ready(function () {

    // контекстное меню (только с кнопкой удалить)

    $(document).on("contextmenu", ".notifications .notif, #chats .project", function (event) {

        let thisElem = $(this)
        let elemSection = thisElem.closest("section")

        event.preventDefault()

        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)
        dropContextMenu("Remove")

        $(".removeBtn").on("click", function () {

            let emptyState = thisElem.closest("ul").siblings(".empty__state")
            thisElem.remove()
            hideContextMenu($("#contextMenu"))


            addEmptyState(thisElem.closest("ul"), emptyState)

        })

        $("body").click(function (event) {
            if (!event.target.closest("#contextMenu")) {
                hideContextMenu($("#contextMenu"))

            }

        })

    })

    // контекстное меню (с кнопками "изменить" и "удалить")

    $(document).on("contextmenu","#tasks .task, #projects .goal, #todayTasks .task, #projects .project", function (event) {

        event.preventDefault()
        dropContextMenu("Change", "Remove")
        $("#contextMenu").css("transform", `translate(${event.pageX}px, ${event.pageY}px)`)

        let thisElem = $(this)
        let elemClassName = thisElem.attr("class")
        let elemSection = thisElem.closest("section")

        $(".changeBtn").click(function () {

            let elemPopupName = thisElem.attr("data-popup-name")
            let elemPopup = $(`#${elemPopupName}`)
            let elemPopupSubmit = $(`#${elemPopupName} input[type="submit"]`)

            popUp(elemPopupName)
            elemPopupSubmit.val("Change") // при нажатии на кнопку "change" для popup меняется значение submit

            hideContextMenu($("#contextMenu"))

            if (elemPopupSubmit.val() === "Change") {

                // получение данных из пользовательского элемента и ввод его в popup окно
                // получение -> запись в popup -> запись с popup в элемент

                if (elemPopupName === "popWindowTask") {

                    let itemTitle = thisElem.children(".mainData").children("h4").text()
                    let itemDeadline = thisElem.children(".mainData").children(".deadline").text().split("till")

                    for (let i = 0; i < itemDeadline.length; i++) {
                        itemDeadline[i] = itemDeadline[i].trim()
                    }

                    let itemDate = defToTime(itemDeadline[0])

                    $("#popWindowTask input[type='text']").val(itemTitle)
                    $("#popWindowTask input[type='time']").val(itemDeadline[1])
                    $("#popWindowTask input[type='date']").val(itemDate)

                }

                if (elemPopupName === "popWindowProject") {
                    let itemTitle = thisElem.children(".project__info").children(".project__name").text()
                    let itemDesc = thisElem.children(".project__info").children(".project__description").text()
                    $("#popWindowProject input[type='text']").val(itemTitle)
                    $("#popWindowProject textarea").val(itemDesc)
                }

                if (elemPopupName === "popWindowWeekGoal") {
                    let itemTitle = thisElem.children("label").text()
                    $("#popWindowWeekGoal input[type='text']").val(itemTitle)
                }

                elemPopupSubmit.click(function () {

                    if (elemPopupName === "popWindowTask") {

                        let taskTime = $(elemPopup).find("input[type='time']").val()
                        let taskDate = getTimeDef($(elemPopup).find("input[type='date']").val())

                        thisElem.find(".title").text($(elemPopup).find("input[type='text']").val())
                        thisElem.find(".deadline p").text(`${taskDate} till ${taskTime}`)
                    }

                    if (elemPopupName === "popWindowProject") {

                        thisElem.find(".project__name").text($(elemPopup).find("input[type='text']").val())
                        thisElem.find(".project__description").text($(elemPopup).find("textarea").val())

                    }

                    if (elemPopupName === "popWindowWeekGoal") {

                        thisElem.find("label").text($(elemPopup).find("input[type='text']").val())

                    }
                    elemPopupSubmit.off("click") // помогает перестать учитывать предыдущие обработчики события "click"
                })

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

            thisElem.remove()
            hideContextMenu($("#contextMenu"))

            let weekGoalsList = $("#projects .weekGoals").find("li") // берутся li и игнорируются те, что содержат h5
            let monthGoalsList = $("#projects .monthGoals").find("li") // берутся li и игнорируются те, что содержат h5

            if (addEmptyState(weekGoalsList, emptyState) && addEmptyState(weekGoalsList, emptyState)) {
                $(".goals").css("display", "none")
            }

            addEmptyState(list, list.siblings(".empty__state"))

            if (addEmptyState($("#tasks .tasks__list .task"), $("#tasks .empty__state"))) {
                $("#tasks .tasks__list").css("display", "none")
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

    $(".new__project").click(function () {

        popUp("popWindowProject")
        $("#popWindowProject input").val("")
        $("#popWindowProject textarea").val("")
        $("#popWindowProject input[type='submit']").val("Create")

        $("#popWindowProject input[type='submit']").click(function () {

            if ($("#popWindowProject input[type='submit']").val() === "Create") {

                sessionStorage.setItem("projectTitle", `${$("#popWindowProject input[type=\"text\"]").val()}`)
                sessionStorage.setItem("projectDesc", `${$("#popWindowProject textarea").val()}`)

                let projectBlock = `<div class="project" data-popup-name="popWindowProject">
          <img class="project__img" src="../imgs/main/project__image.jpg" alt="project image">
          <div class="project__info">
            <a class="project__link">AppDevelopment <span class="project__number">1</span></a>
            <h4 class="project__name">${sessionStorage.getItem("projectTitle")}</h4>
            <p class="project__description">${sessionStorage.getItem("projectDesc")}</p>
            <div class="project__operations">
              <button class="more__btn">View all</button>
              <div class="members">
                <img src="../imgs/nav/Avatar.png" alt="avatar" width="20" class="member member1">
                <img src="../imgs/nav/Avatar.png" alt="avatar" width="20" class="member member2">
                <img src="../imgs/nav/Avatar.png" alt="avatar" width="20" class="member member3">
                <span class="plus__members">+12</span>
              </div>
            </div>
          </div>
        </div>`
                let projectChatBlock = `<div class="project">
        <li class="project__title">
          <h3>${sessionStorage.getItem("projectTitle")}</h3>
          <span class="tag">project</span>
<!--          <span class="new__messages__amount">+12</span>-->
        </li>


        <div class="last_message">
<!--          <div class="user">-->
<!--            <img src="../imgs/nav/Avatar.png" width="28" alt="userLogo" class="user__logo">-->
<!--            <h4 class="user__name">Cave Johnson:</h4>-->
<!--            <p class="message">When life gives you lemons, don't...</p>-->
<!--          </div>-->
            <p>No messages yet</p>
        </div>

        <div class="members">
          <p class="members__amount">1 member</p>
          <div class="members__list">
<!--            <span class="more__members">+15</span>-->
            <img class="member member1" src="../imgs/nav/Avatar.png" alt="avatar">
<!--            <img class="member member2" src="../imgs/nav/Avatar.png" alt="avatar">-->
<!--            <img class="member member3" src="../imgs/nav/Avatar.png" alt="avatar">-->
          </div>
        </div>

      </div>`

                alert("z")

                if ($("#projects .projects").length > 0) {
                    $(this).append(projectBlock)
                }

                if ($("#chats .projects").length > 0) {
                    $(this).append(projectChatBlock)
                }

            }
        })
    })

    $("")

})