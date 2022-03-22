import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
import { ConfirmModel } from '../../models/confirm-model';

@Component({
    selector: 'confirm',
    templateUrl: 'confirm-component.html'
})
export class ConfirmComponent extends SimpleModalComponent<ConfirmModel, boolean> 
    implements ConfirmModel {
    
    title!: string;
    message!: string;

    constructor() {
      super();
    }

    confirm() {
        this.result = true;
        this.close();
    }
}