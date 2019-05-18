function shuffle(arr) {
    // Copy the array
    arr = arr.slice();

    // Fisher-Yates Shuffle
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let l = arr.length,
        temp,
        i;

    while (l) {
        i = Math.floor(Math.random() * l--);

        temp = arr[l];
        arr[l] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

function position(char, state) {
    let vector = [];

    for (let row = 0; row < state.length; row++) {
        let column = row.indexOf(char);

        if (column > -1) {
            vector = [row, column];
            break;
        }
    }

    return vector;
}

export { shuffle, position };
