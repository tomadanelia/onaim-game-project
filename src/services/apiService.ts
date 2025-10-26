import type { inititalDataResponse, MakeSpinRequest, MakeSpinResponse } from "../types/apiTypes";
import MockBackendService from "./mockBackend";
import RealBackendService from "./realBackend";

class ApiService {
    private isMockMode: boolean;
    private backendService: MockBackendService | RealBackendService;
    constructor() {
        window.location.search==="?mock=true"?this.isMockMode=true:this.isMockMode=false;
        if (this.isMockMode) {
            this.backendService = new MockBackendService();
        } else {
            this.backendService = new RealBackendService();
        }
    }
    async getinitialData():Promise<inititalDataResponse> {
        if (this.isMockMode) {
            return (this.backendService as MockBackendService).getinitialData();
        }
        else{
            throw new Error("Real backend not implemented yet");
        }
    }
    async makeSpin(req:MakeSpinRequest):Promise<MakeSpinResponse>{
        if (this.isMockMode) {
            return (this.backendService as MockBackendService).makeSpin(req);
        }
        else{
            throw new Error("Real backend not implemented yet");
        }
    }
}
export const apiService = new ApiService()