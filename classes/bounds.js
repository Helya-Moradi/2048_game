class Bounds {
    i;
    j;
    slotsContainer;
    slots;

    constructor(i, j, slotsContainer, slots) {
        this.i = i;
        this.j = j;
        this.slotsContainer = slotsContainer;
        this.slots = slots;
    }

    calculateTileBounds() {
        const slotsContainerBounds = this.slotsContainer.getBoundingClientRect();
        const slotBounds = this.slots[this.i][this.j].getBoundingClientRect();

        return {
            left: slotBounds.left - slotsContainerBounds.left,
            top: slotBounds.top - slotsContainerBounds.top,
            width: slotBounds.width,
            height: slotBounds.height
        }
    }
}

export default Bounds;