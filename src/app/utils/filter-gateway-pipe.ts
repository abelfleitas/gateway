import { Pipe, PipeTransform } from "@angular/core";
import { GatewayModel } from "../models/gateway-model";

@Pipe({
    name: "filterGateway"
})
export class FilterGatewayPipe implements PipeTransform {
    
    transform(items: GatewayModel[], searchTextDevice: string) {
        if (!items) {
            return [];
          }

          if (!searchTextDevice) {
            return items;
          }

          searchTextDevice = searchTextDevice.toLocaleLowerCase();
      
        return items.filter(it => {
          return it.name.toLocaleLowerCase().includes(searchTextDevice) ||
            it.ip4.toLocaleLowerCase().includes(searchTextDevice) ||
            it.serialNumber.toString().toLocaleLowerCase().includes(searchTextDevice);
        });
    }

}