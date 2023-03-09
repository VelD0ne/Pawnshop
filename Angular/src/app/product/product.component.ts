import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'products',
  templateUrl: './product.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [ProductService, CategoryService],
})
export class ProductComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    TemplateRef<any> |
    null | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate:
    TemplateRef<any> |
    null | undefined;

  editedProduct: Product | null = null;
  products: Array<Product>;
  categories: Array<Category>;
  isNewRecord: boolean = false;
  statusMessage: string = 'Статус';

  constructor(private serv: ProductService, private servCategory: CategoryService) {
    this.products = new Array<Product>();
    this.categories = new Array<Category>();

  }

  ngOnInit() {
    this.loadProducts();
  }

  //загрузка пользователей
  private loadProducts() {
    this.serv.getProducts().subscribe((data: Array<Product>) => {
      this.products = data;
    });
    this.servCategory.getCategorys().subscribe((data: Array<Category>) => {
      this.categories = data;
    })
    
  }
  // добавление пользователя
  addProduct() {
    this.editedProduct = new Product(0, '', 0, 0, 0, '');
    this.products.push(this.editedProduct);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editProduct(product: Product) {
    this.editedProduct = new Product(
      product.id,
      product.name,
      product.cost,
      product.amount,
      product.category,
      product.categoryName,
    );
  }
  // загружаем один из двух шаблонов
  loadTemplate(product: Product) {
    if (this.editedProduct && this.editedProduct.id === product.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveProduct() {
    if (this.isNewRecord) {
      // добавляем пользователя
      console.log(this.editedProduct)
      this.serv.createProduct(this.editedProduct as Product).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadProducts();
      });
      this.isNewRecord = false;
      this.editedProduct = null;
    } else {
      // изменяем пользователя
      this.serv.updateProduct(this.editedProduct as Product).subscribe(( ) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadProducts();
      });
      console.log(this.editedProduct);
      this.editedProduct = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.products.pop();
      this.isNewRecord = false;
    }
    this.editedProduct = null;
  }
  // удаление пользователя
  deleteProduct(product: Product) {
    this.serv.deleteProduct(product.id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadProducts();
    });
  }
}
