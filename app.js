const items = document.querySelectorAll('.item');
const container = document.querySelector('#container');

let dragItem = null;

items.forEach((item) => {
    // Desktop events
    item.addEventListener('dragstart', itemDragStart);
    item.addEventListener('dragend', itemDragEnd);
    item.addEventListener('dragover', itemDragOver);

    // Mobile events
    item.addEventListener('touchstart', itemDragStart);
    item.addEventListener('touchend', itemDragEnd);
    item.addEventListener('touchmove', itemDragOver);
});

function itemDragStart() {
    this.classList.add('dragging');
    dragItem = this;
}

function itemDragEnd() {
    this.classList.remove('dragging');
    dragItem = null;
}

function itemDragOver(event) {
    event.preventDefault();

    swapeItems(event);
}

function swapeItems(event) {
    const allItems = [...items];
    const mousePositionY = event.clientY || event.targetTouches[0].clientY;

    const swapItem = nearestItem(allItems, mousePositionY);

    const indexSwapItem = [...container.children].findIndex(
        (e) => e === swapItem
    );
    const indexDragItem = [...container.children].findIndex(
        (e) => e === dragItem
    );

    indexSwapItem > indexDragItem ? swapItem.after(dragItem) : null;
    indexSwapItem < indexDragItem ? swapItem.before(dragItem) : null;
}

function getItemPosition(item) {
    const boundingItem = item.getBoundingClientRect();
    const centerOfTheItemY = boundingItem.top + boundingItem.height / 2;
    return centerOfTheItemY;
}

function nearestItem(items, mousePositionY) {
    return items.reduce((acc, cur) => {
        const curItemPosition = getItemPosition(cur);
        const accItemPosition = getItemPosition(acc);

        const distance_curItem_mouse = Math.abs(
            curItemPosition - mousePositionY
        );
        const distance_accItem_mouse = Math.abs(
            accItemPosition - mousePositionY
        );

        acc = distance_curItem_mouse < distance_accItem_mouse ? cur : acc;

        return acc;
    });
}
