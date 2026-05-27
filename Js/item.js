class Item {
    constructor(canvas, type = null) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        
        // Tipos de itens: fruit (bom) ou bomb (ruim)
        const types = ['fruit', 'fruit', 'fruit', 'bomb']; // 75% fruta, 25% bomba
        this.type = type || types[Math.floor(Math.random() * types.length)];
        
        this.speed = 3;
        
        // Escolher fruta aleatória
        this.fruitType = ['🍎', '🍊', '🍓', '🍒'][Math.floor(Math.random() * 4)];
    }
    
    update(speedMultiplier) {
        this.y += this.speed + speedMultiplier;
        return this.y < this.canvas.height;
    }
    
    draw() {
        if (this.type === 'fruit') {
            // Desenhar fruta
            this.ctx.font = `${this.width}px Arial`;
            this.ctx.fillStyle = this.getFruitColor();
            this.ctx.fillText(this.fruitType, this.x, this.y + this.height);
            
            // Brilho
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(255,255,0,0.5)';
            this.ctx.fillText(this.fruitType, this.x, this.y + this.height);
            this.ctx.shadowBlur = 0;
        } else {
            // Desenhar bomba
            this.ctx.fillStyle = '#333';
            this.ctx.beginPath();
            this.ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Pavio
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(this.x + this.width/2 - 2, this.y - 5, 4, 10);
            
            // Chama
            this.ctx.fillStyle = '#FF4500';
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + this.width/2, this.y - 10);
            this.ctx.lineTo(this.x + this.width/2 - 5, this.y - 3);
            this.ctx.lineTo(this.x + this.width/2 + 5, this.y - 3);
            this.ctx.fill();
            
            // Caveira
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.x + 8, this.y + 10, 6, 6);
            this.ctx.fillRect(this.x + 16, this.y + 10, 6, 6);
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(this.x + 10, this.y + 18, 10, 4);
        }
    }
    
    getFruitColor() {
        const colors = {
            '🍎': '#FF0000',
            '🍊': '#FFA500',
            '🍓': '#FF1493',
            '🍒': '#DC143C'
        };
        return colors[this.fruitType] || '#FFD700';
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    isFruit() {
        return this.type === 'fruit';
    }
}
