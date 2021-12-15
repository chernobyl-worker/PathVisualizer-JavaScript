function traverse(e) {
    let algo = document.querySelector('#Search').value;
    let path;
    console.log(algo);
    switch (algo) {
        case 'BFS':
            e.disabled = true;
            path = bfs();
            break;
        case 'DFS':
            e.disabled = true;
            path = dfs();
            break;
        default:
            alert('Select Algorithm');
            break;
    }
    if (matrix[target[0]][target[1]].visited)
        colorPath(path);
    else
        e.disabled = false;
}

function bfs() {   // start is row and col index in matrix
    let queue = [];
    queue.push(start);
    let i = 0;
    while (i < queue.length) {
        let [row, col] = queue[i++];
        if (matrix[row][col].visited)
            continue;
        matrix[row][col].visited = true;
        // matrix[row][col].ref.classList +=' visited';

        if (matrix[row][col].isTarget) {
            // colorPath();
            return queue;
        }

        if (col < matrix[row].length - 1 && !matrix[row][col + 1].visited && !matrix[row][col + 1].isWall) {
            matrix[row][col + 1].parent = matrix[row][col];
            queue.push([row, col + 1]);
        }
        if (row > 0 && !matrix[row - 1][col].visited && !matrix[row - 1][col].isWall) {
            matrix[row - 1][col].parent = matrix[row][col];
            queue.push([row - 1, col]);
        }
        if (col > 0 && !matrix[row][col - 1].visited && !matrix[row][col - 1].isWall) {
            matrix[row][col - 1].parent = matrix[row][col];
            queue.push([row, col - 1]);
        }
        if (row < matrix.length - 1 && !matrix[row + 1][col].visited && !matrix[row + 1][col].isWall) {
            matrix[row + 1][col].parent = matrix[row][col];
            queue.push([row + 1, col]);
        }
    }
    alert('NO Path');
}


function dfs() {
    let stack = [];
    let path = [];
    stack.push(start);
    while (stack.length) {
        path.push(stack.pop());
        let [row, col] = path[path.length - 1];
        matrix[row][col].visited = true;
        // matrix[row][col].ref.classList += ' visited';

        if (matrix[row][col].isTarget) {
            // colorPath(); 
            return path;
        }

        if (col > 0 && !matrix[row][col - 1].visited && !matrix[row][col - 1].isWall) {
            matrix[row][col - 1].parent = matrix[row][col];
            stack.push([row, col - 1]);
        }
        if (row < matrix.length - 1 && !matrix[row + 1][col].visited && !matrix[row + 1][col].isWall) {
            matrix[row + 1][col].parent = matrix[row][col];
            stack.push([row + 1, col]);
        }
        if (col < matrix[row].length - 1 && !matrix[row][col + 1].visited && !matrix[row][col + 1].isWall) {
            matrix[row][col + 1].parent = matrix[row][col];
            stack.push([row, col + 1]);
        }
        if (row > 0 && !matrix[row - 1][col].visited && !matrix[row - 1][col].isWall) {
            matrix[row - 1][col].parent = matrix[row][col];
            stack.push([row - 1, col]);
        }
    }
    alert("NO Path");
}

function colorPath(path) {
    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            let [row, col] = path[i];
            if (matrix[row][col].visited) {
                matrix[row][col].ref.classList = 'visited';
            }
        }, 3 * i);
        for (let node = matrix[target[0]][target[1]], j = path.length; node != null; node = node.parent, j++) {
            setTimeout(() => {
                node.ref.classList = ' path';
            }, 4 * j);
        }
    }
}