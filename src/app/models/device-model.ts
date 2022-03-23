import { StatusEnum } from "./enums/status-enum";

export interface DeviceModel {
    id: string,
    vendor: string,
    created: Date,
    status: StatusEnum,
    gatewayId: number
}

export interface DialogDeviceModel {
    dialogName: string,
    device?: DeviceModel,
    type: string;
}

export interface AddDeviceModel {
   vendor: string,
   status: StatusEnum,
   gatewayId: number 
}

export interface UpdateDeviceModel {
    vendor: string,
    status: StatusEnum,
    gatewayId: number 
}