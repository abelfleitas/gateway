import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway-service';
import { AddGatewayModel, GatewayModel, UpdateGatewayModel } from '../models/gateway-model';
import { NotificationService } from '../services/notifications-services';
import { NotifyTypeEnum } from '../models/enums/notify-type-enum';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../shared/dialog/confirm-component';
import { AddGatewayComponent } from '../shared/dialog/components/gateway/add-gateway-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public listGateway: GatewayModel[] = [];
  searchText = '';
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  gatewayArr: GatewayModel[] = [];

  constructor(
    private gatewayService: GatewayService,
    private notify: NotificationService,
    private simpleModalService: SimpleModalService) 
    {}

  ngOnInit() {
    this.getData();
  }

  public getData(){
    this.gatewayService.getGateways().subscribe(x => {
      this.listGateway = x;
      this.collectionSize = this.listGateway.length;
    })
  }

  public refreshCountries() {
    this.gatewayArr = this.listGateway
      .map((gateway, i) => ({x: i + 1, ...gateway}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public editRow(gateway: GatewayModel) {
    this.simpleModalService.addModal(AddGatewayComponent, {
      dialogName: 'Update Gateway',
      gateway: gateway,
      type: "update"
      }).subscribe((result: UpdateGatewayModel) => {
        if(result != null) {
          this.gatewayService.updateGateway(gateway.id,result)
          .subscribe(x => {
            this.getData();
            this.notify.showNotification("Gateway has been updated", NotifyTypeEnum.INFO)
          });
      }    
    });
  }

  deleteRow(id: number) {
    this.gatewayService.deleteGateway(id)
    .subscribe(x => {
      this.notify.showNotification("Gateway has been deleted", NotifyTypeEnum.SUCCESS)
      this.getData();
    });
  }

  showConfirm(gateway: GatewayModel) {
    this.simpleModalService.addModal(ConfirmComponent, {
          title: 'Please can you confirm',
          message: 'Are you sure to remove this gateway?'
    }).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.deleteRow(gateway.id);
      }
    });
  }

  public showModal() {
    this.simpleModalService.addModal(AddGatewayComponent, {
          dialogName: 'Add Gateway',
          gateway: undefined,
          type: 'add'
      }).subscribe((result: AddGatewayModel) => {
        if(result != null) {
          this.gatewayService.createGateway(result).subscribe(x => {
            this.getData();
            this.notify.showNotification("Gateway has been added", NotifyTypeEnum.SUCCESS)
          });  
        }    
      });
  }
}
