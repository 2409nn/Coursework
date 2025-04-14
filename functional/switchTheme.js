const button = document.getElementById("changeTheme")
const upgradeBackgroundImage = document.getElementById("upgradeImage")
const backgroundImage = document.getElementById("headingOfBanner")
const icon = document.getElementsByClassName("icon")

var theme = "light"

function changeThemeToDark() {

    if (theme === "light") {
        document.documentElement.style.setProperty('--whiteColor', '#0E1013')
        document.documentElement.style.setProperty('--textColor', '#FFFFFF')
        document.documentElement.style.setProperty('--backgroundColor', '#1C1F25')
        document.documentElement.style.setProperty('--borderColor', '#2E343E')
        document.documentElement.style.setProperty('--textColor', '#FFFFFF')
        document.documentElement.style.setProperty('--pColor', '#FFFFFF')
        document.documentElement.style.setProperty('--hoverButtonColor', '#ececec')
        document.documentElement.style.setProperty('--grayDarkColor', '#ffffff')
        document.documentElement.style.setProperty('--hoverElementColor', '#617488')
        document.documentElement.style.setProperty('--borderDarkerColor', '#7e7e7e')

        upgradeBackgroundImage.style.backgroundImage = 'url("../imgs/aside/background_upgrade_pro__dark.png")'
        if (backgroundImage !== null) {
            backgroundImage.style.backgroundImage = 'url("../imgs/main/background__dark.png")'
        }

        theme = "dark"

    }
}

function changeThemeToLight() {

    if (theme === "dark") {
        document.documentElement.style.setProperty('--whiteColor', '#FFFFFF')
        document.documentElement.style.setProperty('--textColor', '#1e1e1e')
        document.documentElement.style.setProperty('--backgroundColor', '#FAFCFEFF')
        document.documentElement.style.setProperty('--borderColor', '#F4F4F5')
        document.documentElement.style.setProperty('--textColor', 'black')
        document.documentElement.style.setProperty('--pColor', '#858587')
        document.documentElement.style.setProperty('--hoverButtonColor', '#000000')
        document.documentElement.style.setProperty('--grayDarkColor', '#1e1e1e')
        document.documentElement.style.setProperty('--hoverElementColor', '#E3F5FF')
        document.documentElement.style.setProperty('--borderDarkerColor', '#e4e4e4')

        upgradeBackgroundImage.style.backgroundImage = 'url("../imgs/aside/background_upgrade_pro.png")'

        if (backgroundImage !== null) {
            backgroundImage.style.backgroundImage = 'url("../imgs/main/background.png")'
        }

        theme = "light"
    }
}


button.addEventListener('click', function() {

    switch (theme) {
        case "dark":
            changeThemeToLight()
            break;

        case "light":
            changeThemeToDark()
            break;
    }

})