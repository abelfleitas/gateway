import { StatusEnum } from "./enums/etatus-enum";

export interface DeviceModel {
    uuid: string,
    vendor: string,
    date: Date,
    status: StatusEnum 
}