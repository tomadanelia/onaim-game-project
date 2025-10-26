import './style.css';
import { GameApp } from './components/GameApp';

const gameApp = new GameApp();

async function startGame() {
    try {
        await gameApp.init();
        console.log('Game started successfully');
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}

startGame();