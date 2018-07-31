
let tetris = {};

tetris.drawPlayField = () => {
    for (let row = 0; row < 22; row++) {
        $('#playfield').append(`<tr class="${row}"></tr>`);
        for (let col = 0; col < 10; col++) {
            $(`.${row}`).append(`<td id="${col}"></td>`);
        }
    }
}

tetris.currentCoor = [
    {row:1,col:1},
    {row:1,col:2},
    {row:2,col:1},
    {row:2,col:2},
];

tetris.fillCells = (coordinates, fillColor) => {
    console.log(fillColor);
    for (let i = 0; i < coordinates.length; i++) {
        let row = coordinates[i].row;
        let col = coordinates[i].col;
        var $coor = $(`.${row}`).find(`#${col}`);
        $coor.attr('bgcolor', fillColor);
    }
}

$(document).ready(() => {
    tetris.drawPlayField();
    tetris.fillCells(tetris.currentCoor, 'blue');
})


