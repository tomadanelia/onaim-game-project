import * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';
import type { BoardSquare, Prize } from '../types/gameTypes';

export default class Board extends PIXI.Container {
    private layout: BoardSquare[];
    private squares: PIXI.Graphics[] = [];
    private SQUARE_SIZE = 80;
    SQUARE_PADDING = 10;

    constructor(layout: BoardSquare[]) {
        super();
        this.layout = layout;
        this.renderSquares();
    }

    getLayout(): BoardSquare[] {
        return this.layout;
    }

    getSquares(): PIXI.Graphics[] {
        return this.squares;
    }

    renderSquares(): void {
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
            this.addChild(container);
        });
    }
    getSquarePosition(index:number):{x:number,y:number}{
    let square= this.layout[index];
    return {x: square.position.x+this.SQUARE_SIZE/2,y:square.position.y+this.SQUARE_SIZE/2-3}
    }
    switchToBonusPrizes(prizes: Prize[]): void{
        this.layout.forEach((square,i) => {
           square.prize=prizes[i];
    });
    this.layout.forEach((square) => {
            const container = new PIXI.Container();
            const shadow = new PIXI.Graphics();
            shadow.roundRect(3, 5, this.SQUARE_SIZE, this.SQUARE_SIZE, 12);
            shadow.fill({ color: 0x000000, alpha: 0.4 });
            container.addChild(shadow);

            const outerBorder = new PIXI.Graphics();
            outerBorder.roundRect(0, 0, this.SQUARE_SIZE, this.SQUARE_SIZE, 12);
            outerBorder.fill(0x4a1f6b); 
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
            
            let bgColor = 0x7b3fb2; 
             if (square.isStart) {
                bgColor = 0x5a2d82; 
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
            innerGlow.stroke({ width: 2, color: 0x9d5fd3, alpha: 0.6 }); 
            container.addChild(innerGlow);

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
            this.addChild(container);
        });

}
}