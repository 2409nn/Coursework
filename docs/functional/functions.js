export function addEmptyState(listBlock, picture) {

    if (listBlock.children().length === 0 && picture !== undefined) {
        picture.css("display", "flex")
        listBlock.css("display", "none")

        return true
    }
} // проверка и вставка "заглушки" для пустых списов

export function dropContextMenu(...contextElems) {

    const elems = [...contextElems]
    const menu = $("#contextMenu")

    menu.html("<ul></ul>")

    for (let elem of elems) {
        $("#contextMenu ul").append(`<li><button class="${elem.toLowerCase()}Btn">${elem}</button></li>`)
    }

    menu.css("display", "flex")

} // показать контекстное меню

export function hideContextMenu(contextMenu) {

    contextMenu.css("display", "none")
    contextMenu.html("<ul></ul>")

} // спрятать контекстное меню

export function closePopUp(popup) {
    popup.removeClass("active")
    popup.find("input[type='submit']").off("click")
}

export function popUp(popId) {

    const popup = $(`#${popId}`)
    const closeBtn = $(`#${popId} .close__button`)
    const submit = $(`#${popId} input[type="submit"]`)

    popup.toggleClass("active")
    closeBtn.click(function () {
        closePopUp(popup)
    })

    $(window).on("keydown", function (event) {
        if (event.key === "Escape") {
            closePopUp(popup)
        }
    })

    submit.click(function (event) {
        event.preventDefault()
    })

}

export function getTimeDef(date) {
    let now = new Date()
    let time = date.split("-")

    if (now.getDate() === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Today"
    } else if (now.getDate() + 1 === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Tomorrow"
    } else if (now.getDate() - 1 === Number(time[2]) && now.getMonth() + 1 === Number(time[1]) && now.getFullYear() === Number(time[0])) {
        return "Yesterday"
    } else {
        return `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getFullYear()).padStart(2, "0")}`
    }
}

export function monthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function switchElement(elemList, currentElem, back, next, elemIndex) {

    let currentElemIndex

    if (typeof elemIndex === "undefined") {
        currentElemIndex = elemList.indexOf(currentElem.text()) // если аргумент elemIndex не указан, то найти индекс самостоятельно
    }
    else {
        currentElemIndex = elemIndex
    }

    currentElem.on("selectstart", function (event) {
        event.preventDefault()
    })

    currentElem.text(elemList[currentElemIndex])

    next.click(function () {
        currentElemIndex++

        if (currentElemIndex === elemList.length) {
            currentElemIndex = 0
        }

        currentElem.text(elemList[currentElemIndex])

        return currentElemIndex

    })

    back.click(function () {

        currentElemIndex--

        if (currentElemIndex < 0) {
            currentElemIndex = elemList.length
        }

        currentElem.text(elemList[currentElemIndex])

        return currentElemIndex
    })
}

export function getMonthDays(year, month) {

    if (typeof month === "string") {
        switch (month.toLowerCase()) {
            case "january":
                month = 1
                break
            case "february":
                month = 2
                break
            case "march":
                month = 3
                break
            case "april":
                month = 4
                break
            case "may":
                month = 5
                break
            case "june":
                month = 6
                break
            case "july":
                month = 7
                break
            case "august":
                month = 8
                break
            case "september":
                month = 9
                break
            case "october":
                month = 10
                break
            case "november":
                month = 11
                break
            case "december":
                month = 12
                break
        }
    }

    return new Date(year, month, 0).getDate()
}

export function defToTime(date) {
    let now = new Date();

    if (date.toLowerCase() === "today") {
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    }

    if (date.toLowerCase() === "tomorrow") {
        let tomorrow = new Date(now)
        tomorrow.setDate(now.getDate() + 1)
        return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`
    }

    if (date.toLowerCase() === "yesterday") {
        let yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`
    }
}

export function getDataFromElement(elem) {

    if (elem.find("[data-info-type]")) {
        let result = {}

        for (let el of elem.find("[data-info-type]")) {
            if ($(el).is('input')) {result[$(el).attr("data-info-type")] = $(el).val()}

            else {result[$(el).attr("data-info-type")] = $(el).text()}
        }

        return result
    }
}

export function createElem(elemType) {

    let popName
    let inputNames
    let inputData = {}
    let popSubmit
    let appendBlock
    let appendPlace
    // определение модального окна

    if (elemType === "task") {
        popName = "popWindowTask"
        inputNames = ["title", "deadline", "date", "chooseProject"]
    }

    else if (elemType === "project") {
        popName = "popWindowProject"
        inputNames = ["title", "desc"]
    }

    else if (elemType === "weekGoal") {
        popName = "popWindowWeekGoal"
        inputNames = ["title", "desc"]
    }

    else if (elemType === "monthGoal") {
        popName = "popWindowMonthGoal"
        inputNames = ["title", "desc"]
    }

    popUp(popName)
    $(`#${popName} input`).val("")
    $(`#${popName} textarea`).val("")
    popSubmit = $(`#${popName} input[type='submit']`)
    popSubmit.val("Create")

    popSubmit.click(function () {
        let allowSubmit = true

        $(`#${popName}`).find("input[required]:not([type=submit]), textarea[required]").each(function() {
            if ($(this).val().trim() === "") {
                allowSubmit = false;
            }
        })
        if (allowSubmit) {
            // получение данных в inputData

            for (let name of inputNames) {

                if (name === "desc") {
                    inputData[name] = $(`#${popName} textarea[name=${name}]`).val()
                } else if (name === "chooseProject") {
                    inputData[name] = $(`#${popName} select[name=${name}] option:selected`).text()
                } else {
                    inputData[name] = $(`#${popName} input[name="${name}"]`).val()
                }
            }

            if ($("#tasks .tasks__list").length > 0 && elemType === "task") {

                appendBlock = `<li class="task" data-popup-name="popWindowTask">
          <div class="checkbox">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="mainData">
            <h4 class="title">${inputData["title"]}</h4>
            <div class="deadline">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="currentColor"/>
                <path d="M20 9.84H4C3.45 9.84 3 10.29 3 10.84V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V10.84C21 10.29 20.55 9.84 20 9.84ZM9.21 18.21C9.16 18.25 9.11 18.3 9.06 18.33C9 18.37 8.94 18.4 8.88 18.42C8.82 18.45 8.76 18.47 8.7 18.48C8.63 18.49 8.57 18.5 8.5 18.5C8.37 18.5 8.24 18.47 8.12 18.42C7.99 18.37 7.89 18.3 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.3 16.5 8.5 16.48 8.7 16.52C8.76 16.53 8.82 16.55 8.88 16.58C8.94 16.6 9 16.63 9.06 16.67C9.11 16.71 9.16 16.75 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21ZM9.21 14.71C9.02 14.89 8.76 15 8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.07 13.01 8.51 12.92 8.88 13.08C9.01 13.13 9.12 13.2 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71ZM12.71 18.21C12.52 18.39 12.26 18.5 12 18.5C11.74 18.5 11.48 18.39 11.29 18.21C11.11 18.02 11 17.76 11 17.5C11 17.24 11.11 16.98 11.29 16.79C11.66 16.42 12.34 16.42 12.71 16.79C12.89 16.98 13 17.24 13 17.5C13 17.76 12.89 18.02 12.71 18.21ZM12.71 14.71C12.66 14.75 12.61 14.79 12.56 14.83C12.5 14.87 12.44 14.9 12.38 14.92C12.32 14.95 12.26 14.97 12.2 14.98C12.13 14.99 12.07 15 12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.38 13.2 11.49 13.13 11.62 13.08C11.99 12.92 12.43 13.01 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71ZM16.21 18.21C16.02 18.39 15.76 18.5 15.5 18.5C15.24 18.5 14.98 18.39 14.79 18.21C14.61 18.02 14.5 17.76 14.5 17.5C14.5 17.24 14.61 16.98 14.79 16.79C15.16 16.42 15.84 16.42 16.21 16.79C16.39 16.98 16.5 17.24 16.5 17.5C16.5 17.76 16.39 18.02 16.21 18.21ZM16.21 14.71C16.16 14.75 16.11 14.79 16.06 14.83C16 14.87 15.94 14.9 15.88 14.92C15.82 14.95 15.76 14.97 15.7 14.98C15.63 14.99 15.56 15 15.5 15C15.24 15 14.98 14.89 14.79 14.71C14.61 14.52 14.5 14.26 14.5 14C14.5 13.74 14.61 13.48 14.79 13.29C14.89 13.2 14.99 13.13 15.12 13.08C15.3 13 15.5 12.98 15.7 13.02C15.76 13.03 15.82 13.05 15.88 13.08C15.94 13.1 16 13.13 16.06 13.17C16.11 13.21 16.16 13.25 16.21 13.29C16.39 13.48 16.5 13.74 16.5 14C16.5 14.26 16.39 14.52 16.21 14.71Z" fill="currentColor"/>
              </svg>
              <p>${getTimeDef(inputData["date"])} till ${inputData["deadline"]}</p></div>
          </div>
          <div class="secondaryData">
            <div class="user"><img src="../imgs/nav/Avatar.png" width="20" alt="avatar"></div>
            <div class="project"><h6 class="projectName">${inputData["chooseProject"]}</h6><span class="projectChar">${(inputData["chooseProject"][0]).toUpperCase()}</span></div>
          </div>
        </li>`
                appendPlace = $("#tasks .tasks__list")

                $("#tasks .tasks__list").css("display", "flex")
                $("#tasks .empty__state").css("display", "none")

            } else if ($("#todayTasks .tasks__list").length > 0 && elemType === "task") {

                let lastChild, taskId, labelId

                if ($("#todayTasks .tasks__list").children().length > 0) {

                    lastChild = $("#todayTasks .tasks__list").children().last()
                    taskId = "task" + (Number((lastChild.find("input[type='checkbox']").attr("id")).replace("task", "")) + 1)
                    labelId = "deadline" + (Number((lastChild.find("input[type='time']").attr("id")).replace("deadline", "")) + 1)
                } else {
                    taskId = "task1"
                    labelId = "deadline1"
                    $("#todayTasks .empty__state").css("display", "flex")
                }

                appendBlock = `<li class="task">
        <input type="checkbox" id="${taskId}">
        <label for="${taskId}">${inputData["title"]}</label>
        <div class="deadline">
          <label for="${labelId}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="currentColor"/>
              <path d="M20 9.84H4C3.45 9.84 3 10.29 3 10.84V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V10.84C21 10.29 20.55 9.84 20 9.84ZM9.21 18.21C9.16 18.25 9.11 18.3 9.06 18.33C9 18.37 8.94 18.4 8.88 18.42C8.82 18.45 8.76 18.47 8.7 18.48C8.63 18.49 8.57 18.5 8.5 18.5C8.37 18.5 8.24 18.47 8.12 18.42C7.99 18.37 7.89 18.3 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.3 16.5 8.5 16.48 8.7 16.52C8.76 16.53 8.82 16.55 8.88 16.58C8.94 16.6 9 16.63 9.06 16.67C9.11 16.71 9.16 16.75 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21ZM9.21 14.71C9.02 14.89 8.76 15 8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.07 13.01 8.51 12.92 8.88 13.08C9.01 13.13 9.12 13.2 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71ZM12.71 18.21C12.52 18.39 12.26 18.5 12 18.5C11.74 18.5 11.48 18.39 11.29 18.21C11.11 18.02 11 17.76 11 17.5C11 17.24 11.11 16.98 11.29 16.79C11.66 16.42 12.34 16.42 12.71 16.79C12.89 16.98 13 17.24 13 17.5C13 17.76 12.89 18.02 12.71 18.21ZM12.71 14.71C12.66 14.75 12.61 14.79 12.56 14.83C12.5 14.87 12.44 14.9 12.38 14.92C12.32 14.95 12.26 14.97 12.2 14.98C12.13 14.99 12.07 15 12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.38 13.2 11.49 13.13 11.62 13.08C11.99 12.92 12.43 13.01 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71ZM16.21 18.21C16.02 18.39 15.76 18.5 15.5 18.5C15.24 18.5 14.98 18.39 14.79 18.21C14.61 18.02 14.5 17.76 14.5 17.5C14.5 17.24 14.61 16.98 14.79 16.79C15.16 16.42 15.84 16.42 16.21 16.79C16.39 16.98 16.5 17.24 16.5 17.5C16.5 17.76 16.39 18.02 16.21 18.21ZM16.21 14.71C16.16 14.75 16.11 14.79 16.06 14.83C16 14.87 15.94 14.9 15.88 14.92C15.82 14.95 15.76 14.97 15.7 14.98C15.63 14.99 15.56 15 15.5 15C15.24 15 14.98 14.89 14.79 14.71C14.61 14.52 14.5 14.26 14.5 14C14.5 13.74 14.61 13.48 14.79 13.29C14.89 13.2 14.99 13.13 15.12 13.08C15.3 13 15.5 12.98 15.7 13.02C15.76 13.03 15.82 13.05 15.88 13.08C15.94 13.1 16 13.13 16.06 13.17C16.11 13.21 16.16 13.25 16.21 13.29C16.39 13.48 16.5 13.74 16.5 14C16.5 14.26 16.39 14.52 16.21 14.71Z" fill="currentColor"/>
            </svg>
          </label>
          <input id="${labelId}" type="time" value="${inputData["deadline"]}">
        </div>
      </li>`
                appendPlace = $("#todayTasks .tasks__list")

                $("#todayTasks .tasks__list").css("display", "block")
                $("#todayTasks .empty__state").css("display", "none")
            } else if ($("#projects .projects").length > 0 && elemType === "project") {

                appendBlock = `<li class="project" data-popup-name="popWindowProject">
          <img class="project__img" src="../imgs/main/project__image.jpg" alt="project image">
          <div class="project__info">
            <a class="project__link">AppDevelopment <span class="project__number">1</span></a>
            <h4 class="project__name">${inputData["title"]}</h4>
            <p class="project__description">${inputData["desc"]}</p>
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
        </li>`
                appendPlace = $("#projects .projects")
            } else if ($("#chats .projects").length > 0 && elemType === "project") {
                appendBlock = `<li class="project" onclick="window.location = '../pages/chat.html'">
        <div class="project__title">
          <h3>${inputData["title"]}</h3>
          <span class="tag">project</span>
          <span class="new__messages__amount">+12</span>
        </div>

        <div class="last_message">
          <p>No messages yet</p>
        </div>

        <div class="members">
          <p class="members__amount">19 members</p>
          <div class="members__list">
            <span class="more__members">+15</span>
            <img class="member member1" src="../imgs/nav/Avatar.png" alt="avatar">
            <img class="member member2" src="../imgs/nav/Avatar.png" alt="avatar">
            <img class="member member3" src="../imgs/nav/Avatar.png" alt="avatar">
          </div>
        </div>

      </li>`
                appendPlace = $("#chats .projects")

                $("#chats .projects").css("display", "flex")
                $("#chats .empty__state").css("display", "none")
            } else if ($("#projects .weekGoals").length > 0 && elemType === "weekGoal") {

                let lastChild, goalId

                if ($("#projects .weekGoals").children("li").not(":has(h5)").length > 0) {
                    lastChild = $("#projects .weekGoals").children().last()
                    goalId = "weekGoal" + (Number((lastChild.find("input[type='checkbox']").attr("id")).replace("weekGoal", "")) + 1)
                } else {
                    $("#projects .goals").css("display", "grid")
                    $("#projects .empty__state").css("display", "none")
                    goalId = "weekGoal1"
                }

                appendBlock = `<li class="goal week__goal" data-popup-name="popWindowWeekGoal">
<input id="${goalId}" type="checkbox" name="weekGoal"><label class="goal__label" for="${goalId}">${inputData["title"]}</label>
</li>`
                appendPlace = $("#projects .weekGoals")
            } else if ($("#projects .monthGoals").length > 0 && elemType === "monthGoal") {

                let lastChild, goalId

                if ($("#projects .monthGoals").children("li").not(":has(h5)").length > 0) {
                    lastChild = $("#projects .monthGoals").children().last()
                    goalId = "monthGoal" + (Number(lastChild.find("input[type='checkbox']").attr("id").replace("monthGoal", "")) + 1)
                } else {
                    $("#projects .goals").css("display", "grid")
                    $("#projects .empty__state").css("display", "none")
                    goalId = "monthGoal1"
                }

                appendBlock = `<li class="goal month__goal" data-popup-name="popWindowMonthGoal">
<input id="${goalId}" type="checkbox" name="mothGoal"><label class="goal__label" for="${goalId}">${inputData["title"]}</label>
</li>`
                appendPlace = $("#projects .monthGoals")
            }

            try {
                appendPlace.append(appendBlock)
                appendPlace.animate({scrollTop: appendPlace[0].scrollHeight}, 500)
            } catch (e) {
            }

            closePopUp($(`#${popName}`))
            popSubmit.off("click")
        }

        else {alert("Please enter a value")}
    })
}

export function changeElem(elem) {
    let popupName = elem.attr("data-popup-name")
    let popWindow = $(`#${popupName}`)
    let popSubmit = popWindow.find("input[type='submit']")
    let elemType = elem.attr("class")
    let elemSection = elem.closest("section").attr("id")

    // сбор данных из элемента
    let elemData = getDataFromElement(elem)

    for (let dataType of Object.keys(elemData)) {

        if (dataType === "title") {popWindow.find("input[name='title']").val(elemData["title"])}

        if (dataType === "deadline") {
            let data = elemData["deadline"].split("till")
            let date = defToTime(data[0].trim())
            let time = data[1].trim()
            popWindow.find("input[name='deadline']").val(time)
            popWindow.find("input[name='date']").val(date)
        }

        if (dataType === "time") {
            popWindow.find("input[name='deadline']").val(elemData["time"])
        }

        if (dataType === "description") {popWindow.find("textarea[name='desc']").val(elemData["description"])}

    }

    popSubmit.val("Change")
    popUp(popupName) // вызов модального окна

    popSubmit.click(function (event) {

        // ввод измененных данных обратно в элемент

        event.preventDefault()

        let allowSubmit = true

        for (let input of popWindow.find("input:not([type=submit]), textarea")) {
            input = $(input)
            if (input.val().length === 0) {
                allowSubmit = false
            }
        }

        if (allowSubmit) {

            let inputData = {}

            for (let input of popWindow.find("input:not([type=submit]), textarea")) {
                input = $(input)
                inputData[input.attr("name")] = input.val()
            }

            if (elemType === "task" && elemSection === "tasks") {
                elem.find(".title").text(inputData["title"])
                elem.find(".deadline p").text(`${getTimeDef(inputData["date"])} till ${inputData["deadline"]}`)

            } else if (elemType === "task" && elemSection === "todayTasks") {
                elem.find(".goal__label").text(inputData["title"])
                elem.find("input[type='time']").val(inputData["deadline"])

            } else if (elemType === "project" && elemSection === "projects") {
                elem.find(".project__name").text(inputData["title"])
                elem.find(".project__description").text(inputData["desc"])

            } else if (elemType.split(" ")[0] === "goal" && elemSection === "projects") {
                elem.find("label").text(inputData["title"])
            }

            popSubmit.off("click")
            closePopUp(popWindow)
        }

        else {alert("Please enter a value")}
    })
}

export function getWeekDatesObject() {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    const today = new Date()
    const currentDay = today.getDay()

    const monday = new Date(today)
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

    const weekDates = {}

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        weekDates[daysOfWeek[i]] = date.getDate()
    }

    return weekDates
}