const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

const charges = [
    { x: 200, y: 200, q: 1, dragging: false },
    { x: 400, y: 200, q: -1, dragging: false }
];

let k = 9e4; // Coulomb's constant (scaled for visualization)
let mouse = { x: 0, y: 0, isDown: false };

canvas.addEventListener("mousedown", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    mouse.isDown = true;
    
    for (let charge of charges) {
        if (Math.hypot(mouse.x - charge.x, mouse.y - charge.y) < 15) {
            charge.dragging = true;
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (!mouse.isDown) return;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    
    for (let charge of charges) {
        if (charge.dragging) {
            charge.x = mouse.x;
            charge.y = mouse.y;
        }
    }
});

canvas.addEventListener("mouseup", () => {
    mouse.isDown = false;
    charges.forEach(charge => charge.dragging = false);
});

function computePotential(x, y) {
    let V = 0;
    for (let charge of charges) {
        let r = Math.hypot(x - charge.x, y - charge.y);
        if (r !== 0) V += (k * charge.q) / r;
    }
    return V;
}


function drawCharges() {
    for (let charge of charges) {
        ctx.beginPath();
        ctx.arc(charge.x, charge.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = charge.q > 0 ? "red" : "blue";
        ctx.fill();
        ctx.stroke();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharges();
    requestAnimationFrame(animate);
}

animate();
