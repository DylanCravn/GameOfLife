//initialize global variables
let grid;
let rows;
let columns;
let rez = 10;

//----------------------------------
//MAIN
//----------------------------------
function setup(){
    //create canvas (# of columns, # of rows)
    createCanvas(1520,1010);
    columns = width/rez; //width = width of canvas
    rows = height/rez; //height = height of canvas

    //create the grid
    grid = makeGrid(columns, rows);
    

    
    var mouseDown = 0;
    document.body.onmousedown = function() { 
      ++mouseDown;
        //console.log("mouse is down");
    }
    document.body.onmouseup = function() {
      --mouseDown;
        //console.log("mouse is up");
    }
    
    let xCord = 0;
    let yCord = 0;
    
    document.addEventListener('mousemove', (event) => {
        if(mouseDown){
            //console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
            let xPos =  event.clientX;
            let yPos =  event.clientY;
            xCord = floor(xPos / rez);
            yCord = floor(yPos / rez);
            grid[xCord][yCord] = 1;
        }        
    }); 
    
    document.getElementById('Random Start').addEventListener("click", function() {
        populateRandom(grid);
        setTimeout(() => {  console.log("World!"); }, 500);
    });
    
    document.getElementById('Run').addEventListener("click", function() {
        myLoop(1);


    });

}

//----------------------------------
//FUNCTIONS
//----------------------------------


//creates a 2d array populated with all 0's
function makeGrid(numCols, numRows){
    let ray = new Array(numCols);
    for(var i = 0; i < ray.length; i++){
        ray[i] = new Array(numRows);
        for(var j = 0; j < numRows; j++){
            ray[i][j] = 0;
        }
    }
    return ray;
}

function nextGen(grid){
    let nextGenGrid = makeGrid(columns, rows);
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            let neighborCount = count(grid, i, j);
            if(grid[i][j] == 0 && neighborCount == 3){
                nextGenGrid[i][j] = 1;   
            }else if(grid[i][j] == 1 && (neighborCount < 2 || neighborCount > 3)){
                nextGenGrid[i][j] == 0;         
            }else{
                nextGenGrid[i][j] = grid[i][j];    
            }
            
        }
    }
    return nextGenGrid;
}

function myLoop(i) {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    grid = nextGen(grid);   //  your code here
    i++;                    //  increment the counter
    if (i < 500) {           //  if the counter < 10, call the loop function
      myLoop(i);             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 40)
}


//populates a grid with 0's in each element
function populateRandom(gridInQuestion){
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            gridInQuestion[i][j] = floor(random(2));
        }
    }   
}

//count the number of alive cells surrounding a given cell
function count(grid, x, y){
    let sum = 0;  
    if(x != 0 && x != columns-1 && y != 0 && y != rows-1){ //NON EDGE *
        //console.log("non edge");
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if((i == 0 && j == 0) == false){
                    sum += grid[x+i][y+j];
                }
            }       
        }      
    }
    if(x == 0 && y == 0){ //TOP LEFT CORNER 
        //console.log("top left");
        sum += grid[x+1][y];
        sum += grid[x][y+1];
        sum += grid[x+1][y+1];
        return sum;
    }
    if(x == columns-1 && y == 0){ //TOP RIGHT CORNER 
        //console.log("top right");
        sum += grid[x-1][y];
        sum += grid[x][y+1];
        sum += grid[x-1][y+1];
        return sum;
    }
    if(x == 0 && y == rows-1){ //BOTTOM LEFT CORNER 
        //console.log("bot left");
        sum += grid[x][y-1];
        sum += grid[x+1][y-1];
        sum += grid[x+1][y];
        return sum;
    }
    if(x == columns-1 && y == rows-1){ //BOTTOM RIGHT CORNER 
        //console.log("bottom right");
        sum += grid[x][y-1];
        sum += grid[x-1][y];
        sum += grid[x-1][y-1];
        return sum;
    }
    if(x == 0 && (y != rows-1 || y != 0)){ //LEFT EDGE *
        //console.log("left edge");
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(((i == 0 && j == 0) || i == -1) == false){
                    sum += grid[x+i][y+j];
                }
            }       
        }      
    }
    if(x == columns-1 && (y != rows-1 || y != 0)){ //RIGHT EDGE *
        //console.log("right edge");
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(((i == 0 && j == 0) || i == 1) == false){
                    sum += grid[x+i][y+j];
                }
            }       
        }      
    }
    if(y == 0 && (x != columns-1 || x != 0)){ //TOP EDGE *
        //console.log("top edge");
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(((i == 0 && j == 0) || j == -1)== false){
                    sum += grid[x+i][y+j];
                }
            }       
        }      
    }
    if(y == rows-1 && (x != columns-1 || x != 0)){ //BOTTOM EDGE *
        //console.log("bot edge");
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(((i == 0 && j == 0) || j == 1)== false){
                    sum += grid[x+i][y+j];
                }
            }       
        }      
    }
    return sum;
}

//----------------------------------
//DRAW
//----------------------------------

function draw(){
    background(42,42,52);
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            let x = i * rez;
            let y = j * rez;
            if(grid[i][j] == 1){
                fill(255);
                stroke(0);
                rect(x,y,rez,rez);
            }
        }
    }  
}