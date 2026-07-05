// Inicialização do jogo
let game = null;
let leftPressed = false;
let rightPressed = false;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    game = new Game(canvas);
    
    // Botões
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const startGameBtn = document.getElementById('startGameBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    
    // Controle de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            leftPressed = true;
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            rightPressed = true;
        } else if (e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            if (game.gameState === 'playing' || game.gameState === 'paused') {
                game.pause();
                if (game.gameState === 'paused') {
                    document.getElementById('pauseOverlay').classList.remove('hidden');
                    pauseBtn.textContent = '▶ Continuar';
                } else {
                    document.getElementById('pauseOverlay').classList.add('hidden');
                    pauseBtn.textContent = '⏸ Pausar';
                }
            }
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            leftPressed = false;
        } else if (e.key === 'ArrowRight') {
            rightPressed = false;
        }
    });
    
    // Movimento contínuo
    setInterval(() => {
        if (leftPressed) game.moveBasketLeft();
        if (rightPressed) game.moveBasketRight();
    }, 16);
    
    // Controle do mouse
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        game.setBasketPosition(mouseX);
    });
    
    // Eventos dos botões
    startBtn.addEventListener('click', () => {
        document.getElementById('startOverlay').classList.add('hidden');
        game.start();
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    });
    
    pauseBtn.addEventListener('click', () => {
        game.pause();
        if (game.gameState === 'paused') {
            document.getElementById('pauseOverlay').classList.remove('hidden');
            pauseBtn.textContent = '▶ Continuar';
        } else {
            document.getElementById('pauseOverlay').classList.add('hidden');
            pauseBtn.textContent = '⏸ Pausar';
        }
    });
    
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
    
    startGameBtn.addEventListener('click', () => {
        document.getElementById('startOverlay').classList.add('hidden');
        game.start();
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    });
    
    resumeBtn.addEventListener('click', () => {
        game.pause();
        document.getElementById('pauseOverlay').classList.add('hidden');
        pauseBtn.textContent = '⏸ Pausar';
    });
    
    playAgainBtn.addEventListener('click', () => {
        location.reload();
    });
});
