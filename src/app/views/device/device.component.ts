import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AddDeviceModel, DeviceModel } from 'src/app/models/device-model';
import { NotifyTypeEnum } from 'src/app/models/enums/notify-type-enum';
import { DeviceService } from 'src/app/services/device-service';
import { NotificationService } from 'src/app/services/notifications-services';
import { AddDeviceComponent } from 'src/app/shared/dialog/components/device/add-device-component';
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

  public editRow(device: DeviceModel) {
    this.simpleModalService.addModal(AddDeviceComponent, {
      dialogName: 'Update Device',
      device: device,
      type: 'update'
    }).subscribe((result: AddDeviceModel)=>{
      if(result != null){
        this.deviceService.updateDevice(device.id,result)
        .subscribe(x => {
          this.getData();
          this.notify.showNotification("Device has been updated", NotifyTypeEnum.INFO)
        });
      }
    });
  }

  deleteRow(uuid: string) {
    this.deviceService.deleteDevice(uuid)
    .subscribe(x => {
      this.notify.showNotification("Divice has been deleted", NotifyTypeEnum.SUCCESS)
      this.getData();
    });
  }

  showConfirm(device: DeviceModel) {
    this.simpleModalService.addModal(ConfirmComponent, {
          title: 'Please can you confirm',
          message: 'Are you sure to remove this gateway?'
    }).subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.deleteRow(device.id);
      }
    });
  }

  showModal(){
    this.simpleModalService.addModal(AddDeviceComponent, {
      dialogName: 'Add Device',
      device: undefined,
      type: 'add'
    }).subscribe((result: AddDeviceModel)=>{
      if(result != null){
        this.deviceService.createDevice(result)
        .subscribe(x => {
          this.getData();
          this.notify.showNotification("Device has been added", NotifyTypeEnum.SUCCESS)
        });
      }
    });
  }
}


