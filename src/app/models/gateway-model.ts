import { DeviceModel } from "./device-model";

export interface GatewayModel {
    id: number,
    serialNumber: string,
    name: string,
    ip4: string,
    devices: DeviceModel [] 
}