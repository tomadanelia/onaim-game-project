import type { inititalDataResponse, MakeSpinResponse } from "../types/apiTypes";
import MockBackendService from "./mockBackend";
import RealBackendService from "./realBackend";

class ApiService {
    private isMockMode: boolean;
    private backendService: MockBackendService | RealBackendService;
    constructor() {
    // Force mock mode to true for hosting purposes
    this.isMockMode = true;
    this.backendService = new MockBackendService();
    }
    async getinitialData():Promise<inititalDataResponse> {
        if (this.isMockMode) {
            return (this.backendService as MockBackendService).getinitialData();
        }
        else{
            throw new Error("Real backend not implemented yet");
        }
    }
    async makeSpin():Promise<MakeSpinResponse>{
        if (this.isMockMode) {
            return (this.backendService as MockBackendService).makeSpin();
        }
        else{
            throw new Error("Real backend not implemented yet");
        }
    }
}
export const apiService = new ApiService()