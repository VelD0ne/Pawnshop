import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lease } from './lease';

@Injectable()
export class LeaseService {
  private url = 'http://localhost:3000/lease';
  constructor(private http: HttpClient) {}

  getLeases() {
    return this.http.get<Array<Lease>>(this.url);
  }

  createLease(lease: Lease) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Lease>(this.url, JSON.stringify(lease), {
      headers: myHeaders,
    });
  }
  updateLease(lease: Lease) {
    return this.http.put<Lease>(this.url, lease);
  }
  deleteLease(id: number) {
    return this.http.delete<Lease>(this.url + '/' + id);
  }
}
