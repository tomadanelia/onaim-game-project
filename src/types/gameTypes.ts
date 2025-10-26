export interface BetOption{
    cost: number,
    multiplier: number,
}
export interface Prize{
position: number,
prizeValue: number,
prizeName: string,
imageUrl?: string,
}
export interface GameConfig{
    defaultPrizes: Prize[],
    bonusPrizes: Prize[],
    freeSpins: number;
    betOptions: BetOption[];
    balance: number;
}
export interface BoardSquare{
    id: number,
    position: {x:number,y:number},
    prize: Prize|null,
    isBonus: boolean,
    isStart?: boolean,
}
export interface GameState{
    currentPosition:number,
    balance:number,
    isBonus: boolean,
    freeSpinsRemaining: number,
    selectedBetIndex:number,
 
}