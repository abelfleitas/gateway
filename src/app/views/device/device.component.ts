import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceModel } from 'src/app/models/device-model';
import { DeviceService } from 'src/app/services/device-service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [DecimalPipe]
})
export class DeviceComponent implements OnInit {

  private listDevices = new Subject<DeviceModel>();
  public ListDevices = this.listDevices.asObservable();

  constructor(
    private deviceService: DeviceService) { 
  }

  ngOnInit(): void {
  }

  public getData(){
    this.deviceService.getDevices().subscribe(x => {
      this.listDevices.next(x);
    })
  }
}


