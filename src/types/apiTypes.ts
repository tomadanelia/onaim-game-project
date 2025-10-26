import type { GameConfig } from "./gameTypes";

export interface inititalDataResponse extends GameConfig{

}
export interface MakeSpinRequest{
    betAmount: number,
    isFreeSpin: boolean,
    positionBeforeSpin: number,
}
export interface MakeSpinResponse{
    rollResult: number,
    newBalance: number,
}