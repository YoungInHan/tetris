
let tetris = {};

tetris.drawPlayField = () => {
    for (let row = 0; row < 22; row++) {
        $('#playfield').append(`<tr class="${row}"></tr>`);
        for (let col = 0; col < 10; col++) {
            $(`.${row}`).append(`<td id="${col}"></td>`);
        }
    }
}
tetris.origin = {row:5,col:5};
tetris.currentShape = 'T';
tetris.currentCoor;

tetris.shapeToCoor = (shape, origin) => {
    console.log('yea');
    switch (shape) {
        case 'L':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row+1, col: origin.col},
                {row: origin.row+1, col: origin.col+1},
            ];
        case 'I':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row+1, col: origin.col},
                {row: origin.row+2, col: origin.col},
            ];
        case 'J':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row+1, col: origin.col},
                {row: origin.row+1, col: origin.col-1},
            ];
        case 'O':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row-1, col: origin.col+1},
                {row: origin.row, col: origin.col+1},
            ];
        case 'Z':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row, col: origin.col-1},
                {row: origin.row+1, col: origin.col},
                {row: origin.row+1, col: origin.col+1},
            ];
        case 'T':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row, col: origin.col+1},
                {row: origin.row, col: origin.col-1},
            ];
        case 'S':
            return [
                {row: origin.row, col: origin.col},
                {row: origin.row-1, col: origin.col},
                {row: origin.row, col: origin.col-1},
                {row: origin.row-1, col: origin.col+1},
            ];
        default: 
            throw new Error('Unexpected letter passed into shapeToCoor()');
    }
}

tetris.fillCells = (coordinates, fillColor) => {
    for (let i = 0; i < coordinates.length; i++) {
        let row = coordinates[i].row;
        let col = coordinates[i].col;
        var $coor = $(`.${row}`).find(`#${col}`);
        $coor.attr('bgcolor', fillColor);
    }
}

tetris.move = function (direction){
    let onBorder = false;
    this.fillCells(this.currentCoor, '');
    for (let i = 0; i < this.currentCoor.length; i++) {
        if (direction === 'R') {
            this.currentCoor[i].col++;
            if (this.currentCoor[i].col > 9) {
                onBorder = true;
            }
        } else if (direction === 'L') {
            this.currentCoor[i].col--;
            if (this.currentCoor[i].col < 0) {
                onBorder = true;
            }
        }
    }
    this.fillCells(this.currentCoor, 'blue');

    if(onBorder && direction === 'L'){
        this.move('R');
    } else if (onBorder && direction === 'R'){
        this.move('L');
    }
}

$(document).ready(() => {
    tetris.drawPlayField();
    tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape, tetris.origin);
    tetris.fillCells(tetris.currentCoor, 'blue');
    $(document).keydown((e)=> {
        if (e.keyCode === 39) {
            tetris.move('R');
        }
        if (e.keyCode === 37) {
            tetris.move('L');
        }
    })
})


