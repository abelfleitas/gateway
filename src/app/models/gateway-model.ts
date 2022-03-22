import { DeviceModel } from "./device-model";

export interface GatewayModel {
    id: number,
    serialNumber: string,
    name: string,
    ip4: string,
    devices: DeviceModel [] 
}

export interface AddGatewayModel {
    serialNumber: string,
    name: string,
    ip4: string,
}

export interface DialogGatewayModel {
    dialogName: string,
    gateway?: GatewayModel,
    type: string
}

export interface UpdateGatewayModel {
    serialNumber: string,
    name: string,
    ip4: string,
}
