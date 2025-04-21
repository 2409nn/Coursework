import {popUp} from "../functional/popUpFuncs.js";

$(document).ready(function() {
    const createBtn = $("#create")
    const dropMenu = $(".drop__menu")

    const createTask = $("#newTaskBtn")
    const createProject = $("#createProject")


    createBtn.click(function() {
        dropMenu.toggleClass("active__drop__menu")

        createTask.click(function () {

            popUp("popWindowTask")
            dropMenu.removeClass("active__drop__menu")

        })

    })


})