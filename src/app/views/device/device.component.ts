import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { DeviceModel } from 'src/app/models/device-model';
import { NotifyTypeEnum } from 'src/app/models/enums/notify-type-enum';
import { DeviceService } from 'src/app/services/device-service';
import { NotificationService } from 'src/app/services/notifications-services';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm-component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {

  public devices: DeviceModel[] = [];
  searchTextDevice = '';
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  devicesArr: DeviceModel[] = [];

  constructor(
    private deviceService: DeviceService,
    private notify: NotificationService,
    private simpleModalService:SimpleModalService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.deviceService.getDevices().subscribe(x => {
      this.devices = x;
      this.collectionSize = this.devices.length;
    }, err => {
      this.notify.showNotification(err, NotifyTypeEnum.DANGER);
    });
  }

  public refreshCountries() {
    this.devicesArr = this.devices
      .map((device, i) => ({x: i + 1, ...device}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public editRow(device: DeviceModel){
    this.notify.showNotification(device.id.toString(), NotifyTypeEnum.SUCCESS)
  }

  deleteRow(uuid: string) {
    this.deviceService.deleteDevice(uuid)
    .subscribe(x => {
      this.notify.showNotification("Divice has been deleted", NotifyTypeEnum.SUCCESS)
      this.getData();
    }, err => {
      this.notify.showNotification(err, NotifyTypeEnum.DANGER)
    });
  }

  showConfirm(device: DeviceModel) {
    let disposable = this.simpleModalService.addModal(ConfirmComponent, {
          title: 'Please can you confirm',
          message: 'Are you sure to remove this gateway?'
    }).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.deleteRow(device.id);
      }
    });
  }
}


