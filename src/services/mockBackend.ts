import type { inititalDataResponse } from "../types/apiTypes";

class MockBackendService{


    getinitialData():inititalDataResponse{

    const response:inititalDataResponse={
     defaultPrizes: [
        {position: 0, prizeValue: 0, prizeName: "startSquare"},
        {position: 1, prizeValue: 100, prizeName: "goldHeart"},
        {position: 2, prizeValue: 5, prizeName: "bronzeCoin"},
        {position: 3, prizeValue: 10, prizeName: "silverCoin"},
        {position: 6, prizeValue: 50, prizeName: "chest"},
        {position: 7, prizeValue: 1, prizeName: "coin"},
        {position: 8, prizeValue: 20, prizeName: "bronzeHeart"},
        {position: 9, prizeValue: 15, prizeName: "coins"},
        {position: 10, prizeValue: 5, prizeName: "bag"},
        {position: 11, prizeValue: 30, prizeName: "bronzeStar"},
        {position: 12, prizeValue: 80, prizeName: "silverStar"},
        {position: 13, prizeValue: 50, prizeName: "goldStar"},
        {position: 14, prizeValue: 100, prizeName: "chest2"},
        {position: 15, prizeValue: 60, prizeName: "silverHeart"},
    ],
    bonusPrizes: [
        {position: 0, prizeValue: 100, prizeName: "Gold Trophy"},
        {position: 1, prizeValue: 100, prizeName: "Gold Trophy"},
        {position: 2, prizeValue: 50, prizeName: "Silver Medal"},
        {position: 3, prizeValue: 25, prizeName: "Bronze Medal"},
        {position: 6, prizeValue: 10, prizeName: "Gift Card"},
        {position: 7, prizeValue: 5, prizeName: "Coffee Mug"},
        {position: 8, prizeValue: 1, prizeName: "Sticker Pack"},
        {position: 9, prizeValue: 1, prizeName: "Sticker Pack"},
        {position: 10, prizeValue: 5, prizeName: "Coffee Mug"},
        {position: 11, prizeValue: 10, prizeName: "Gift Card"},
        {position: 12, prizeValue: 25, prizeName: "Bronze Medal"},
        {position: 13, prizeValue: 50, prizeName: "Silver Medal"},
        {position: 14, prizeValue: 100, prizeName: "Gold Trophy"},
        {position: 15, prizeValue: 100, prizeName: "Gold Trophy"},

    ],
    freeSpins: 3,
    betOptions: [
        {cost: 10, multiplier: 1},
        {cost: 20, multiplier: 2},
        {cost: 50, multiplier: 5}
    ],
    balance: 1000,
    }
    return response;
    }
}