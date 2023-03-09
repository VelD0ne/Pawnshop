import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { View } from './view';
import { ViewService } from './view.service';

@Component({
  selector: 'views',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ViewService],
})
export class ViewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate:
    TemplateRef<any> |
    null | undefined;

  views: Array<View>;
  sortedViews: Array<View>;
  search: string | undefined;

  constructor(private serv: ViewService) {
    this.views = new Array<View>();
    this.sortedViews = this.views.slice();
  }

  ngOnInit() {  
    this.loadViews();
  }


  private loadViews() {
    this.serv.getViews().subscribe((data: Array<View>) => {
      this.views = data;
      this.views.map(elem => {
        elem.returnDate = elem.returnDate.substring(0,10)
        elem.giveDate = elem.giveDate.substring(0,10)
        elem.leaseDate = elem.giveDate.substring(0,10)
      }) 
      this.sortedViews = this.views.slice();
    });
  }

  loadTemplate(view: View) {
    return this.readOnlyTemplate;
  }

  sortData(sort: Sort) {
    const data = this.views.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedViews = data;
      return;
    }

    this.sortedViews = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'clientName':
          return compare(a.clientName, b.clientName, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        case 'giver':
          return compare(a.giver, b.giver, isAsc);
        case 'giveDate':
          return compare(a.giveDate, b.giveDate, isAsc);
        case 'passportNumber':
          return compare(a.passportNumber, b.passportNumber, isAsc);
        case 'dealNumber':
          return compare(a.dealNumber, b.dealNumber, isAsc);
        case 'sum':
          return compare(a.sum, b.sum, isAsc);
        case 'returnDate':
          return compare(a.returnDate, b.returnDate, isAsc);
        case 'leaseDate':
          return compare(a.leaseDate, b.leaseDate, isAsc);
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'categoryName':
          return compare(a.categoryName, b.categoryName, isAsc);
        case 'cost':
          return compare(a.cost, b.cost, isAsc);
        case 'amount':
          return compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}