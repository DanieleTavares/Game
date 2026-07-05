class Basket {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 80;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 60;
        this.speed = 8;
    }
    
    moveLeft() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
    }
    
    moveRight() {
        this.x += this.speed;
        if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }
    }
    
    setPosition(mouseX) {
        let newX = mouseX - this.width / 2;
        if (newX < 0) {
            newX = 0;
        }
        if (newX + this.width > this.canvas.width) {
            newX = this.canvas.width - this.width;
        }
        this.x = newX;
    }
    
    draw() {
        // Desenhar cesta
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Detalhes da cesta
        this.ctx.fillStyle = '#A0522D';
        this.ctx.fillRect(this.x + 5, this.y - 5, this.width - 10, 10);
        
        // Padrão de cesta
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + i * 20, this.y);
            this.ctx.lineTo(this.x + i * 20 + 10, this.y + this.height);
            this.ctx.stroke();
        }
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    reset() {
        this.x = this.canvas.width / 2 - this.width / 2;
    }
}
