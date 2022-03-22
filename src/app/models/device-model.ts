import { StatusEnum } from "./enums/status-enum";

export interface DeviceModel {
    id: string,
    vendor: string,
    created: Date,
    status: StatusEnum 
}