import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category';

@Injectable()
export class CategoryService {
  private url = 'http://localhost:3000/category';
  constructor(private http: HttpClient) {}

  getCategorys() {
    return this.http.get<Array<Category>>(this.url);
  }

  createCategory(category: Category) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Category>(this.url, JSON.stringify(category), {
      headers: myHeaders,
    });
  }
  updateCategory(category: Category) {
    return this.http.put<Category>(this.url, category);
  }
  deleteCategory(id: number) {
    return this.http.delete<Category>(this.url + '/' + id);
  }
}
