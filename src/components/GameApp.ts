import * as PIXI from 'pixi.js';
import {Text} from 'pixi.js'
import { apiService } from '../services/apiService';
import { gameConfig } from '../config/gameConfig';
import Board from './Board';
import { BackgroundBoard } from '../background';
export class GameApp {
    private app!: PIXI.Application;
    private board!:Board;

    

    async init(): Promise<void> {
        this.app = new PIXI.Application();
        
        await this.app.init({
            width: 800,
            height: 600,
            backgroundColor: 0x1a1a2e, 
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        
        document.body.appendChild(this.app.canvas);
        const back = new BackgroundBoard(this.app);
        back.toggleBonusRound(false);
        console.log('Pixi Application initialized');
    }

    getApp(): PIXI.Application {
        return this.app;
    }

    getStage(): PIXI.Container {
        return this.app.stage;
    }
async loadAssets(): Promise<void> {
    const loadingText = new Text({
        text: "Loading... 0%",
        style: {
            fill: 0xffffff,
            fontSize: 32,
            fontFamily: "Arial",
            align: "center",
        },
    });

    loadingText.x = this.app.screen.width / 2;
    loadingText.y = this.app.screen.height / 2;
    loadingText.anchor.set(0.5);

    this.app.stage.addChild(loadingText);
    const assets = [
  { alias: 'bag', src: '/assets/images/defaults/bag.png' },
  { alias: 'bronzeCoin', src: '/assets/images/defaults/bronzeCoin.png' },
  { alias: 'bronzeHeart2', src: '/assets/images/defaults/bronzeHeart2.png' },
  { alias: 'bronzeStar', src: '/assets/images/defaults/bronzeStar.png' },
  { alias: 'chest', src: '/assets/images/defaults/chest.png' },
  { alias: 'chest2', src: '/assets/images/defaults/chest2.png' },
  { alias: 'coin', src: '/assets/images/defaults/coin.png' },
  { alias: 'coins', src: '/assets/images/defaults/coins.png' },
  { alias: 'goldCoin', src: '/assets/images/defaults/goldCoin.png' },
  { alias: 'goldHeart', src: '/assets/images/defaults/goldHeart.png' },
  { alias: 'goldHeart1', src: '/assets/images/defaults/goldHeart1.png' },
  { alias: 'goldStar', src: '/assets/images/defaults/goldStar.png' },
  { alias: 'silverCoin', src: '/assets/images/defaults/silverCoin.png' },
  { alias: 'silverHeart', src: '/assets/images/defaults/silverHeart.png' },
  { alias: 'silverStar', src: '/assets/images/defaults/silverStar.png' },
];


    try {
        PIXI.Assets.addBundle('gameAssets', assets);

        await PIXI.Assets.loadBundle('gameAssets', (progress) => {
            const percentage = Math.round(progress * 100);
            loadingText.text = `Loading... ${percentage}%`;
        });

        console.log('All assets loaded successfully');
    } catch (error) {
        console.error('Failed to load assets:', error);
        loadingText.text = 'Loading failed!';
        throw error;
    } finally {
        this.app.stage.removeChild(loadingText);
        loadingText.destroy();
    }
}
    async initGame(){
    const config = await apiService.getinitialData();
    gameConfig.setConfig(config);
    const layout= gameConfig.generateBoardLayout(config.defaultPrizes);
    this.board=new Board(layout);
    this.app.stage.addChild(this.board);
    this.board.x=(this.app.screen.width - this.board.width)/2;
    this.board.y=(this.app.screen.height - this.board.height)/2;
    }
}