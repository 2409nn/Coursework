$(document).ready(function() {
    const createBtn = $("#create")
    const dropMenu = $(".drop__menu")


    createBtn.click(function() {

        dropMenu.toggleClass("active__drop__menu")

    })


})