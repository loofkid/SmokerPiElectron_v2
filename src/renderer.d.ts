import { NetworkInterfaceInfo } from "os";

export interface IElectronAPI {
    networkInterfaces: () => NodeJS.Dict<NetworkInterfaceInfo[]>,
}

declare global {
    interface Window {
        api: IElectronAPI,
    }
}