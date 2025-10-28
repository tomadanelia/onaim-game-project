import * as PIXI from 'pixi.js';
export default class Player extends PIXI.Container {
 private currentSquareIndex: number=0;
    constructor() {
        super();
    const playerTexture = PIXI.Assets.get('player');

    const playerSprite = new PIXI.Sprite(playerTexture);
    this.addChild(playerSprite);
    
    playerSprite.width = 80;
    playerSprite.height = 80;
    playerSprite.anchor.set(0.5);
    playerSprite.x=0;
    playerSprite.y=0;

    }
    getCurrentSquareIndex(): number {
        return this.currentSquareIndex;
    }
    setPosition(x:number,y:number):void{
        this.x=x;
        this.y=y;
    }
    setCurrentSquareIndex(index: number): void {
        this.currentSquareIndex = index;
    }

}

