
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
    for (let i = 0; i < coordinates.length; i++) {
        let row = coordinates[i].row;
        let col = coordinates[i].col;
        var $coor = $(`.${row}`).find(`#${col}`);
        $coor.attr('bgcolor', fillColor);
    }
}

tetris.move = function (direction){
    this.fillCells(this.currentCoor, '');
    for (let i = 0; i < this.currentCoor.length; i++) {
        if (direction === 'R') {
            this.currentCoor[i].col++;
        } else if (direction === 'L') {
            this.currentCoor[i].col--;
        }
    }
    this.fillCells(this.currentCoor, 'blue');
}

$(document).ready(() => {
    tetris.drawPlayField();
    tetris.fillCells(tetris.currentCoor, 'blue');
    
    $(document).keydown((e)=> {
        console.log(e.keyCode);
        if (e.keyCode === 39) {
            tetris.move('R');
        }
        if (e.keyCode === 37) {
            tetris.move('L');
        }
    })
})


