import getBackgroundColors from '../utils/getBackgrounds.js'

class Tile {
    value;
    element;

    constructor(value, bounds) {
        this.value = value;

        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = value.toString();

        tile.style.left = `${bounds.left}px`;
        tile.style.top = `${bounds.top}px`;
        tile.style.width = `${bounds.width}px`;
        tile.style.height = `${bounds.height}px`;

        tile.style.backgroundColor = getBackgroundColors(value);

        this.element = tile;

        this.addAnimate();
    }

    move(bounds) {
        this.element.animate(
            [
                {
                    left: `${bounds.left}px`,
                    top: `${bounds.top}px`
                },
            ],
            {
                duration: 200,
                fill: "forwards",
                easing: 'ease-in-out'
            }
        )
    }

    upgrade() {
        this.value *= 2;
        this.element.textContent = this.value.toString();

        this.mergeAnimate();
    }

    addAnimate() {
        this.element.animate(
            [
                {transform: 'scale(0)'},
                {transform: 'scale(1)'},
            ],
            {
                duration: 200,
                easing: 'ease-in-out'
            }
        )
    }

    mergeAnimate() {
        this.element.animate(
            [
                {
                    transform: 'scale(1.1)',
                },
                {
                    transform: 'scale(1)',
                    backgroundColor: getBackgroundColors(this.value),
                    color: this.value <= 4 ? '#776e65' : '#fff'
                }
            ],
            {
                duration: 200,
                fill: "forwards",
                easing: 'ease-in-out'
            }
        )
    }
}

export default Tile;