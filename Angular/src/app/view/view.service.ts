import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { View } from './view';

@Injectable()
export class ViewService {
  private url = 'http://localhost:3000/view/all';
  constructor(private http: HttpClient) {}

  getViews() {
    return this.http.get<Array<View>>(this.url);
  }
}
