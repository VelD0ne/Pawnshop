import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from './report';

@Injectable()
export class ReportService {
  private url = 'http://localhost:3000/report';
  constructor(private http: HttpClient) {}

  getReport(firstDate: string, secondDate: string) {
    console.log(this.url + `?firstDate=${firstDate}&secondDate=${secondDate}`)
    return this.http.get<Array<Report>>(this.url + `?firstDate='${firstDate}'&secondDate='${secondDate}'`);
  }

}
