import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from 'src/app/home/home.component';
import { DeviceComponent } from 'src/app/views/device/device.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterDivicePipe } from 'src/app/utils/filter-device-pipe';
import { FilterGatewayPipe } from 'src/app/utils/filter-gateway-pipe';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm-component';
import { AddGatewayComponent } from 'src/app/shared/dialog/components/gateway/add-gateway-component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AddDeviceComponent } from 'src/app/shared/dialog/components/device/add-device-component';
import { NotificationService } from 'src/app/services/notifications-services';
import { DeviceService } from 'src/app/services/device-service';
import { GatewayService } from 'src/app/services/gateway-service';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SimpleModalModule.forRoot({ container:document.body }),
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  declarations: [
    HomeComponent, 
    DeviceComponent,
    FilterDivicePipe,
    FilterGatewayPipe,
    ConfirmComponent,
    AddGatewayComponent, 
    AddDeviceComponent
  ],
  providers: [NotificationService,GatewayService, DeviceService],
  entryComponents: [ConfirmComponent, AddGatewayComponent, AddDeviceComponent],
  bootstrap: [AdminLayoutModule]
})

export class AdminLayoutModule {}
