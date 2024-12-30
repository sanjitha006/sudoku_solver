
var p=document.getElementById("para");
function clear_g(){
p.textContent="";
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        document.getElementById(`r${i + 1}c${j + 1}`).value = 0;
    }
}
}
//clear_g();
function main(){

function convert_input_to_grid(){
    let g = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            var temp = Number(document.getElementById(`r${i + 1}c${j + 1}`).value) || 0;
            if((temp>9 )||(temp<0)){
                return(false)
            }
            g[i][j]=temp;
        }
    }
    function isValidSudoku(g) {
      
        for (let i = 0; i < 9; i++) {
            let rowSet = new Set();
            for (let j = 0; j < 9; j++) {
                if (g[i][j] !== 0) {
                    if (rowSet.has(g[i][j])) {
                        return false; 
                    }
                    rowSet.add(g[i][j]);
                }
            }
        }
    
        for (let j = 0; j < 9; j++) {
            let colSet = new Set();
            for (let i = 0; i < 9; i++) {
                if (g[i][j] !== 0) {
                    if (colSet.has(g[i][j])) {
                        return false; 
                    }
                    colSet.add(g[i][j]);
                }
            }
        }
    
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                let gridSet = new Set();
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let value = g[3 * boxRow + i][3 * boxCol + j];
                        if (value !== 0) {
                            if (gridSet.has(value)) {
                                return false; 
                            }
                            gridSet.add(value);
                        }
                    }
                }
            }
        }
    
        return true; // All checks passed
    }
    if(isValidSudoku(g)){
        return g;}
    else{
        return false;
    }

}
function convert_grid_to_output(result) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`r${i + 1}c${j + 1}`).value = result[i][j];
        }
    }
}


function solvesudoku(grid){
    let startTime = Date.now(); 
    function issafe(grid,i,j){
        var value = grid[i][j];
        if (value == 0){
            return true;}
      
        for (let col=0;col<9;col++){
            if ((col != j) && (grid[i][col] == value)){
                return false;}
        }
        for (let row=0;row<9;row++){
            if(( row != i) && (grid[row][j] == value)){
                return false;}
            }
        var start_row=3 * Math.floor(i/3);
        var start_col = 3 * Math.floor(j/3);

        for( let row=start_row;row<start_row + 3 ;row++){
            for( let col=start_col;col<start_col + 3 ;col++){
                if (((row != i) || (col != j)) && (grid[row][col] == value)){
                    return false;
                }
            }
        }
       
        return true   ;
    }
    function solve(grid,i,j){
        let elapsedTime = (Date.now() - startTime) / 1000; 
        if (elapsedTime > 15) {
            return(false); 
        }
        if (i == 9){ return grid;}
        if (j == 9){return solve(grid, i + 1, 0);}
        if (grid[i][j] != 0){return solve(grid, i, j + 1);}

        for (let k=1;k<10;k++){
            grid[i][j] = k;
            if (issafe(grid, i, j)){
                y=solve(grid,i,j+1);
                if(y!=false){
                    return y;
                }        
            }
            grid[i][j] = 0 ;
        }
        return false;
    
}
return(solve(grid,0,0));
}


var grid=convert_input_to_grid();
if(grid==false){
    p.textContent="Non valid input";
}
else{
    p.textContent="";
    var result=(solvesudoku(grid));
    
    if(result==false){
        p.textContent=("non-solvable!!")
        
}
else{
convert_grid_to_output(result);
}
}
}
