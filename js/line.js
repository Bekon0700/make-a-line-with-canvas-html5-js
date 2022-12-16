const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 10;
ctx.strokeStyle = "blue";

let pointers = []
let draw = false;

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    draw = true
    // pointers.length = 0 // to create new line whenever we click on the mouse
    pointers.push({
        x: e.offsetX,
        y: e.offsetY
    })
    decreaseSpeed = 0;
})


canvas.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (draw) {
        drawFirstLine(pointers)
        pointers.push({
            x: e.offsetX,
            y: e.offsetY
        })
    }
})

canvas.addEventListener('mouseup', (e) => {
    e.preventDefault();
    if (draw) {
        drawFirstLine(pointers)
        draw = false
    }
})

canvas.addEventListener('mouseout', (e) => {
    e.preventDefault();
    draw = false
})

function drawFirstLine(arr) {
    if(arr.length == 0){
        return
    }
    
    ctx.beginPath();
    ctx.moveTo(arr[0].x, arr[0].y);
    for(let i=0; i<arr.length; i++){
        ctx.lineTo(arr[i].x, arr[i].y);
    }
    ctx.stroke()
}


function animate() {
    requestAnimationFrame(animate);
    let lineSize = 15
    let decreaseSpeed = 1
    if(pointers.length >= lineSize+decreaseSpeed){
        // pointers.shift()
        pointers.splice(0, decreaseSpeed)
        console.log(pointers.length)
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawFirstLine(pointers)
}

animate()