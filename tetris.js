// declare object tetris 
let tetris = {};

tetris.drawPlayField = () => {
    for (let row = 0; row < 22; row++) {
        $('#playfield').append(`<tr class="${row}"></tr>`);
        for (let col = 0; col < 10; col++) {
            $(`.${row}`).append(`<td id="${col}"></td>`);
        }
    }
}

$(document).ready(() => {
    tetris.drawPlayField();
})


