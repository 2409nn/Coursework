export function popUp(popId) {

    $(`#${popId}`).css("display", "block")
    $(`#${popId}`).animate({
        opacity: 1,
        bottom: 150,
    }, 350)

    $("main, aside, header").css({
        transition: "filter 0.35s",
        filter: "brightness(80%)"
    })

    $(window).keydown(function (event) {
        if (event.key === "Escape") {

            $(".close__button").closest(".pop__up").animate({
                opacity: 0,
                bottom: 450,
            }, 400, function () {
                $("main, aside, header").css("filter", "brightness(100%)")
                $(this).closest(".pop__up").css("display", "none")
            })

        }
    })

    $(".close__button").click(function () {
        $(this).closest(".pop__up").animate({
            opacity: 0,
            bottom: 450,
        }, 400, function () {
            $("main, aside, header").css("filter", "brightness(100%)")
            $(this).closest(".pop__up").css("display", "none")
        })

    })

}