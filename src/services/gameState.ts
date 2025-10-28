import type { GameState } from "../types/gameTypes";
class GameStateManager{
    private state:GameState;


    constructor(){
    this.state={
        currentPosition: 0,
        balance: 0,
        isBonus: false,
        freeSpinsRemaining: 0,
        selectedBetIndex: 0
    }
    
    }
    getCurrentPosition():number{
        return this.state.currentPosition;
    }
        getBalance():number{
        return this.state.balance;
    }
        getFreeSpinsRemaining():number{
        return this.state.freeSpinsRemaining;
    }
        isBonusMode():boolean{
        return this.state.isBonus;
    }
    getSelectedBetIndex():number{
        return this.state.selectedBetIndex;
    }
    setBalance(newBalance:number):void{
        this.state.balance=newBalance;
    }
    movePlayer(steps:number):void{
        this.state.currentPosition=(this.state.currentPosition+steps)%16;
    }
    enterBonusMode(freeSpins:number):void{
        this.state.isBonus=true;
        this.state.freeSpinsRemaining=freeSpins;
    }
    exitBonusMode():void{
        this.state.isBonus=false;
    }
    decrementFreeSpin():void{
        if(this.state.freeSpinsRemaining>0){
            this.state.freeSpinsRemaining--;
        }
    }
    setSelectedBetIndex(index:number):void{
        this.state.selectedBetIndex=index;
    }

}
export const gameState= new GameStateManager();