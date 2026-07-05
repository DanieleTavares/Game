class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameState = 'start'; // start, playing, paused, gameover
        this.basket = new Basket(canvas);
        this.scoreSystem = new ScoreSystem();
        this.items = [];
        this.spawnCounter = 0;
        this.animationId = null;
        this.spawnRate = 40;
    }
    
    start() {
        if (this.gameState === 'playing') return;
        
        this.gameState = 'playing';
        this.gameLoop();
    }
    
    pause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.gameLoop();
        }
    }
    
    reset() {
        this.items = [];
        this.spawnCounter = 0;
        this.scoreSystem.reset();
        this.basket.reset();
        this.updateUI();
    }
    
    gameLoop() {
        if (this.gameState !== 'playing') return;
        
        this.update();
        this.draw();
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        // Spawn de itens
        this.spawnCounter++;
        if (this.spawnCounter >= this.spawnRate) {
            this.spawnCounter = 0;
            this.items.push(new Item(this.canvas));
            
            // Reduzir spawn rate gradualmente (mais difícil)
            if (this.spawnRate > 25) {
                this.spawnRate = Math.max(25, 40 - Math.floor(this.scoreSystem.speedMultiplier));
            }
        }
        
        // Atualizar itens e verificar colisões
        this.items = this.items.filter(item => {
            const active = item.update(this.scoreSystem.speedMultiplier);
            
            if (!active) return false;
            
            // Verificar colisão com a cesta
            if (this.checkCollision(this.basket.getBounds(), item.getBounds())) {
                if (item.isFruit()) {
                    // Pegou fruta
                    this.scoreSystem.addPoints(10);
                    this.updateUI();
                } else {
                    // Pegou bomba
                    const alive = this.scoreSystem.loseLife();
                    this.updateUI();
                    
                    if (!alive) {
                        this.gameOver();
                        return false;
                    }
                }
                return false;
            }
            
            return true;
        });
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    draw() {
        // Limpar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar grama no chão
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
        
        // Desenhar itens
        this.items.forEach(item => item.draw());
        
        // Desenhar cesta
        this.basket.draw();
        
        // Mostrar velocidade atual
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(`Velocidade: ${Math.floor(this.scoreSystem.speedMultiplier)}`, 10, 30);
        
        // Mostrar próximo aumento
        const pointsToNext = this.scoreSystem.nextSpeedIncrease - this.scoreSystem.score;
        if (pointsToNext > 0) {
            this.ctx.fillStyle = '#666';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`Próximo nível: +${pointsToNext} pts`, 10, 50);
        }
    }
    
    gameOver() {
        this.gameState = 'gameover';
        const isNewRecord = this.scoreSystem.saveHighScore();
        
        // Mostrar tela de game over
        const gameoverOverlay = document.getElementById('gameoverOverlay');
        const finalScore = document.getElementById('finalScore');
        const newRecordMsg = document.getElementById('newRecordMsg');
        
        finalScore.textContent = this.scoreSystem.score;
        
        if (isNewRecord) {
            newRecordMsg.classList.remove('hidden');
        } else {
            newRecordMsg.classList.add('hidden');
        }
        
        gameoverOverlay.classList.remove('hidden');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.scoreSystem.score;
        document.getElementById('lives').textContent = this.scoreSystem.lives;
        document.getElementById('highscore').textContent = this.scoreSystem.highscore;
    }
    
    moveBasketLeft() {
        if (this.gameState === 'playing') {
            this.basket.moveLeft();
        }
    }
    
    moveBasketRight() {
        if (this.gameState === 'playing') {
            this.basket.moveRight();
        }
    }
    
    setBasketPosition(mouseX) {
        if (this.gameState === 'playing') {
            this.basket.setPosition(mouseX);
        }
    }
}
