const setAlgo = document.querySelector('.algo');
setAlgo.addEventListener("click", () => { traverse(setAlgo) });

const reset = document.querySelector('.reset');

//function in ./scripts/grid returns a matrix of cell objects
let rows, cols;
resetGrid();
reset.addEventListener('click', () => { resetGrid() });

function resetGrid() {
    rows = Math.floor(window.innerHeight / 20) - 5;
    cols = Math.floor(window.innerWidth / 20);
    setAlgo.disabled = false;
    matrix = [];
    document.querySelector('table').innerHTML = '';
    matrix = grid(rows, cols);
}

// maze
const maze = document.querySelector('.maze');
maze.addEventListener('click', () => (makeMaze()));

function addBorder() {
    for (let i = 0; i < rows; i++) {
        addWall(matrix[i][0]);
        addWall(matrix[i][cols - 1]);
    }
    for (let i = 1; i < cols - 1; i++) {
        addWall(matrix[0][i]);
        addWall(matrix[rows - 1][i]);
    }
}

function getmid(start, end, prev = 0) {
    let mid = Math.round((end - start) * Math.random()) + start;
    // if (end - start <= 1) return mid;
    // while (mid == prev) {
    //     mid = Math.floor((end - start) * Math.random()) + start;
    // }
    return mid;
}

function divide(rs, re, cs, ce) {
    if (re - rs <= 3 && ce - cs <= 3) return;
    if (re - rs > ce - cs) {
        // let mid = Math.floor((rs + re) / 2);
        let mid = getmid(rs + 1, re - 1);
        while (!matrix[mid][cs - 1].isWall || !matrix[mid][ce + 1].isWall)
            mid = getmid(rs + 1, re - 1);
        let opening = getmid(cs, ce);
        for (let i = cs; i <= ce; i++) {
            if (i != opening) addWall(matrix[mid][i]);
        }
        divide(rs, mid - 1, cs, ce);
        divide(mid + 1, re, cs, ce);
    } else {
        // let mid = Math.floor((cs+ ce) / 2);
        let mid = getmid(cs + 1, ce - 1);
        while (!matrix[rs - 1][mid].isWall || !matrix[re + 1][mid].isWall)
            mid = getmid(cs + 1, ce - 1);
        let opening = getmid(rs, re);
        for (let i = rs; i <= re; i++) {
            if (i != opening) addWall(matrix[i][mid]);
        }
        divide(rs, re, cs, mid - 1);
        divide(rs, re, mid + 1, ce);
    }
}

function makeMaze() {
    resetGrid();
    addBorder();
    divide(1, rows - 2, 1, cols - 2);
    // divide(0, rows, 0, cols, -1);
}