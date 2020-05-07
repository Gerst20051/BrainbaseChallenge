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
  { symbol: 'AAPL', name: 'Apple', price: 1000, initial_price: 1000, raw_change: 0, change: 0, raw_percent_change: 0, percent_change: 0 },
  { symbol: 'MSFT', name: 'Microsoft', price: 25, initial_price: 25, raw_change: 0, change: 0, raw_percent_change: 0, percent_change: 0 },
  { symbol: 'WFC', name: 'Wells Fargo & Company Common Stock', price: 28, initial_price: 28, raw_change: 0, change: 0, raw_percent_change: 0, percent_change: 0 },
  { symbol: 'UBER', name: 'Uber', price: 41, initial_price: 41, raw_change: 0, change: 0, raw_percent_change: 0, percent_change: 0 },
  { symbol: 'LYFT', name: 'Lyft', price: 57, initial_price: 57, raw_change: 0, change: 0, raw_percent_change: 0, percent_change: 0 },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  clickEventSubscription: Subscription;
  displayedColumns: string[] = ['symbol', 'name', 'price', 'initial_price', 'change', 'percent_change'];
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
    return this.fixFloat(price + price * percentage);
  }

  fixFloat(price: number): number {
    return parseFloat(price.toFixed(2));
  }

  getPercentageChange(oldPrice: number, newPrice: number): number {
    return (newPrice / oldPrice - 1) * 100;
  }

  nextDay() {
    for (let i = 0; i < STOCKS.length; i++) {
      STOCKS[i].price = this.adjustPriceByPercentage(STOCKS[i].price, this.randomPercentage());
      STOCKS[i].raw_change = this.fixFloat(STOCKS[i].price - STOCKS[i].initial_price);
      STOCKS[i].change = Math.abs(STOCKS[i].raw_change);
      STOCKS[i].raw_percent_change = this.fixFloat(this.getPercentageChange(STOCKS[i].initial_price, STOCKS[i].price));
      STOCKS[i].percent_change = Math.abs(STOCKS[i].raw_percent_change);
    }
  }
}
