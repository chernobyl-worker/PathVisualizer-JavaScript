let start;
let target;

function grid(rows, cols) {
    let matrix = [];
    start = [Math.floor(rows/2),Math.floor(cols/4)];
    target = [Math.floor(rows/2),Math.floor(cols/4)*3];
    const board = document.querySelector('table');
    for(let i=0; i<rows; i++) {
        let tr = document.createElement('tr');
        let temp = [];
        for(let j=0; j<cols; j++) {
            let cell = document.createElement('td');
            temp.push(new Cell(i,j,cell,start,target));
            if(temp[j].isTarget)
               temp[j].ref.innerHTML = '<i class="fas fa-bullseye"></i>';
            if(temp[j].isStart)
                temp[j].ref.innerHTML = '<i class="fas fa-star-of-life"></i>';
            tr.appendChild(cell);
            cell.addEventListener('click',() => {addWall(temp[j])});
        }
        matrix.push(temp);
        board.appendChild(tr);
    }
    return matrix;
}

class Cell {
    constructor(row,col,ref,start,target) {
        this.rc = [row,col];
        this.visited = false;
        this.parent = null;
        this.isTarget = row === target[0] && col === target[1];
        this.isStart = row === start[0] && col === start[1];
        this.isWall = false;
        this.ref = ref;
    }
}

function addWall(cell) {
    if(!cell.isStart && !cell.isTarget) {
        if(cell.isWall) {
            cell.ref.classList = 'blank';
            cell.isWall = false;
        } else {
            cell.ref.classList = 'wall';
            cell.isWall = true;
        }
    }
}