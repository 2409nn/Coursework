export function addEmptyState(listBlock, picture) {

    if (listBlock.children().length === 0 && picture !== undefined) { // если пусто и ссылка на картинку добавлена
        picture.css("display", "flex") // обращаемся к картинке и делаем ее отображаемой

        return true
    }
}

