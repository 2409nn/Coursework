import {addEmptyState, createElem} from "./functions.js";

$(document).ready(function() {

    $("#burger").click(function () {

        $("aside").toggleClass("active")
        $("aside nav li a").css({"marginLeft": "20px"})
        $("aside nav li a span").css({
            "fontSize": "12px",
            "marginLeft": "10px"
        })

    }) // обработка события "нажатие" на бургер

    // выпадающее меню

    const createBtn = $(".create")
    const dropMenu = $(".drop__menu")

    createBtn.click(function () {
        dropMenu.toggleClass("active__drop__menu")
    })

        $(document).on("click", ".newTaskBtn", function () {
            createElem("task")
            dropMenu.removeClass("active__drop__menu")
        })

        if (addEmptyState($("#tasks .tasks__list"), $("#tasks .empty__state"))) {
            $("#tasks .tasks__list").css("display", "none")
        }

        $(document).on("click", ".createProject, .newProjectBtn", function () {
            createElem("project")
            dropMenu.removeClass("active__drop__menu")
        })

        $(document).on("click", ".newWeekGoalBtn", function () {
            createElem("weekGoal")
            dropMenu.removeClass("active__drop__menu")
        })

        $(document).on("click", ".newMonthGoalBtn", function () {
            createElem("monthGoal")
            dropMenu.removeClass("active__drop__menu")
        })

        $("#popWindowWeekGoal input[type='submit']").off("click")

        // меню "уведомления"

        $(".notifs__btn").click(function () {
            $(".notifications").toggleClass("active")
        })

})