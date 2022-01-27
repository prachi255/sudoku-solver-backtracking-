var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}
function isValid(r,c,k,board){
    //checking in the entire row and column
    for(let i=0;i<9;i++){
        if(board[r][i]==k && i!=c ){
            return false;
        }
        if(board[i][c]==k && i!=r ){
            return false;
        }
    }



    //checking in 3*3 box
    let TopRowIndice = r - r % 3;
    let TopColIndice = c - c % 3;

    for(let i=TopRowIndice ; i<TopRowIndice+3;i++){
        for(let j=TopColIndice ; j<TopColIndice+3;j++){
            if(i==r && j==c){
                continue;
            }
            if(board[i][j]==k){
                return false;
            }
        }
    }
    return true;
}
// you can make a call to changeboard(board) function to update the state on the screen
function solveSudokuHelper(board,r,c){

    //base case 
    if(r==9){
        changeBoard(board);
        return true;
    }
    //other cases - write your code here
    if(c==9){
        return solveSudokuHelper(board,r+1,0)
    }
//finding the first empty place
for(let k=1;k<=9;k++){
    if(isValid(r,c,k,board)){
        board[r][c]=k;
        if(solveSudokuHelper(board,r,c+1)==true){
            return true;
        }
        else{
            board[r][c]=0;
        }
    }
}
return false;

   }

function solveSudoku(board) {
    solveSudokuHelper(board,0,0);
}


solve.onclick = function () {
    solveSudoku(board)
}