import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  private baseApiUrl;
  constructor(private http: HttpClient, private env: EnvService) {
    this.baseApiUrl = this.env.apiUrl;
  }


  public getMethod(apiName: string) {
    return this.http
      .get(`${this.baseApiUrl}${apiName}`)
      .pipe(map(res => res))
      .pipe(catchError(this.handleError));
  }

  /*post method*/
  public postMethod(apiName: string, data) {
    return this.http
      .post(`${this.baseApiUrl}${apiName}`, data)
      .pipe(map(res => res))
      .pipe(catchError(this.handleError));
  }

  /*delete method*/
  public deleteMethod(apiName: string, data) {
    return this.postMethod(apiName, data);
  }

  /*delete by id method*/
  public deleteByIdMethod(apiName: string, data) {
    return this.http
      .delete(`${this.baseApiUrl}${apiName}/${data}`)
      .pipe(map(res => res))
      .pipe(catchError(this.handleError));
  }

  /*update method*/
  public updateMethod(apiName: string, data) {
    return this.http
      .put(`${this.baseApiUrl}${apiName}`, data)
      .pipe(map(res => res))
      .pipe(catchError(this.handleError));
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
