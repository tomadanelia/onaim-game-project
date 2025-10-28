import * as PIXI from 'pixi.js';
import {Text} from 'pixi.js'
import { apiService } from '../services/apiService';
import { gameConfig } from '../config/gameConfig';
import Board from './Board';
import { BackgroundBoard } from '../background';
import  Player from './Player';
import { gameState } from '../services/gameState';
import type { MakeSpinRequest } from '../types/apiTypes';
import type { Prize } from '../types/gameTypes';
export class GameApp {
    private app!: PIXI.Application;
    private board!:Board;
    private player!:Player;
     private balanceEl!: HTMLElement;
    private freeSpinsEl!: HTMLElement;
    private spinBtn!: HTMLButtonElement;
    private betValueEl!: HTMLElement;
    private decreaseBetBtn!: HTMLButtonElement;
    private increaseBetBtn!: HTMLButtonElement;
    private back!:BackgroundBoard;
    betSelector!: HTMLElement | null;
    async init(): Promise<void> {
        this.app = new PIXI.Application();
        
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1a1a2e, 
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        document.body.appendChild(this.app.canvas);
        this.back = new BackgroundBoard(this.app);
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
  { alias: 'player', src: '/assets/images/defaults/player.png' },
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
            gameState.setBalance(config.balance);

    const layout= gameConfig.generateBoardLayout(config.defaultPrizes);
    this.board=new Board(layout);
    this.app.stage.addChild(this.board);
    this.board.x=(this.app.screen.width - this.board.width)/2;
    this.board.y=(this.app.screen.height - this.board.height)/2;

    this.player = new Player();
    const startPos=this.board.getSquarePosition(0);
    this.player.setPosition(startPos.x, startPos.y);
    this.board.addChild(this.player);


        this.balanceEl = document.getElementById('balance')!;
        this.freeSpinsEl = document.getElementById('free-spins')!;
        this.spinBtn = document.getElementById('spin-button') as HTMLButtonElement;
        this.betValueEl = document.getElementById('betValue')!;
        this.decreaseBetBtn = document.getElementById('decreaseBtn') as HTMLButtonElement;
        this.increaseBetBtn = document.getElementById('increaseBtn') as HTMLButtonElement;
                this.setupBetSelectors();
        this.setupSpinButton();
        this.updateDisplay();
    }


    private setupBetSelectors(): void {
        this.decreaseBetBtn.addEventListener('click', () => this.handleDecreaseBet());
        this.increaseBetBtn.addEventListener('click', () => this.handleIncreaseBet());
    }
    private setupSpinButton(): void {
        this.spinBtn.addEventListener('click', () => this.handleSpin());
    }

    private handleIncreaseBet(): void {
        const betOptions = gameConfig.getBetOptions();
        if (betOptions.length === 0) return;

        let currentIndex = gameState.getSelectedBetIndex();
        const newIndex = (currentIndex + 1) % betOptions.length;
        
        gameState.setSelectedBetIndex(newIndex);
        this.updateDisplay();
    }

    private handleDecreaseBet(): void {
        const betOptions = gameConfig.getBetOptions();
        if (betOptions.length === 0) return;

        let currentIndex = gameState.getSelectedBetIndex();
        const newIndex = (currentIndex - 1 + betOptions.length) % betOptions.length;

        gameState.setSelectedBetIndex(newIndex);
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.balanceEl.textContent = gameState.getBalance().toString();

        const betOptions = gameConfig.getBetOptions();
        const selectedIndex = gameState.getSelectedBetIndex();
        const currentBetOption = betOptions[selectedIndex];

        if (currentBetOption) {
            this.betValueEl.textContent = currentBetOption.cost.toString();
        } else {
            this.betValueEl.textContent = '0';
        }


        const freeSpins = gameState.getFreeSpinsRemaining();
        this.freeSpinsEl.textContent = freeSpins.toString();

        const freeSpinsContainer = document.getElementById('free-spins-display')!;
        if (gameState.isBonusMode()) {
            freeSpinsContainer.style.display = 'block';
        } else {
            freeSpinsContainer.style.display = 'none';
        }
    }
        private disableSpinButton(): void {
        this.spinBtn.disabled = true;
    }   
    private enableSpinButton(): void {
        this.spinBtn.disabled = false;
    }
    private disableBettingButton(){
this.betSelector = document.querySelector(".bet-selector") as HTMLElement;

        if (gameState.isBonusMode()) {
            this.betSelector.style.display = 'none';
        } else {
            this.betSelector.style.display = 'block';
        }
    }
        async handleSpin(): Promise<void> {
        const balance = gameState.getBalance();
        const betOptions = gameConfig.getBetOptions()[gameState.getSelectedBetIndex()];
        if (balance < betOptions.cost) {
        alert('Insufficient balance for this bet.');
            return;
        }
        const isFreeSpins= gameState.isBonusMode() && gameState.getFreeSpinsRemaining()>0;
        if (isFreeSpins){
            this.disableSpinButton();
        }
        else{
            const req: MakeSpinRequest={
                betAmount: betOptions.cost,
                isFreeSpin: isFreeSpins
            };
            const result= await apiService.makeSpin(req);
            gameState.setBalance(result.newBalance);
            await this.movePlayer(result.rollResult);
            console.log('Spin result:', result.rollResult);
            this.enableSpinButton();
        }
       this.updateDisplay();

        
    }


    async movePlayer(steps:number):Promise<void>{
        gameState.movePlayer(steps);
        this.handlePrizeCollection();
        const newPos= gameState.getCurrentPosition();
        const targetPos= this.board.getSquarePosition(newPos);
        this.player.setPosition(targetPos.x, targetPos.y);
        this.player.setCurrentSquareIndex(newPos);
    }

    handlePrizeCollection():void{
    let pos= gameState.getCurrentPosition();
    let layout= this.board.getLayout();
    let square= layout[pos];
    let prize= square.prize;
    if(square.isBonus && !gameState.isBonusMode()){
        console.log('Entered BONUS round!');
        this.enterBonusMode();
    }
    let winAmount= prize ? prize.prizeValue : 0;
    const mul = gameConfig.getBetOptions()[gameState.getSelectedBetIndex()].multiplier;
    let bal=gameState.getBalance()+winAmount*mul;
    gameState.setBalance(bal);
    }
    enterBonusMode():void{
        const freeSpins= gameConfig.getFreeSpinsCount();
        gameState.enterBonusMode(freeSpins);
        const bonusPrizes:Prize[] = gameConfig.getBonusPrizes();
        this.board.switchToBonusPrizes(bonusPrizes);
        this.back.toggleBonusRound(true);
        this.disableBettingButton();
        
        
    }
}