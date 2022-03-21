import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway-service';
import { GatewayModel } from '../models/gateway-model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]
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
    config: NgbModalConfig, 
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

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
}
