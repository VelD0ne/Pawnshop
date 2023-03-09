import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Lease } from './lease';
import { LeaseService } from './lease.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { Deal } from '../deal/deal';
import { DealService } from '../deal/deal.service';


@Component({
  selector: 'leases',
  templateUrl: './lease.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [LeaseService, ProductService, DealService],
})
export class LeaseComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    TemplateRef<any> |
    null | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate:
    TemplateRef<any> |
    null | undefined;

  editedLease: Lease | null = null;
  leases: Array<Lease>;
  products: Array<Product>;
  deals: Array<Deal>;
  isNewRecord: boolean = false;
  statusMessage: string = 'Статус';

  constructor(private serv: LeaseService, private servProduct: ProductService, private servDeal: DealService) {
    this.leases = new Array<Lease>();
    this.products = new Array<Product>();
    this.deals = new Array<Deal>();

  }

  ngOnInit() {
    this.loadLeases();
  }

  //загрузка пользователей
  private loadLeases() {
    this.serv.getLeases().subscribe((data: Array<Lease>) => {
      this.leases = data;
      this.leases.map(elem => {
        elem.date = elem.date.substring(0,10);
      }) 
      this.servProduct.getProducts().subscribe((data: Array<Product>) => {
        this.products = data;
      })
      this.servDeal.getDeals().subscribe((data: Array<Deal>) => {
        this.deals = data;
      })
    });
  }
  // добавление пользователя
  addLease() {
    this.editedLease = new Lease(0, '', 0, '', 0, '');
    this.leases.push(this.editedLease);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editLease(lease: Lease) {
    this.editedLease = new Lease(
      lease.id,
      lease.date,
      lease.product,
      lease.productName,
      lease.deal,
      lease.dealName,
    );
  }
  // загружаем один из двух шаблонов
  loadTemplate(lease: Lease) {
    if (this.editedLease && this.editedLease.id === lease.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveLease() {
    if (this.isNewRecord) {
      // добавляем пользователя
      console.log(this.editedLease)
      this.serv.createLease(this.editedLease as Lease).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadLeases();
      });
      this.isNewRecord = false;
      this.editedLease = null;
    } else {
      // изменяем пользователя
      this.serv.updateLease(this.editedLease as Lease).subscribe(( ) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadLeases();
      });
      console.log(this.editedLease);
      this.editedLease = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.leases.pop();
      this.isNewRecord = false;
    }
    this.editedLease = null;
  }
  // удаление пользователя
  deleteLease(lease: Lease) {
    this.serv.deleteLease(lease.id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadLeases();
    });
  }
}
