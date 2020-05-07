import { Component, OnInit } from '@angular/core';

import { SharedService } from './../shared.service';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    this.date = this.formatDate(this.currentDate);
  }

  ngOnInit(): void {}

  formatDate(date: Date): string {
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  getDateForDay(): Date {
    const nextDate = new Date(this.currentDate);
    nextDate.setDate(this.currentDate.getDate() + this.day - 1);
    return nextDate;
  }

  nextDay() {
    this.day++;
    this.date = this.formatDate(this.getDateForDay());
    this.sharedService.sendClickEvent();
  }
}
