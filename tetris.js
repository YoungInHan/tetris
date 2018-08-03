
let tetris = {};
let game = {};

tetris.drawPlayField = () => {
    for (let row = 0; row < 22; row++) {
        $('#playfield').append(`<tr class="${row}"></tr>`);
        for (let col = 0; col < 10; col++) {
            $(`.${row}`).append(`<td id="${col}"></td>`);
        }
    }
}

tetris.origin = {row:1,col:5};
tetris.currentShape = 'J';
tetris.currentCoor;

tetris.shapeToCoor = (shape, origin) => {
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
                {row: origin.row+1, col: origin.col},
                {row: origin.row+1, col: origin.col-1},
                {row: origin.row, col: origin.col+1},
            ];
        default: 
            throw new Error('Unexpected letter passed into shapeToCoor()');
    }
}

tetris.rotate = function(direction) {
    let factor = 1
    if (direction === 'ccw') {
        factor = -1;
    } else {
    this.fillCells(this.currentCoor, '');
    }
    let prevCoor = this.currentCoor;
    for (let i = 0; i < this.currentCoor.length; i++) {
        this.currentCoor[i].row = this.currentCoor[i].row - this.origin.row;
        this.currentCoor[i].col = this.currentCoor[i].col - this.origin.col;
    };
    for (let i = 0; i < this.currentCoor.length; i++) {
        let temp = this.currentCoor[i].row;
        this.currentCoor[i].row =  this.currentCoor[i].col*factor;
        this.currentCoor[i].col = -temp*factor;
    }; 
    for( let i = 0; i < this.currentCoor.length; i++) {
        this.currentCoor[i].row = this.currentCoor[i].row + this.origin.row;
        this.currentCoor[i].col = this.currentCoor[i].col + this.origin.col;
    };
    for (let i = 0; i < this.currentCoor.length; i++) {
        if (this.isReverse()) {
            tetris.rotate('ccw');
        }
    }

    for(let i = 0; i < this.currentCoor.length; i++){
		if(this.currentCoor[i].col > 9) {
            tetris.move('L');
        }
        if (this.currentCoor[i].col < 0) {
            tetris.move('R');
        }
    }

    this.fillCells(this.currentCoor, 'blue');
}

tetris.fillCells = (coordinates, fillColor) => {
    for (let i = 0; i < coordinates.length; i++) {
        let row = coordinates[i].row;
        let col = coordinates[i].col;
        let $coor = $(`.${row}`).find(`#${col}`);
        $coor.attr('bgcolor', fillColor);
    }
}

tetris.move = function (direction){
    let onBorder = false;
    let isCollision = false;
    this.fillCells(this.currentCoor, '');
    for (let i = 0; i < this.currentCoor.length; i++) {
        if (direction === 'R') {
            this.currentCoor[i].col++;
            if (this.currentCoor[i].col > 9) {
                onBorder = true;
            } 
            if (this.isReverse()) {
                isCollision = true;
            }
        } else if (direction === 'L') {
            this.currentCoor[i].col--;
            if (this.currentCoor[i].col < 0) {
                onBorder = true;
            }
            if (this.isReverse()) {
                isCollision = true;
            }
        }
    }

    if (direction === 'R') {
        this.origin.col++;
    } else if (direction === 'L') {
        this.origin.col--;
    }
    

    if(isCollision && direction === 'L'){
        this.undo('R');
    } else if (isCollision && direction === 'R'){
        this.undo('L');
    }
    
    this.fillCells(this.currentCoor, 'blue');
    if(onBorder && direction === 'L'){
        this.undo('R', 'wall');
    } else if (onBorder && direction === 'R'){
        this.undo('L', 'wall');
    }
}

tetris.undo = function(direction, type) {
    if (type === 'wall') {
        this.fillCells(this.currentCoor, '');
    }
    for (let i = 0; i < this.currentCoor.length; i++) {
        if (direction === 'R') {
            this.currentCoor[i].col++;
        } else if (direction === 'L') {
            this.currentCoor[i].col--;
        }
    }

    if (direction === 'R') {
        this.origin.col++;
    } else if (direction === 'L') {
        this.origin.col--;
    }    
    this.fillCells(this.currentCoor, 'blue');
}

tetris.drop = function() {
    let reverse = false;
    this.fillCells(this.currentCoor,'');
    this.origin.row++;
    for(let i = 0; i < this.currentCoor.length; i++){
        this.currentCoor[i].row++;
		if(this.currentCoor[i].row > 21 || this.isReverse()){
			reverse = true;
        }
    }
    
    if (reverse) {
        for (let i = 0; i < this.currentCoor.length; i++) {
            this.currentCoor[i].row--;
        }
        this.origin.row--;
    }
    this.fillCells(this.currentCoor, 'blue');
    if (reverse) {
        this.fillCells(this.currentCoor,'BLUE');
        this.emptyFullRow();
        if (this.lost()) {
            alert('you lost fam');
            throw new Error();
        }
        tetris.spawn();
    }
}

tetris.fullDrop = function() {
    let reverse = false;
    while (!reverse) {
        this.fillCells(this.currentCoor,'');
        this.origin.row++;
        for(let i = 0; i < this.currentCoor.length; i++){
            this.currentCoor[i].row++;
            if(this.currentCoor[i].row > 21 || this.isReverse()){
                reverse = true;
            }
        }
        
        if (reverse) {
            for (let i = 0; i < this.currentCoor.length; i++) {
                this.currentCoor[i].row--;
            }
            this.origin.row--;
        }
        this.fillCells(this.currentCoor, 'blue');
        if (reverse) {
            this.fillCells(this.currentCoor,'BLUE');
            this.emptyFullRow();
            if (this.lost()) {
                alert('you lost fam');
                throw new Error();
            }
            tetris.spawn();
        }
    }
}

tetris.isReverse = function() {
    for(let i = 0; i < this.currentCoor.length; i++){
        let row = this.currentCoor[i].row;
        let col = this.currentCoor[i].col;
        let $coor = $(`.${row}`).find(`#${col}`);
        if($coor.attr('bgcolor') === 'BLUE') {
            return true;
        }
    }
    return false;
}

tetris.lost = function () {
    for (let i = 0; i < 10; i++) {
        let $coor = $('.3').find(`#${i}`);
        if($coor.attr('bgcolor') === 'BLUE') {
            return true;
        }
    }
    return false;
}

tetris.emptyFullRow = function() {
    let drops = 0;
    for (let i = 21; i >= 0; i--) {
        let rowIsFull = true;
            for (let j = 0 ;j < 10; j++){
            let $coor = $(`.${i}`).find(`#${j}`);
            if($coor.attr('bgcolor') !== 'BLUE'){
                rowIsFull = false;
            }
                if(drops > 0){
                let $newCoor = $('.'+(i+drops)).find('#'+j);
                $newCoor.attr('bgcolor', $coor.attr('bgcolor'));
            }
        }
        if(rowIsFull){
            drops++;
        }
    }
    if (drops > 0) {
        game.addScore(drops);
    }
}

tetris.spawn = function() {
    let random = Math.floor(Math.random()*7);
    //let shapeArray = ['L','J','I','O','S','T','Z'];
    let shapeArray = ['I','I','I','I','I','I','I'];
    this.currentShape = shapeArray[random];
    this.origin = {row:2,col:5};
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
}

$(document).ready(() => {

    game.play();
})

game.time = 0;
game.score = 0;

game.addScore = function(numRows) {
    switch (numRows) {
        case 1:
            this.score += 40;
            break;
        case 2:
            this.score += 100;
            break;
        case 3:
            this.score += 300;
            break;
        case 4:
            this.score += 1200;
            break;
            
    }
    $('#score').text(`Score: ${this.score}`);
}

game.play = function() {
    tetris.drawPlayField();
    tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape, tetris.origin);
    tetris.fillCells(tetris.currentCoor, 'blue');
    $(document).keydown((e)=> {
        if (e.keyCode === 39) {
            tetris.move('R');
        }
        if (e.keyCode === 38){
            tetris.rotate();
        }
        if (e.keyCode === 37) {
            tetris.move('L');
        }
        if (e.keyCode === 40){
            tetris.drop();
        }
        if (e.keyCode === 27){
            alert('Paused.');
        }  
        if (e.keyCode === 32){
            tetris.fullDrop();
        }  
    })

    let timer = setInterval(() => {
        this.time += 1;
        $('#timer').text(`Time: ${this.time}`);
    }, 1000);


    let gravity = setInterval(() =>{
        tetris.drop();
    },500);

}


