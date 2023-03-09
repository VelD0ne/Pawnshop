import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable()
export class ProductService {
  private url = 'http://localhost:3000/product';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Array<Product>>(this.url);
  }

  createProduct(product: Product) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Product>(this.url, JSON.stringify(product), {
      headers: myHeaders,
    });
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(this.url, product);
  }
  deleteProduct(id: number) {
    return this.http.delete<Product>(this.url + '/' + id);
  }
}
