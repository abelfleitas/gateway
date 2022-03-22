import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { AddDeviceModel, DialogDeviceModel, UpdateDeviceModel } from "src/app/models/device-model";

@Component({
    selector: 'add-device',
    templateUrl: 'add-device-component.html'
})
export class AddDeviceComponent extends SimpleModalComponent<DialogDeviceModel, AddDeviceModel | UpdateDeviceModel> 
    implements DialogDeviceModel, OnInit {
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }   

}