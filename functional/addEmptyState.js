function addEmptyState(listBlock, picture) {
    if (listBlock.children().length === 0 && picture !== undefined) {

        picture.css("display", "flex")

    }
}
