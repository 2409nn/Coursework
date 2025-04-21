const $button = $(".changeTheme")
const $upgradeBackgroundImage = $(".upgradeImage")
const $backgroundImage = $("#headingOfBanner")

function applyTheme(theme) {
    if (theme === "dark") {
        $(":root").css({
            "--whiteColor": "#0E1013",
            "--textColor": "#FFFFFF",
            "--backgroundColor": "#1C1F25",
            "--borderColor": "#2E343E",
            "--pColor": "#FFFFFF",
            "--hoverButtonColor": "#ececec",
            "--grayDarkColor": "#ffffff",
            "--hoverElementColor": "#617488",
            "--borderDarkerColor": "#7e7e7e"
        });

        $upgradeBackgroundImage.css("background-image", 'url("../imgs/aside/background_upgrade_pro__dark.png")')
        if ($backgroundImage.length) {
            $backgroundImage.css("background-image", 'url("../imgs/main/background__dark.png")')
        }
    } else {
        $(":root").css({
            "--whiteColor": "#FFFFFF",
            "--textColor": "#1e1e1e",
            "--backgroundColor": "#FAFCFEFF",
            "--borderColor": "#F4F4F5",
            "--pColor": "#858587",
            "--hoverButtonColor": "#000000",
            "--grayDarkColor": "#1e1e1e",
            "--hoverElementColor": "#E3F5FF",
            "--borderDarkerColor": "#e4e4e4"
        });

        $upgradeBackgroundImage.css("background-image", 'url("../imgs/aside/background_upgrade_pro.png")')
        if ($backgroundImage.length) {
            $backgroundImage.css("background-image", 'url("../imgs/main/background.png")')
        }
    }
}

let theme = localStorage.getItem("theme") || "light"

applyTheme(theme)

$button.on("click", function() {

    theme = theme === "dark" ? "light" : "dark"

    applyTheme(theme)
    localStorage.setItem("theme", theme)

})