export async function popUp(popId) {
    return new Promise((resolve) => {
        const $popup = $(`#${popId}`);

        // Сброс анимационного состояния
        $popup.css({
            display: "block",
            opacity: 0,
            transform: "translate(-50%, -60%)", // немного выше центра
            left: "50%",
            top: "50%",
            position: "fixed"
        });

        // Показ с анимацией
        $popup.animate({
            opacity: 1,
        }, {
            duration: 350,
            step: function (now, fx) {
                if (fx.prop === "opacity") {
                    const progress = now;
                    const translateY = -60 + (10 * progress); // от -60% до -50%
                    $(this).css("transform", `translate(-50%, ${translateY}%)`);
                }
            }
        });

        $("main, aside, header").css({
            transition: "filter 0.35s",
            filter: "brightness(80%)"
        });

        // Закрытие
        const closePopup = () => {
            $popup.animate({
                opacity: 0,
            }, {
                duration: 400,
                step: function (now, fx) {
                    if (fx.prop === "opacity") {
                        const progress = 1 - now;
                        const translateY = -50 + (10 * progress); // от -50% до -60%
                        $(this).css("transform", `translate(-50%, ${translateY}%)`);
                    }
                },
                complete: function () {
                    $("main, aside, header").css("filter", "brightness(100%)");
                    $popup.css("display", "none");
                    resolve();
                    detachEvents();
                }
            });
        };

        // Обработчики
        const onEsc = (event) => {
            if (event.key === "Escape") {
                closePopup();
            }
        };

        const onClickClose = () => {
            closePopup();
        };

        $(window).on("keydown", onEsc);
        $(".close__button").on("click", onClickClose);

        function detachEvents() {
            $(window).off("keydown", onEsc);
            $(".close__button").off("click", onClickClose);
        }
    });
}
