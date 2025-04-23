import {popUp} from "./popUpFuncs.js";

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
        popUp("popWindowTask")
        dropMenu.removeClass("active__drop__menu")

    })

    createProject.click(function () {
        popUp("popWindowProject")
        dropMenu.removeClass("active__drop__menu")
    })

    createWGoal.click(function () {
        popUp("popWindowWeekGoal")
        dropMenu.removeClass("active__drop__menu")
    })

    createMGoal.click(function () {
        popUp("popWindowMonthGoal")
        dropMenu.removeClass("active__drop__menu")
    })



})