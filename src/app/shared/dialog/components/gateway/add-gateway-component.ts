import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from "ngx-simple-modal";
import { AddGatewayModel, UpdateGatewayModel, DialogGatewayModel, GatewayModel } from 'src/app/models/gateway-model';

@Component({
    selector: 'add-gateway',
    templateUrl: 'add-gateway-component.html'
})
export class AddGatewayComponent extends SimpleModalComponent<DialogGatewayModel, AddGatewayModel | UpdateGatewayModel> 
    implements DialogGatewayModel, OnInit {    
    
    myForm!: FormGroup;
    dialogName!: string;
    gateway?: GatewayModel | undefined;
    type!: string;

    constructor(private fb: FormBuilder) {
      super();
    }

    ngOnInit() {
        if (this.type == 'add') {
            this.myForm = this.fb.group({
                serialNumber: ['', Validators.required],
                ipv4: ['', Validators.required],
                name: ['', [Validators.required,Validators.minLength(4)]]
            });
        } else if(this.type == 'update' && this.gateway != null){
            this.myForm = this.fb.group({
                serialNumber: [this.gateway?.serialNumber, Validators.required],
                ipv4: [this.gateway?.ip4, Validators.required],
                name: [this.gateway?.name, [Validators.required,Validators.minLength(4)]]
            });
        }
    }

    onSubmit(form: FormGroup) {
        if (form.valid) {
            if (this.type == 'add'){
                const cmd : AddGatewayModel = {
                    serialNumber: form.value.serialNumber,
                    ip4: form.value.ipv4,
                    name: form.value.name
                };
                this.result = cmd;
            }
            else {
                const cmd : UpdateGatewayModel = {
                    serialNumber: form.value.serialNumber,
                    ip4: form.value.ipv4,
                    name: form.value.name,
                };
                this.result = cmd;
            }
            
        }
        this.close();
    }
}