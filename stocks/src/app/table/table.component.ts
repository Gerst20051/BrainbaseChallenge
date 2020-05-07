import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { SharedService } from './../shared.service';

export interface StockTableInterface {
  symbol: string;
  name: string;
  price: number;
}

const STOCKS: StockTableInterface[] = [
  { symbol: 'AAPL', name: 'Apple', price: 1000 },
  { symbol: 'MSFT', name: 'Microsoft', price: 25 },
  { symbol: 'WFC', name: 'Wells Fargo & Company Common Stock', price: 28 },
  { symbol: 'UBER', name: 'Uber', price: 41 },
  { symbol: 'LYFT', name: 'Lyft', price: 57 },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  clickEventSubscription: Subscription;
  displayedColumns: string[] = ['symbol', 'name', 'price'];
  dataSource = new MatTableDataSource<StockTableInterface>(STOCKS);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private sharedService: SharedService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.nextDay();
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomPercentage(): number {
    const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
    const randomPercentage = this.randomInteger(0, 1000) / 100;
    return (positiveOrNegative * randomPercentage) / 100;
  }

  adjustPriceByPercentage(price: number, percentage: number): number {
    return parseFloat((price + price * percentage).toFixed(2));
  }

  nextDay() {
    for (let i = 0; i < STOCKS.length; i++) {
      STOCKS[i].price = this.adjustPriceByPercentage(STOCKS[i].price, this.randomPercentage());
    }
  }
}
