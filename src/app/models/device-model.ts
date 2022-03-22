import { StatusEnum } from "./enums/etatus-enum";

export interface DeviceModel {
    id: string,
    vendor: string,
    created: Date,
    status: StatusEnum 
}