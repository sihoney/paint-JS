const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

// giving pixel modifier sizes
canvas.width = CANVAS_SIZE;   
canvas.height = CANVAS_SIZE;

// default value
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;   
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { // painting === false 
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {  // painting === true (mouse down)
        ctx.lineTo(x, y);
        ctx.stroke();
    }
} 
/* 
lineto : adds a straight line to the current sub-path by connecting the sub-path's last point to the specified coordinates.

this method does NOT directly RENDER anything. 
To draw the path onto a canvas, you can use the fill() or stroke() methods.
*/

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick(){
    if( filling === true ) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';

    }
}

function handleCanvasClick(evnet){
    if( filling ) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL('image');
    const link = document.createElement('a');
    link.href =  image;
    link.download = 'PaintJS[🎨]';
    link.click(); // fake click
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if(range){
    range.addEventListener('input', handleRangeChange)
}

if(mode){
    mode.addEventListener('click', handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}