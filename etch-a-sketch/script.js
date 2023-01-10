// TODO: Being able to mousedown outside of the container but still draw w/ mouseover - Toggle Drawing/Real Mode - Capture Mode (too much ?)

const container = document.getElementById('container');
const squareGrids = document.getElementsByClassName('grid');
const slider = document.getElementById('grid-resolution');
const columns = document.getElementsByClassName('columns');
const rainbowButton = document.getElementById('rainbow-btn');
const shadingButton = document.getElementById('shading-btn');
const clearButton = document.getElementById('clear-btn');

let gridResolution = slider.value;
let isMouseDown = false;
let isRainbow = false;

// Global Event Listeners

slider.addEventListener('change', () => {
    gridResolution = slider.value; 
    removeGrid();
    main();
});

rainbowButton.addEventListener('click', () => {
    isRainbow = true;
});

shadingButton.addEventListener('click', () => {
    isRainbow = false;
})

clearButton.addEventListener('click', () => {
    removeGrid();
    main();
})


// Main functions

function generateGrid() {
    for(let i = 0; i < gridResolution; i++) {
        const row = document.createElement("div")
        row.setAttribute('class', 'columns')
        container.appendChild(row);
        for(let j = 0; j < gridResolution; j++) {
            const squareDiv = document.createElement("div");
            row.appendChild(squareDiv);
            // squareDiv.setAttribute('id', i);
            squareDiv.setAttribute('class', 'grid');
            squareDiv.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        }
    }
}

function removeGrid() {
    for(let i = columns.length - 1; i >= 0; --i) {
        columns[i].remove();
    }
}

function setGrid() {
    for (let i = 0; i < squareGrids.length; i++) {
        squareGrids[i].style.width = container.offsetWidth / gridResolution + "px";
        squareGrids[i].style.height = container.offsetHeight / gridResolution + "px";
    }
}

function drawingProcess() {
    for (let grid of squareGrids) {
        grid.addEventListener('mousedown', startDrawing);
        grid.addEventListener('mouseover', drawing);
        document.body.addEventListener('mouseup', () => { isMouseDown = false });
    }
}

function startDrawing(e) {
    const rainbowColor = Math.floor(Math.random()*16777215).toString(16);
    isMouseDown = true;
    e.target.style.backgroundColor = isRainbow ? `#${rainbowColor}` : 'rgba(0, 0, 0, 0.1)'; 
}

function drawing(e) {
    if (isMouseDown) {
        const rainbowColor = Math.floor(Math.random()*16777215).toString(16); 
        if (isRainbow) {
            e.target.style.backgroundColor = '#' + rainbowColor;
        } else {
            let currentAlpha = getAlpha(e.target);
            e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha + 0.1})`;
        }
    }
}

function stopDrawing() {
    isMouseDown = false;
}


function main() {
    // avoid drag
    window.ondragstart = () => false;
    
    // etch-a-sketch process
    generateGrid();
    setGrid();
    drawingProcess();
}

// Utility functions

function getAlpha(element) {
    const bgColor = element.style.backgroundColor;
    return alpha = parseFloat(bgColor.split(',')[3]);
}

main();


