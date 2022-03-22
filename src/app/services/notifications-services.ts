import { Injectable } from "@angular/core";
import { NotifyTypeEnum } from "../models/enums/notify-type-enum";

declare var $:any;

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor(){
    }

    public showNotification(msg : string, type: NotifyTypeEnum) {  
        $.notify({
            icon: "pe-7s-gift",
            message: msg
        },
        {
            type: type.toLowerCase(),
            timer: 1000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}