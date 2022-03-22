import { Pipe, PipeTransform } from "@angular/core";
import { DeviceModel } from "../models/device-model";

@Pipe({
    name: "filterDevice"
})
export class FilterDivicePipe implements PipeTransform {
    
    transform(items: DeviceModel[], searchText: string) {
        if (!items) {
            return [];
          }
          if (!searchText) {
            return items;
          }
          searchText = searchText.toLocaleLowerCase();
      
          return items.filter(it => {
            return it.id.toLocaleLowerCase().includes(searchText) ||
              it.vendor.toLocaleLowerCase().includes(searchText) ||
              it.status.toString().toLocaleLowerCase().includes(searchText)
          });
    }

}