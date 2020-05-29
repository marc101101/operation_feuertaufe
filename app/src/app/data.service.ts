import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  dataUrl = 'http://localhost:5000/getdata';

  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
