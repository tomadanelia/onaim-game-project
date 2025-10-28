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

}
export const gameState= new GameStateManager();