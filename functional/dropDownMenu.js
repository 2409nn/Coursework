import {popUp} from "./popUpFuncs.js";
import {addEmptyState} from "./addEmptyState.js";

$(document).ready(function() {
    const createBtn = $(".create")
    const dropMenu = $(".drop__menu")

    const createTask = $(".newTaskBtn")
    const createProject = $(".createProject, .newProjectBtn")
    const createWGoal = $(".newWeekGoalBtn")
    const createMGoal = $(".newMonthGoalBtn")


    createBtn.click(function() {
        dropMenu.toggleClass("active__drop__menu")})


    createTask.click(function () {
        $("#popWindowTask input[type='text']").val("")
        popUp("popWindowTask")
        dropMenu.removeClass("active__drop__menu")

    })

    createProject.click(function () {
        $("#popWindowProject input[type='text']").val("")
        popUp("popWindowProject")
        dropMenu.removeClass("active__drop__menu")
    })

    createWGoal.click(function () {
        $("#popWindowWeekGoal input[type='text']").val("")
        popUp("popWindowWeekGoal")
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



})