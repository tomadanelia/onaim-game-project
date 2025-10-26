import * as PIXI from 'pixi.js';

export class GameApp {
    private app!: PIXI.Application;

    constructor() {
    }

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

        console.log('Pixi Application initialized');
    }

    getApp(): PIXI.Application {
        return this.app;
    }

    getStage(): PIXI.Container {
        return this.app.stage;
    }
}