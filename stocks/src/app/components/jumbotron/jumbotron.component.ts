import { Component, OnInit } from '@angular/core';

import { SharedService } from './../../services/shared.service';
import { formatDate } from './../../utils';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {
  currentDate = new Date();
  day = 1;
  date = '';

  constructor(private sharedService: SharedService) {
    this.date = formatDate(this.currentDate);
  }

  ngOnInit(): void {}

  getDateForDay(): Date {
    const nextDate = new Date(this.currentDate);
    nextDate.setDate(this.currentDate.getDate() + this.day - 1);
    return nextDate;
  }

  nextDay() {
    this.day++;
    this.date = formatDate(this.getDateForDay());
    this.sharedService.sendClickEvent();
  }
}
