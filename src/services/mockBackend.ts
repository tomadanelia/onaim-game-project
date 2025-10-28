import type { inititalDataResponse, MakeSpinRequest, MakeSpinResponse } from "../types/apiTypes";
import type { BetOption, Prize } from "../types/gameTypes";

export default class MockBackendService{

     private balance:number=100;
     private defaultFreeSpins:number=3;
     private betOptions:BetOption[] = [
       { cost: 10, multiplier: 1},
       { cost: 20, multiplier: 2},
       { cost: 50, multiplier: 5}
     ];
     private defaultPrizes:Prize[]= [
        {position: 0, prizeValue: 40, prizeName: "chest"},
        {position: 1, prizeValue: 80, prizeName: "goldHeart"},
        {position: 2, prizeValue: 5, prizeName: "bronzeCoin"},
        {position: 3, prizeValue: 10, prizeName: "silverCoin"},
        {position: 4, prizeValue: 20, prizeName: "bronzeHeart2"},
        {position: 5, prizeValue: 25, prizeName: "bag"},
        {position: 6, prizeValue: 50, prizeName: "chest2"},
        {position: 7, prizeValue: 1, prizeName: "coin"},
        {position: 8, prizeValue: 20, prizeName: "bronzeHeart"},
        {position: 9, prizeValue: 15, prizeName: "coins"},
        {position: 10, prizeValue: 5, prizeName: "bag"},
        {position: 11, prizeValue: 30, prizeName: "bronzeStar"},
        {position: 12, prizeValue: 80, prizeName: "silverStar"},
        {position: 13, prizeValue: 50, prizeName: "goldStar"},
        {position: 14, prizeValue: 70, prizeName: "silverHeart"},
    ];
    private bonusPrizes:Prize[]= [
        {position: 0, prizeValue: 1000, prizeName: "Gold Trophy"},
        {position: 1, prizeValue: 1000, prizeName: "Gold Trophy"},
        {position: 2, prizeValue: 500, prizeName: "Silver Medal"},
        {position: 3, prizeValue: 250, prizeName: "Bronze Medal"},
        {position: 4, prizeValue: 200, prizeName: "bronzeHeart2"},
        {position: 5, prizeValue: 25, prizeName: "bag"},
        {position: 6, prizeValue: 100, prizeName: "Gift Card"},
        {position: 7, prizeValue: 500, prizeName: "Coffee Mug"},
        {position: 8, prizeValue: 100, prizeName: "Sticker Pack"},
        {position: 9, prizeValue: 100, prizeName: "Sticker Pack"},
        {position: 10, prizeValue: 500, prizeName: "Coffee Mug"},
        {position: 11, prizeValue: 100, prizeName: "Gift Card"},
        {position: 12, prizeValue: 250, prizeName: "Bronze Medal"},
        {position: 13, prizeValue: 500, prizeName: "Silver Medal"},
        {position: 14, prizeValue: 100, prizeName: "Gold Trophy"},
        {position: 15, prizeValue: 100, prizeName: "Gold Trophy"},

    ];
    getinitialData():inititalDataResponse{

    const response:inititalDataResponse={
     defaultPrizes: this.defaultPrizes,
    bonusPrizes: this.bonusPrizes,
    freeSpins: this.defaultFreeSpins,
    betOptions: this.betOptions,
    balance: this.balance,
    }
    return response;
    }
    makeSpin(req: MakeSpinRequest): MakeSpinResponse {
        const {betAmount, isFreeSpin} = req;
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const rollResult = die1 + die2;

        if (!isFreeSpin) {
            this.balance -= betAmount;
        }

       

        return {
            rollResult,
            newBalance: this.balance,
        };
    }

}