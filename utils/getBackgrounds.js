function getBackgroundColors(value) {
    const backgroundColors = ['#eee4da', '#eee1c9', '#f3b27a', '#f69664', '#f77c5f', '#f75f3b', '#edd073', '#edcc63', '#edc651', '#eec744', '#ecc230'];

    return backgroundColors[Math.log2(value) - 1]
}

export default getBackgroundColors;