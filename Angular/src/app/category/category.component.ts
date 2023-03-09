import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  selector: 'categories',
  templateUrl: './category.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [CategoryService],
})
export class CategoryComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    TemplateRef<any> |
    null | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate:
    TemplateRef<any> |
    null | undefined;

  editedCategory: Category | null = null;
  categories: Array<Category>;
  isNewRecord: boolean = false;
  statusMessage: string = 'Статус';

  constructor(private serv: CategoryService) {
    this.categories = new Array<Category>();
  }

  ngOnInit() {
    this.loadCategories();
  }

  //загрузка пользователей
  private loadCategories() {
    this.serv.getCategorys().subscribe((data: Array<Category>) => {
      this.categories = data;
    });
  }
  // добавление пользователя
  addCategory() {
    this.editedCategory = new Category(0, '');
    this.categories.push(this.editedCategory);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editCategory(category: Category) {
    this.editedCategory = new Category(
      category.id,
      category.name
    );
  }
  // загружаем один из двух шаблонов
  loadTemplate(category: Category) {
    if (this.editedCategory && this.editedCategory.id === category.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveCategory() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createCategory(this.editedCategory as Category).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadCategories();
      });
      this.isNewRecord = false;
      this.editedCategory = null;
    } else {
      // изменяем пользователя
      this.serv.updateCategory(this.editedCategory as Category).subscribe(( ) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadCategories();
      });
      this.editedCategory = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.categories.pop();
      this.isNewRecord = false;
    }
    this.editedCategory = null;
  }
  // удаление пользователя
  deleteCategory(category: Category) {
    this.serv.deleteCategory(category.id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadCategories();
    });
  }
}
