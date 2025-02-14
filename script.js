const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Tulip {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.bloomed = false;
    }

    grow() {
        if (this.height < 100) {
            this.height += 2;
        } else {
            this.bloomed = true;
        }
    }

    draw() {
        // Dibujar tallo
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.height);
        ctx.stroke();

        // Dibujar hojas
        if (this.height > 30) {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.ellipse(this.x - 10, this.y - this.height + 30, 15, 10, Math.PI / 4, 0, Math.PI * 2);
            ctx.ellipse(this.x + 10, this.y - this.height + 40, 15, 10, -Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Dibujar flor si ya creció
        if (this.bloomed) {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.height);
            ctx.lineTo(this.x - 15, this.y - this.height - 20);
            ctx.lineTo(this.x, this.y - this.height - 40);
            ctx.lineTo(this.x + 15, this.y - this.height - 20);
            ctx.closePath();
            ctx.fill();
        }
    }
}

let tulips = [];
for (let i = 0; i < 5; i++) {
    tulips.push(new Tulip(150 + i * 100, canvas.height - 50));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tulips.forEach(tulip => {
        tulip.grow();
        tulip.draw();
    });

    if (tulips.every(t => t.bloomed)) {
        document.getElementById('message').style.opacity = 1;
    } else {
        requestAnimationFrame(animate);
    }
}

animate();