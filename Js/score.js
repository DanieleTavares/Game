class ScoreSystem {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.highscore = this.loadHighScore();
        this.speedMultiplier = 0;
        this.nextSpeedIncrease = 100;
    }
    
    loadHighScore() {
        const saved = localStorage.getItem('catchFruitHighScore');
        return saved ? parseInt(saved) : 0;
    }
    
    saveHighScore() {
        if (this.score > this.highscore) {
            this.highscore = this.score;
            localStorage.setItem('catchFruitHighScore', this.highscore);
            return true;
        }
        return false;
    }
    
    addPoints(points) {
        this.score += points;
        
        // Aumentar velocidade a cada 100 pontos
        if (this.score >= this.nextSpeedIncrease) {
            this.speedMultiplier = Math.min(this.speedMultiplier + 0.5, 5);
            this.nextSpeedIncrease += 100;
        }
        
        return this.score;
    }
    
    loseLife() {
        this.lives--;
        return this.lives > 0;
    }
    
    reset() {
        this.score = 0;
        this.lives = 3;
        this.speedMultiplier = 0;
        this.nextSpeedIncrease = 100;
    }
}
