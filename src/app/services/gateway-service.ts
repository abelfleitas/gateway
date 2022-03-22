import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { GatewayModel } from "../models/gateway-model";

@Injectable({providedIn: 'root'})
export class GatewayService {

    private readonly apiURL : string = environment.base_url + "/gateway";

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    getGateways(): Observable<GatewayModel[]> {
        return this.http.get<GatewayModel[]>(this.apiURL + '/list')
          .pipe(retry(1), catchError(this.handleError));
    }

    getGateway(id: number): Observable<GatewayModel> {
        return this.http.get<GatewayModel>(this.apiURL + id)
          .pipe(retry(1), catchError(this.handleError));
    }

    createGateway(gateway: GatewayModel): Observable<GatewayModel> {
        return this.http.post<GatewayModel>(this.apiURL + '/add',
          JSON.stringify(gateway), this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    updateGateway(id: number, gateway: GatewayModel): Observable<GatewayModel> {
        return this.http.put<GatewayModel>(this.apiURL + '/update/' + id,
          JSON.stringify(gateway),this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    deleteDateway(id: number) {
        return this.http.delete<GatewayModel>(this.apiURL + '/delete/' + id, this.httpOptions)
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
        //display errors    
        window.alert(errorMessage);
        
        return throwError(() => {
          return errorMessage;
        });
    }
}