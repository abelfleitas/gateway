import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway-service';
import { GatewayModel } from '../models/gateway-model';
import { NotificationService } from '../services/notifications-services';
import { NotifyTypeEnum } from '../models/enums/notify-type-enum';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../shared/dialog/confirm-component';

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
    private simpleModalService:SimpleModalService) 
    {}

  ngOnInit() {
    this.getData();
  }

  public getData(){
    this.gatewayService.getGateways().subscribe(x => {
      this.listGateway = x;
      this.collectionSize = this.listGateway.length;
    }, err => {
      this.notify.showNotification(err, NotifyTypeEnum.DANGER)
    })
  }

  public refreshCountries() {
    this.gatewayArr = this.listGateway
      .map((gateway, i) => ({x: i + 1, ...gateway}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public editRow(gateway: GatewayModel){
    this.notify.showNotification(gateway.id.toString(), NotifyTypeEnum.SUCCESS)
  }

  deleteRow(id: number) {
    this.gatewayService.deleteGateway(id)
    .subscribe(x => {
      this.notify.showNotification("Gateway has been deleted", NotifyTypeEnum.SUCCESS)
      this.getData();
    }, err => {
      this.notify.showNotification(err, NotifyTypeEnum.DANGER)
    });
  }

  showConfirm(gateway: GatewayModel) {
    let disposable = this.simpleModalService.addModal(ConfirmComponent, {
          title: 'Please can you confirm',
          message: 'Are you sure to remove this gateway?'
    }).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.deleteRow(gateway.id);
      }
    });
  }
}
