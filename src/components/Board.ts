import * as PIXI from 'pixi.js';
import {Text} from 'pixi.js'
import type { BoardSquare } from '../types/gameTypes';
export default class Board extends PIXI.Container {
    private layout: BoardSquare[];

    private squares: PIXI.Graphics[] = [];

    private SQUARE_SIZE=80;

   SQUARE_PADDING=10;


    constructor(layout:BoardSquare[]) {
        super();
        this.layout = layout;
        this.renderSquares();
    }
    

    getLayout():BoardSquare[] {
        return this.layout;
    }


    getSquares():PIXI.Graphics[] {
        return this.squares;
    }


    renderSquares() :void{
    this.layout.forEach((square)=>{
        const squareObject=new PIXI.Graphics();
        let rect=squareObject.rect(0,0,this.SQUARE_SIZE,this.SQUARE_SIZE);
        square.isBonus? rect.fill(0x4CAF50):rect.fill(0x2196F3);
        
        rect.stroke({width:2,color:0xffffff});
        let txt= square.isBonus? "Bonus": square.prize?.prizeValue.toString()+"$"
        let text= new Text({
        text: txt,
        style: {
            fill: 0xffff00,
            fontSize: 12,
            fontFamily: "Arial",
            align: "center",
        },
    });
        text.x = this.SQUARE_SIZE / 2;
        text.y = this.SQUARE_SIZE / 2;
        text.anchor.set(0.5);
        squareObject.addChild(text);
        squareObject.x=square.position.x;
        squareObject.y=square.position.y;
        this.squares.push(squareObject);
        this.addChild(squareObject);
        
    })
    }
}   