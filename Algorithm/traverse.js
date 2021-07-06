function traverse() {
    let algo = document.querySelector('#Search').value;
    console.log(algo);
    switch(algo) {
        case 'BFS':
            bfs();
            break;
        case 'DFS':
            dfs();
            break;
        default:
            alert('Select Algorithm');
            break;
    }
}

function bfs() {   // start is row and col index in matrix
    let queue = [];
    queue.push(start);
    while(queue.length) {
        let [row,col] = queue.shift();
        if(matrix[row][col].visited)
            continue;
        matrix[row][col].visited = true;
        matrix[row][col].ref.classList +=' visited';
        
        if(matrix[row][col].isTarget) {
            colorPath();
            return;
        }

        if(col < matrix[row].length-1 && !matrix[row][col+1].visited && !matrix[row][col+1].isWall) {
            matrix[row][col+1].parent = matrix[row][col];
            queue.push([row,col+1]);
        }
        if(row > 0 && !matrix[row-1][col].visited && !matrix[row-1][col].isWall) {
            matrix[row-1][col].parent = matrix[row][col];
            queue.push([row-1,col]);
        }
        if(col > 0 && !matrix[row][col-1].visited && !matrix[row][col-1].isWall) {
            matrix[row][col-1].parent = matrix[row][col];
            queue.push([row,col-1]);
        }
        if(row < matrix.length-1 && !matrix[row+1][col].visited && !matrix[row+1][col].isWall) {
            matrix[row+1][col].parent = matrix[row][col];
            queue.push([row+1,col]);
        }
    }
}


function dfs() {
    let stack = [];
    stack.push(start);
    while(stack.length) {
        let [row,col] = stack.pop();
        matrix[row][col].visited = true;
        matrix[row][col].ref.classList += ' visited';

        if(matrix[row][col].isTarget) {
            colorPath();
            return;
        }

        if(col > 0 && !matrix[row][col-1].visited && !matrix[row][col-1].isWall) {
            matrix[row][col-1].parent = matrix[row][col];
            stack.push([row,col-1]);
        }
        if(row < matrix.length-1 && !matrix[row+1][col].visited && !matrix[row+1][col].isWall) {
            matrix[row+1][col].parent = matrix[row][col];
            stack.push([row+1,col]);
        }
        if(col < matrix[row].length-1 && !matrix[row][col+1].visited && !matrix[row][col+1].isWall) {
            matrix[row][col+1].parent = matrix[row][col];
            stack.push([row,col+1]);
        }
        if(row > 0 && !matrix[row-1][col].visited && !matrix[row-1][col].isWall) {
            matrix[row-1][col].parent = matrix[row][col];
            stack.push([row-1,col]);
        }
    }
}

function colorPath() {
    let node = matrix[target[0]][target[1]];
    if(!node.visited)
        alert('No Path');
    else{
        while(node) {
            node.ref.classList += ' path';
            node = node.parent;
        }
    }
}