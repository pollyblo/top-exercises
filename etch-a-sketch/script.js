const container = document.getElementById('container');
const squareGrids = document.getElementsByClassName('grid');
const slider = document.getElementById('grid-resolution');
console.log(slider);

let gridResolution = slider.value;
let mouseDown = false;

slider.addEventListener('click', () => {
    gridResolution = slider.value;
    removeGrid();
    setGrid()
    generateGrid();
    
});

function generateGrid() {
    for(let i = 0; i < gridResolution; i++) {
        const row = document.createElement("div")
        container.appendChild(row);
        for(let j = 0; j < gridResolution; j++) {
            const squareDiv = document.createElement("div");
            row.appendChild(squareDiv);
            // squareDiv.setAttribute('id', i);
            squareDiv.setAttribute('class', 'grid');
        }
    }
}

function removeGrid() {
    for(let i = 0; i < squareGrids.length; i++){
        for(let j = 0; j < squareGrids[i].length; j++)
        squareGrids[i][j].remove();
    }
}

function setGrid() {
    for(let i = 0; i < squareGrids.length; i++) {
        squareGrids[i].style.width = container.offsetWidth / gridResolution + "px";
        squareGrids[i].style.height = container.offsetHeight / gridResolution + "px";
    }
}

function drawingProcess() {
    for(let i in squareGrids) {
        squareGrids[i].addEventListener('mousedown', startDrawing)
        squareGrids[i].addEventListener('mouseover', drawing);
        document.body.addEventListener('mouseup', stopDrawing)
    }
}

function startDrawing(e) {
    mouseDown = !mouseDown;
    e.target.classList.add('blackgrid');
}

function drawing(e) {
    if (mouseDown) e.target.classList.add('blackgrid');
}

function stopDrawing() {
    mouseDown = !mouseDown;
}


function main() {
    // avoid drag
    window.ondragstart = () => false;
    
    // etch-a-sketch making
    generateGrid();
    setGrid();
    drawingProcess();
}

main();

