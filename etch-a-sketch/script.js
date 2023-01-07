const container = document.getElementById('container');
const squareGrids = document.getElementsByClassName('grid');
const gridResolution = 32;

let mouseDown = false;

main();

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

function setGrid() {
    for(let i = 0; i < squareGrids.length; i++) {
        squareGrids[i].style.width = container.offsetWidth / gridResolution + "px";
        squareGrids[i].style.height = container.offsetHeight / gridResolution + "px";
    }
}

function drawingProcess() {
    for(let i in squareGrids) {
        squareGrids[i].addEventListener('mousedown', drawing)
        container.addEventListener('mouseup', stopDrawing)
    }
}

function drawing(e) {
    e.target.classList.add('blackgrid');
    for(let i in squareGrids) {
        squareGrids[i].addEventListener('mousemove', (e) => {
            e.target.classList.add('blackgrid');
        })
    }
}

function stopDrawing(e) {
}

function main() {
    generateGrid();
    setGrid();
    drawingProcess();
}

