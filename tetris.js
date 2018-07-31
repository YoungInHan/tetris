// declare object tetris 
let tetris = {};

tetris.drawPlayField = () => {
    for (let row = 0; row < 22; row++) {
        $('#playfield').append('');
        for (let col = 0; col < 10; col++) {
            $('.'+row).append('');
        }
    }
}

$(document).ready(() => {
    tetris.drawPlayField();
})


