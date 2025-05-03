const $button = $(".changeTheme")
const $upgradeBackgroundImage = $(".upgradeImage")
const $backgroundImage = $("#headingOfBanner")

// function changePicture(picture, lightVersion, darkVersion) {
//     if (theme === "dark") {
//
//         console.log(picture.url)
//
//     }
// }

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
            "--borderDarkerColor": "#7e7e7e",
            "--bodyColor": "#181b20"
        });

        $upgradeBackgroundImage.css("background-image", 'url("../imgs/aside/background_upgrade_pro__dark.png")')
        if ($backgroundImage.length) {
            $backgroundImage.css("background-image", 'url("../imgs/main/background__dark.png")')
        }

        // менять на темную суда

        if ($("#head").find(".picture").length > 0) {
            $("#head picture").find("source").attr("srcset", "../imgs/introdution/mobile_version_dark.png")
            $("#head").find(".picture").attr("src", "../imgs/introdution/DesktopHomepage-dark.jpg")
        }

        if ($("#productivity .images").length > 0) {
            $("#productivity .images .back").attr("src", "../imgs/introdution/lin_graph_desktop_dark.png")
            $("#productivity .images .forward").attr("src", "../imgs/introdution/bar_graph_desktop_dark.png")
        }

        if ($("#reminders .info .images").length > 0) {
            $("#reminders .info .images img").attr("src", "../imgs/introdution/reminders_dark.png")
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
            "--borderDarkerColor": "#e4e4e4",
            "--bodyColor": "#CBEDFF"
        });

        $upgradeBackgroundImage.css("background-image", 'url("../imgs/aside/background_upgrade_pro.png")')
        if ($backgroundImage.length) {
            $backgroundImage.css("background-image", 'url("../imgs/main/background.png")')
        }

        // менять на светлую суда

        if ($("#head").find(".picture").length > 0) {
            $("#head picture").find("source").attr("srcset", "../imgs/introdution/mobile_version_light.png")
            $("#head").find(".picture").attr("src", "../imgs/introdution/DesktopHomepage-light.jpg")
        }

        if ($("#productivity .images").length > 0) {
            $("#productivity .images .back").attr("src", "../imgs/introdution/lin_graph_desktop_light.png")
            $("#productivity .images .forward").attr("src", "../imgs/introdution/bar_graph_desktop_light.png")
        }

        if ($("#reminders .info .images").length > 0) {
            $("#reminders .info .images img").attr("src", "../imgs/introdution/reminders_light.png")
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