import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Deal } from './deal';

@Injectable()
export class DealService {
  private url = 'http://localhost:3000/deal';
  constructor(private http: HttpClient) {}

  getDeals() {
    return this.http.get<Array<Deal>>(this.url);
  }

  createDeal(deal: Deal) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Deal>(this.url, JSON.stringify(deal), {
      headers: myHeaders,
    });
  }
  updateDeal(deal: Deal) {
    return this.http.put<Deal>(this.url, deal);
  }
  deleteDeal(id: number) {
    return this.http.delete<Deal>(this.url + '/' + id);
  }
}
