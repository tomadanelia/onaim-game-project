import type { GameConfig, Prize } from "./gameTypes";

export interface inititalDataResponse extends GameConfig{

}
export interface MakeSpinRequest{
    betAmount: number,
    isFreeSpin: boolean,
}
export interface MakeSpinResponse{
    rollResult: number,
    newBalance: number,
    prizeWon: Prize|null,
}