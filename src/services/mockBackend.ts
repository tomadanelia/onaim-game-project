import type { inititalDataResponse, MakeSpinResponse } from "../types/apiTypes";
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
        {position: 7, prizeValue: 30, prizeName: "coin"},
        {position: 8, prizeValue: 20, prizeName: "bronzeHeart2"},
        {position: 9, prizeValue: 15, prizeName: "silverStar"},
        {position: 10, prizeValue: 5, prizeName: "bag"},
        {position: 11, prizeValue: 30, prizeName: "bronzeStar"},
        {position: 12, prizeValue: 50, prizeName: "coins"},
        {position: 13, prizeValue: 50, prizeName: "goldStar"},
        {position: 14, prizeValue: 70, prizeName: "silverHeart"},
        {position: 15, prizeValue: 30, prizeName: "coins"},
    ];
     private bonusPrizes:Prize[]= [
        {position: 0, prizeValue: 1000, prizeName: "goldStar"},
        {position: 1, prizeValue: 1000, prizeName: "coins"},
        {position: 2, prizeValue: 500, prizeName: "silverStar"},
        {position: 3, prizeValue: 250, prizeName: "chest"},
        {position: 4, prizeValue: 200, prizeName: "bronzeHeart2"},
        {position: 5, prizeValue: 25, prizeName: "bag"},
        {position: 6, prizeValue: 100, prizeName: "chest2"},
        {position: 7, prizeValue: 500, prizeName: "bronzeStar"},
        {position: 8, prizeValue: 100, prizeName: "coins"},
        {position: 9, prizeValue: 100, prizeName: "silverStar"},
        {position: 10, prizeValue: 500, prizeName: "chest"},
        {position: 11, prizeValue: 100, prizeName: "goldCoin"},
        {position: 12, prizeValue: 250, prizeName: "bronzeStar"},
        {position: 13, prizeValue: 500, prizeName: "silverStar"},
        {position: 14, prizeValue: 1000, prizeName: "goldStar"},
        {position: 15, prizeValue: 1000, prizeName: "coins"},
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
    makeSpin(): MakeSpinResponse {
        const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const rollResult = die1 + die2;

    return {
        rollResult,
        newBalance: this.balance,
        die1,
        die2,
    };
    }

}