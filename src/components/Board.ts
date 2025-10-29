import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import type { BoardSquare, Prize } from '../types/gameTypes';

export default class Board extends PIXI.Container {
    private layout: BoardSquare[];
    private squares: PIXI.Graphics[] = [];
    private SQUARE_SIZE = 80;
    private squaresContainer: PIXI.Container; 

    SQUARE_PADDING = 10;

    constructor(layout: BoardSquare[]) {
        super();
        this.layout = layout;
        this.squaresContainer = new PIXI.Container();
        this.addChild(this.squaresContainer);
        this.renderSquares();
    }

    getLayout(): BoardSquare[] {
        return this.layout;
    }

    getSquares(): PIXI.Graphics[] {
        return this.squares;
    }

    renderSquares(): void {
        this.squaresContainer.removeChildren();
        this.layout.forEach((square) => {
            const container = new PIXI.Container();
            const shadow = new PIXI.Graphics();
            shadow.roundRect(3, 5, this.SQUARE_SIZE+4, this.SQUARE_SIZE, 12);
            shadow.fill({ color: 0x000000, alpha: 0.4 });
            container.addChild(shadow);

            const outerBorder = new PIXI.Graphics();
            outerBorder.roundRect(0, 0, this.SQUARE_SIZE, this.SQUARE_SIZE, 12);
            outerBorder.fill(0x1a5c1a); 
            container.addChild(outerBorder);

            const innerSquare = new PIXI.Graphics();
            const borderWidth = 4;
            innerSquare.roundRect(
                borderWidth, 
                borderWidth, 
                this.SQUARE_SIZE - borderWidth * 2, 
                this.SQUARE_SIZE - borderWidth * 2, 
                8
            );
            
            let bgColor = 0x2d7a2d; 
             if (square.isStart) {
                bgColor = 0x1a5c1a; 
            }
            
            innerSquare.fill(bgColor);
            container.addChild(innerSquare);

            
            const highlight = new PIXI.Graphics();
            highlight.roundRect(
                borderWidth + 2, 
                borderWidth + 2, 
                this.SQUARE_SIZE - borderWidth * 2 - 4, 
                (this.SQUARE_SIZE - borderWidth * 2) * 0.2, 
                6
            );
            highlight.fill({ color: 0xffffff, alpha: 0.2 });
            container.addChild(highlight);

            const innerGlow = new PIXI.Graphics();
            innerGlow.roundRect(
                borderWidth, 
                borderWidth, 
                this.SQUARE_SIZE - borderWidth * 2, 
                this.SQUARE_SIZE - borderWidth * 2, 
                8
            );
            innerGlow.stroke({ width: 2, color: "white", alpha: 0.6 }); 
            container.addChild(innerGlow);

            let txt = square.isStart 
                ? "START" 
                : "$" + square.prize?.prizeValue.toString();
            
            let text = new Text({
                text: txt,
                style: {
                    fill: 0xffd700, 
                    fontSize: square.isStart || square.isBonus ? 18 : 18,
                    fontFamily: "Arial",
                    fontWeight: 'bold',
                    align: "center",
                    stroke: { color: 0x000000, width: 2 }, 
                },
            });
            text.x = this.SQUARE_SIZE / 2;
            text.y = this.SQUARE_SIZE / 2;
            text.anchor.set(0.5);
            container.addChild(text);

            
            container.x = square.position.x;
            container.y = square.position.y;
            
            this.squares.push(container as any); 
            this.squaresContainer.addChild(container); 
        });
    }
    getSquarePosition(index:number):{x:number,y:number}{
    let square= this.layout[index];
    return {x: square.position.x+this.SQUARE_SIZE/2,y:square.position.y+this.SQUARE_SIZE/2-3}
    }
    switchToDefaultPrizes(prizes:Prize[]):void{
        let prizeIndex = 0;
    this.layout.forEach((square) => {
        if (square.isStart) {
            square.prize = null;
        } else {
            square.prize = prizes[prizeIndex];
            prizeIndex++; 
        }
    });
    this.renderSquares();
    }
    switchToBonusPrizes(prizes: Prize[]): void{
        this.squaresContainer.removeChildren();
        this.layout.forEach((square,i) => {
           square.prize=prizes[i];
    });
    this.layout.forEach((square) => {
    // --- Style Configuration ---
    const BORDER_THICKNESS = 8; // Thickness of the lighter border (7-9px range)
    const CORNER_RADIUS = 15;   // How rounded the corners are

    // --- Colors ---
    const LIGHT_PURPLE = "#9e2ec3ff"; 
    const DARK_PURPLE = "#7f0aa6ff";   
    const START_SQUARE_COLOR = 0x4a1a5c; 

   
    const container = new PIXI.Container();

    const shadow = new PIXI.Graphics();
    shadow.roundRect(4, 4, this.SQUARE_SIZE, this.SQUARE_SIZE, CORNER_RADIUS);
    shadow.fill({ color: "black", alpha: 0.51 });
    container.addChild(shadow);

    const borderBox = new PIXI.Graphics();
    borderBox.roundRect(0, 0, this.SQUARE_SIZE, this.SQUARE_SIZE, CORNER_RADIUS);
    borderBox.fill(LIGHT_PURPLE).stroke({ width: 1, color: "white", alpha: 0.6 });
    container.addChild(borderBox);

    const backgroundBox = new PIXI.Graphics();
    const innerCornerRadius = Math.max(0, CORNER_RADIUS - BORDER_THICKNESS+3);
    backgroundBox.roundRect(
        BORDER_THICKNESS,
        BORDER_THICKNESS,
        this.SQUARE_SIZE - BORDER_THICKNESS * 2,
        this.SQUARE_SIZE - BORDER_THICKNESS * 2,
        innerCornerRadius
    ).stroke({ width: 1, color: "white", alpha: 0.6 });
    const shader = new PIXI.Graphics();
    shader.roundRect(4, 4.5,this.SQUARE_SIZE - BORDER_THICKNESS * 2+7, this.SQUARE_SIZE - BORDER_THICKNESS * 2+7, CORNER_RADIUS);
    shader.fill({ color: "black", alpha: 0.51 });
    container.addChild(shader);

    // Use the specific color for the start square, otherwise use the default dark purple
    const bgColor = square.isStart ? START_SQUARE_COLOR : DARK_PURPLE;
    backgroundBox.fill(bgColor);
    container.addChild(backgroundBox);

    let txt = square.isStart 
        ? "START" 
        : "+" + square.prize?.prizeValue.toString();
    
    let text = new Text({
        text: txt,
        style: {
            fill: 0xffd700, 
            fontSize: square.isStart || square.isBonus ? 14 : 18,
            fontFamily: "Arial",
            fontWeight: 'bold',
            align: "center",
            stroke: { color: 0x000000, width: 3 }, 
        },
    });
    text.x = this.SQUARE_SIZE / 2;
    text.y = this.SQUARE_SIZE / 2;
    text.anchor.set(0.5);
    container.addChild(text);

    
    container.x = square.position.x;
    container.y = square.position.y;
    
    this.squares.push(container as any); 
    this.squaresContainer.addChild(container);
});
}
}