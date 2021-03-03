const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "2c2c2c";
const CANVAS_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;
const saveBtn = document.getElementById("jsSave");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//canvas 색상과 선의 크기
ctx.lineWidth = 2.5;
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";


let painting = false;
let filling = false; // fill 후 painting 위해서;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true;
}
function changeColors(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}


function handleCanvasClick(event) {
    if (filling) {

        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveImage(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Download[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColors));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveImage);
}