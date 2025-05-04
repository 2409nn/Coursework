import { popUp } from "./functions.js";

$(document).ready(function () {
    const elements = {
        createBtn: $(".create"),
        dropMenu: $(".drop__menu"),
        createTask: $(".newTaskBtn"),
        createProject: $(".createProject, .newProjectBtn"),
        createWGoal: $(".newWeekGoalBtn"),
        createMGoal: $(".newMonthGoalBtn"),
        notifsBtn: $(".notifs__btn"),
        notifications: $(".notifications")
    }

    elements.createBtn.on("click", toggleDropMenu)
    elements.createTask.on("click", handleTaskCreation)
    elements.createProject.on("click", handleProjectCreation)
    elements.createWGoal.on("click", handleWeekGoalCreation)
    elements.createMGoal.on("click", handleMonthGoalCreation)
    elements.notifsBtn.on("click", toggleNotifications)

    function toggleDropMenu() {
        elements.dropMenu.toggleClass("active__drop__menu")
    }

    function handleTaskCreation() {
        clearInput("#popWindowTask input[type='text']")
        popUp("popWindowTask")
        closeDropMenu()
    }

    function handleProjectCreation() {
        clearInput("#popWindowProject input[type='text']")
        popUp("popWindowProject")
        closeDropMenu()
    }

    function handleWeekGoalCreation() {
        clearInput("#popWindowWeekGoal input[type='text']")
        popUp("popWindowWeekGoal")
        closeDropMenu()
    }

    function handleMonthGoalCreation() {
        clearInput("#popWindowMonthGoal input[type='text']")
        popUp("popWindowMonthGoal")
        closeDropMenu()
    }

    function toggleNotifications() {
        elements.notifications.toggleClass("active")
    }

    function clearInput(selector) {
        $(selector).val("")
    }

    function closeDropMenu() {
        elements.dropMenu.removeClass("active__drop__menu")
    }
})