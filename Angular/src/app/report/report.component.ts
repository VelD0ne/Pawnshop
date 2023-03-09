import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Report } from './report';
import { ReportService } from './report.service';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService],
})
export class ReportComponent {

  reports: Array<Report>;
  firstDate: string;
  secondDate: string;


  constructor(private serv: ReportService) {
    this.reports = new Array<Report>();
    this.firstDate = '';
    this.secondDate = '';
  }

  //загрузка пользователей
  public loadReports() {
    console.log(this.firstDate, this.secondDate)
    this.serv.getReport(this.firstDate, this.secondDate).subscribe((data: Array<Report>) => {
      this.reports = data;
    });
    console.log(this.reports)
  }
  // добавление пользователя
}