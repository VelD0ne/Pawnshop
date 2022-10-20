import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'clients',
  templateUrl: './client.component.html',
  providers: [ClientService],
})
export class ClientComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    | TemplateRef<any>
    | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate:
    | TemplateRef<any>
    | undefined;

  editedClient: Client | null = null;
  clients: Array<Client>;
  isNewRecord: boolean = false;
  statusMessage: string = '';

  constructor(private serv: ClientService) {
    this.clients = new Array<Client>();
  }

  ngOnInit() {
    this.loadClients();
  }

  //загрузка пользователей
  private loadClients() {
    this.serv.getClients().subscribe((data: Array<Client>) => {
      this.clients = data;
    });
  }
  // добавление пользователя
  addClient() {
    this.editedClient = new Client(0, '', '', '', '', '', '');
    this.clients.push(this.editedClient);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editClient(client: Client) {
    this.editedClient = new Client(
      client.id,
      client.name,
      client.surname,
      client.patronomyc,
      client.date,
      client.giver,
      client.number
    );
  }
  // загружаем один из двух шаблонов
  loadTemplate(client: Client) {
    if (this.editedClient && this.editedClient.id === client.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveClient() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createClient(this.editedClient as Client).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadClients();
      });
      this.isNewRecord = false;
      this.editedClient = null;
    } else {
      // изменяем пользователя
      this.serv.updateClient(this.editedClient as Client).subscribe((_) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadClients();
      });
      this.editedClient = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.clients.pop();
      this.isNewRecord = false;
    }
    this.editedClient = null;
  }
  // удаление пользователя
  deleteClient(client: Client) {
    this.serv.deleteClient(client.id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadClients();
    });
  }
}
