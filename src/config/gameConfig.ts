import type { BetOption, GameConfig, Prize } from "../types/gameTypes";

class GameConfigManager {
    private config: GameConfig| null = null;
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
}
export const gameConfig= new GameConfigManager();