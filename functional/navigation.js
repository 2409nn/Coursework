import {popUp, addEmptyState} from "./functions.js";

$(document).ready(function() {

    $("#burger").click(function() {

        $("aside").toggleClass("active")
        $("aside nav li a").css({"marginLeft" : "20px"})
        $("aside nav li a span").css({"fontSize": "12px",
            "marginLeft": "10px"})

    }) // обработка события "нажатие" на бургер

    // выпадающее меню

    const createBtn = $(".create")
    const dropMenu = $(".drop__menu")
    const createTask = $(".newTaskBtn")
    const createProject = $(".createProject, .newProjectBtn")
    const createWGoal = $(".newWeekGoalBtn")
    const createMGoal = $(".newMonthGoalBtn")

    createBtn.click(function() {
        dropMenu.toggleClass("active__drop__menu")})

    createTask.click(function () {
        $("#popWindowTask input").val("")
        popUp("popWindowTask")
        $("#popWindowTask input[type='submit']").val("Create")
        dropMenu.removeClass("active__drop__menu")
    })

    createProject.click(function () {
        $("#popWindowProject input").val("")
        $("#popWindowProject textarea").val("")
        popUp("popWindowProject")
        $("#popWindowProject input[type='submit']").val("Create")
        dropMenu.removeClass("active__drop__menu")
    })

    createWGoal.click(function () {
        $("#popWindowWeekGoal input").val("")
        popUp("popWindowWeekGoal")
        $("#popWindowWeekGoal input[type='submit']").val("Create")
        dropMenu.removeClass("active__drop__menu")

        if (addEmptyState($("#projects .weekGoals li:has(div)"), $("#projects .empty__state")) && addEmptyState($("#projects .monthGoals li:has(div)"), $("#projects .empty__state"))) {
            $("#projects .goals").css("display", "none")
        }

    })

    createMGoal.click(function () {
        $("#popWindowMonthGoal input[type='text']").val("")
        popUp("popWindowMonthGoal")
        dropMenu.removeClass("active__drop__menu")
    })

    // меню "уведомления"

    $(".notifs__btn").click(function(){
        $(".notifications").toggleClass("active")
    })

})