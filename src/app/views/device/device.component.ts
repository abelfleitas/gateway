import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DeviceModel } from 'src/app/models/device-model';
import { DeviceService } from 'src/app/services/device-service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [NgbModalConfig, NgbModal]
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
    config: NgbModalConfig, 
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getData();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  public getData(){
    this.deviceService.getDevices().subscribe(x => {
      this.devices = x;
      this.collectionSize = this.devices.length;
    });
  }

  public refreshCountries() {
    this.devicesArr = this.devices
      .map((device, i) => ({x: i + 1, ...device}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}


