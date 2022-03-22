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
import { DefaultSimpleModalOptionConfig, defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SimpleModalModule.forRoot({ container:document.body })
  ],
  declarations: [
    HomeComponent, 
    DeviceComponent,
    FilterDivicePipe,
    FilterGatewayPipe,
    ConfirmComponent 
  ],
  entryComponents: [ConfirmComponent],
  bootstrap: [AdminLayoutModule]
})

export class AdminLayoutModule {}
