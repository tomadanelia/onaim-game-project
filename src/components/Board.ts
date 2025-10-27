import * as PIXI from 'pixi.js';
import type { BoardSquare } from '../types/gameTypes';
export default class Board extends PIXI.Container {
    private layout: BoardSquare[];
    private squares: PIXI.Graphics[] = [];
    constructor(layout:BoardSquare[]) {
        super();
        this.layout = layout;
    }
    getLayout():BoardSquare[] {
        return this.layout;
    }
    getSquares():PIXI.Graphics[] {
        return this.squares;
    }
}   