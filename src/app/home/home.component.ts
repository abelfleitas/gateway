import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway-service';
import { GatewayModel } from '../models/gateway-model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private listDevices = new Subject<GatewayModel>();
  public ListDevices = this.listDevices.asObservable();

  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
    
  }

  public getData(){
    this.gatewayService.getGateways().subscribe(x => {
      this.listDevices.next(x);
    })
  }
}
