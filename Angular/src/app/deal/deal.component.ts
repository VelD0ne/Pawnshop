import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Deal } from './deal';
import { DealService } from './deal.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';

@Component({
  selector: 'deals',
  templateUrl: './deal.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [DealService, ClientService],
})
export class DealComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    TemplateRef<any> |
    null | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate:
    TemplateRef<any> |
    null | undefined;

  editedDeal: Deal | null = null;
  deals: Array<Deal>;
  clients: Array<Client>;
  isNewRecord: boolean = false;
  statusMessage: string = 'Статус';

  constructor(private serv: DealService, private servCategory: ClientService) {
    this.deals = new Array<Deal>();
    this.clients = new Array<Client>();

  }

  ngOnInit() {
    this.loadDeals();
  }

  //загрузка пользователей
  private loadDeals() {
    this.serv.getDeals().subscribe((data: Array<Deal>) => {
      this.deals = data;
      this.deals.map(elem => {
        elem.returnDate = elem.returnDate.substring(0,10);
        elem.registrationDate = elem.registrationDate.substring(0,10);
      }) 
    });
    this.servCategory.getClients().subscribe((data: Array<Client>) => {
      this.clients = data;
    })
    
  }
  // добавление пользователя
  addDeal() {
    this.editedDeal = new Deal(0, 0, 0, '', '', 0, '');
    this.deals.push(this.editedDeal);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editDeal(deal: Deal) {
    this.editedDeal = new Deal(
      deal.id,
      deal.number,
      deal.sum,
      deal.returnDate,
      deal.registrationDate,
      deal.client,
      deal.clientName,
    );
  }
  // загружаем один из двух шаблонов
  loadTemplate(deal: Deal) {
    if (this.editedDeal && this.editedDeal.id === deal.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveDeal() {
    if (this.isNewRecord) {
      // добавляем пользователя
      console.log(this.editedDeal)
      this.serv.createDeal(this.editedDeal as Deal).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadDeals();
      });
      this.isNewRecord = false;
      this.editedDeal = null;
    } else {
      // изменяем пользователя
      this.serv.updateDeal(this.editedDeal as Deal).subscribe(( ) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadDeals();
      });
      console.log(this.editedDeal);
      this.editedDeal = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.deals.pop();
      this.isNewRecord = false;
    }
    this.editedDeal = null;
  }
  // удаление пользователя
  deleteDeal(deal: Deal) {
    this.serv.deleteDeal(deal.id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadDeals();
    });
  }
}
