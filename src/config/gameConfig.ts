import type { BetOption, BoardSquare, GameConfig, Prize } from "../types/gameTypes";

class GameConfigManager {
    private config: GameConfig| null = null;
    private readonly SQUARE_SIZE = 80;
    private readonly BOARD_SIZE = 5;
    private readonly BONUS_SQUARE_INDEX = 4; 
    setConfig(config: GameConfig) {
        this.config = config;
    }
    getDefaultPrizes():Prize[]{
        return this.config ? this.config.defaultPrizes : [];
    }
    getBonusPrizes():Prize[]{
        return this.config ? this.config.bonusPrizes : [];
    }
    getBetOptions():BetOption[]{
        return this.config? this.config.betOptions : [];
    }
    getFreeSpinsCount():number{
        return this.config? this.config.freeSpins : -1;
    }
    getInitialBalance():number{
        return this.config? this.config.balance : -1;
    }
    /**
     * Generates board layout with prizes assigned to positions
     * @param prizes - Array of 14 prizes to place on board (excludes START and BONUS squares)
     * @returns Array of 16 BoardSquare objects
     */
    generateBoardLayout(prizes: Prize[]): BoardSquare[] {
        const squares: BoardSquare[] = [];
        const positions = this.calculateSquarePositions();
        
        let prizeIndex = 0; 
        for (let i = 0; i < 16; i++) {
            if (i === 0) {
                squares.push({
                    id: i,
                    position: positions[i],
                    prize: null,
                    isBonus: false,
                    isStart:true
                });
            }
            else if (i === this.BONUS_SQUARE_INDEX) {
                squares.push({
                    id: i,
                    position: positions[i],
                    prize: null,
                    isBonus: true,
                    isStart: false
                });
            }
            else {
                squares.push({
                    id: i,
                    position: positions[i],
                    prize: prizes[prizeIndex],
                    isBonus: false,
                    isStart: false
                });
                prizeIndex++;
            }
        }
        
        return squares;
    }
    
    /**
     * Calculates x,y positions for 16 outer squares in 5x5 grid
     * Order: Top row (5) → Right column (4) → Bottom row (5) → Left column (4)
     */
    private calculateSquarePositions(): Array<{x: number, y: number}> {
        const positions: Array<{x: number, y: number}> = [];
        const size = this.SQUARE_SIZE;
        const gridSize = this.BOARD_SIZE;
        
        for (let i = 0; i < gridSize; i++) {
            positions.push({ x: i * size, y: 0 });
        }
        
        for (let i = 1; i < gridSize - 1; i++) {
            positions.push({ x: (gridSize - 1) * size, y: i * size });
        }
        
        for (let i = gridSize - 1; i >= 0; i--) {
            positions.push({ x: i * size, y: (gridSize - 1) * size });
        }
        
        for (let i = gridSize - 2; i > 0; i--) {
            positions.push({ x: 0, y: i * size });
        }
        
        return positions;
    }

}
export const gameConfig= new GameConfigManager();