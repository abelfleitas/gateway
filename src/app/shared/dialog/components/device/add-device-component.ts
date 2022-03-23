import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Subject } from "rxjs";
import { AddDeviceModel, DeviceModel, DialogDeviceModel, UpdateDeviceModel } from "src/app/models/device-model";
import { StatusEnum } from "src/app/models/enums/status-enum";
import { GatewayModel } from "src/app/models/gateway-model";
import { GatewayService } from "src/app/services/gateway-service";

@Component({
    selector: 'add-device',
    templateUrl: 'add-device-component.html'
})
export class AddDeviceComponent extends SimpleModalComponent<DialogDeviceModel, AddDeviceModel | UpdateDeviceModel> 
    implements DialogDeviceModel, OnInit {

    private listGateways = new Subject<GatewayModel[]>();   
    public ListGateways = this.listGateways.asObservable()
    public statusE = Object.values(StatusEnum);   
    public status: Array<string> = [];   

    myForm!: FormGroup;
    dialogName!: string;
    device?: DeviceModel | undefined;
    type!: string;

    constructor(private gatewayService: GatewayService, 
        private fb: FormBuilder){
        super();
        this.clearNumbersInArr();
        this.gatewayService.getGateways().subscribe(x => {
            this.listGateways.next(x);
        });
    }

    ngOnInit(): void {
        if (this.type == 'add') {
            this.myForm = this.fb.group({
                vendor: ['', Validators.required],
                status: ['', Validators.required],
                gatewayId: ['', Validators.required]
            });

        } else if (this.type == 'update' && this.device != null) {
            console.log(this.device)
            this.myForm = this.fb.group({
                vendor: [this.device?.vendor, Validators.required],
                status: [this.device?.status, Validators.required],
                gatewayId: [this.device?.gatewayId, Validators.required]
            });
        }
    }   

    onSubmit(form: FormGroup) {
        if (form.valid) {
            if (this.type == 'add'){
                const cmd : AddDeviceModel = {
                    vendor: form.value.vendor,
                    status: (form.value.status == 'online') ? StatusEnum.ONLINE : StatusEnum.OFFLINE,
                    gatewayId: form.value.gatewayId
                };
                this.result = cmd;
            }
            else if (this.type == 'update' && this.device != null) {
                const cmd : UpdateDeviceModel = {
                    vendor: form.value.vendor,
                    status: (form.value.status == 'online') ? StatusEnum.ONLINE : StatusEnum.OFFLINE,
                    gatewayId: form.value.gatewayId
                };
                this.result = cmd;
            }
        }
        this.close();
    }

    chckStatus(status: string) : boolean {
        return status.toLowerCase() === this.device?.status.toString().toLowerCase();  
    }


    clearNumbersInArr(){
        this.statusE.forEach(element => {
            if(typeof element !== "number"){
                this.status.push(element.toString())
            }
        });
    }

    chckGatewayId(gatewayId: number){
        return (gatewayId === this.device?.gatewayId)
    }
}