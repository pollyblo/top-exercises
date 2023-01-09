// TODO: Shading Mode - Being able to mousedown outside of the container but still draw w/ mouseover - Clear functionnality - Toggle Drawing/Real Mode 

const container = document.getElementById('container');
const squareGrids = document.getElementsByClassName('grid');
const slider = document.getElementById('grid-resolution');
const columns = document.getElementsByClassName('columns');
const rainbowButton = document.getElementById('rainbow-btn');

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
    console.log(isRainbow);
});

// Functions of EaS

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
        }
    }
}

function removeGrid() {
    for(let i = columns.length - 1; i >= 0; --i) {
        columns[i].remove();
    }
}



function setGrid() {
    for(let i = 0; i < squareGrids.length; i++) {
        squareGrids[i].style.width = container.offsetWidth / gridResolution + "px";
        squareGrids[i].style.height = container.offsetHeight / gridResolution + "px";
    }
}

function drawingProcess() {
    for(let grid of squareGrids) {
        grid.addEventListener('mousedown', startDrawing);
        grid.addEventListener('mouseover', drawing);
        document.body.addEventListener('mouseup', stopDrawing);
    }
}

function startDrawing(e) {
    const rainbowColor = Math.floor(Math.random()*16777215).toString(16);
    isMouseDown = true;
    e.target.style.backgroundColor = isRainbow ? `#${rainbowColor}` : 'black'; 
}

function drawing(e) {
    if (isMouseDown) {
        const rainbowColor = Math.floor(Math.random()*16777215).toString(16); 
        console.log('avant')
        if (isRainbow) {
            e.target.style.backgroundColor = '#' + rainbowColor;
            console.log('après');
        } else {
            e.target.style.backgroundColor = 'black';
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


main();


