canvas = document.getElementById('canvas');
canvas.height = window.innerHeight - 50;
canvas.width = window.innerWidth - 50;

const ctx = canvas.getContext('2d');
const origin = {x: canvas.width / 2, y: canvas.height / 2};
const L1length = 300;
const L2length = 200;

function drawLine(start, end, width, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start.x + origin.x, start.y + origin.y);
    ctx.lineTo(end.x + origin.x, end.y + origin.y);
    ctx.stroke();
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine({x: -canvas.width, y: 0}, {x: canvas.width, y: 0}, 5, 'black');
    drawLine({x: 0, y: -canvas.height}, {x: 0, y: canvas.height}, 5, 'black');
}

// Conversion from degrees to radians
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

document.addEventListener('mousemove', (mouse) => {
    let mouseX = mouse.clientX - origin.x;
    let mouseY = mouse.clientY - origin.y;
    let d = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(mouseY, 2));

    if (d > L1length + L2length) {
        // Scale down the target to the maximum reachable distance
        mouseX = mouseX * (L1length + L2length) / d;
        mouseY = mouseY * (L1length + L2length) / d;
        d = L1length + L2length;
    }

    if(Math.abs(L1length - L2length) > d){
        return;
    }
    
    drawBoard();
    console.log('drawing...');
    O2 = Math.PI - Math.acos((Math.pow(L1length, 2) + Math.pow(L2length, 2) - Math.pow(d, 2))/(2*L1length*L2length));
    O1 = Math.atan2(mouseY, mouseX) - Math.asin(Math.sin(O2)*L2length/d);

    let p1 = {x: L1length * Math.cos(O1), y: L1length * Math.sin(O1)};
    let p2 = {x: p1.x + L2length * Math.cos(O2 + O1), y: p1.y + L2length * Math.sin(O2 + O1)};

    drawLine({x:0,y:0}, p1, 5, 'red');
    drawLine(p1, p2, 5, 'green');

    ctx.beginPath();
    ctx.arc(origin.x, origin.y, L1length + L2length, 0, 2*Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    if(Math.abs(L1length - L2length) >= L1length - L2length){
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, Math.abs(L1length - L2length), 0, 2*Math.PI);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
});
