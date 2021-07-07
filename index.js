const setAlgo = document.querySelector('.algo');
setAlgo.addEventListener("click",() => {traverse(setAlgo)});

const rows = Math.floor(window.innerHeight/20)- 5;
const cols = Math.floor(window.innerWidth/20);

//function in ./scripts/grid returns a matrix of cell objects
let matrix = grid(rows,cols);
