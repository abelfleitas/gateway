import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { AddDeviceModel, DeviceModel, UpdateDeviceModel } from "../models/device-model";
import { NotifyTypeEnum } from "../models/enums/notify-type-enum";
import { NotificationService } from "./notifications-services";

@Injectable({providedIn: 'root'})
export class DeviceService {

    private readonly apiURL : string = environment.base_url + "/device";

    constructor(
      private http: HttpClient,
      private notifyService: NotificationService) {}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    getDevices(): Observable<DeviceModel[]> {
        return this.http.get<DeviceModel[]>(this.apiURL + '/list')
          .pipe(retry(1), catchError(this.handleError));
    }

    getDevice(uuid: string): Observable<DeviceModel> {
        return this.http.get<DeviceModel>(this.apiURL + uuid)
          .pipe(retry(1), catchError(this.handleError));
    }

    createDevice(device: AddDeviceModel): Observable<DeviceModel> {
        return this.http.post<DeviceModel>(this.apiURL + '/add',
          JSON.stringify(device), this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    updateDevice(uuid: string, device: UpdateDeviceModel): Observable<DeviceModel> {
        return this.http.put<DeviceModel>(this.apiURL + '/update/' + uuid,
          JSON.stringify(device),this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    deleteDevice(uuid: string) {
        return this.http.delete<DeviceModel>(this.apiURL + '/delete/' + uuid, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
        }        

        this.notifyService.showNotification(errorMessage, NotifyTypeEnum.DANGER);

        return throwError(() => {
          return errorMessage;
        });
    }
}