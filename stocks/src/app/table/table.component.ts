import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { SharedService } from './../shared.service';
import { StocksService } from './../stocks.service';
import { StockApi } from './../stock-api';
import { StockTable } from './../stock-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  clickEventSubscription: Subscription;
  displayedColumns: string[] = ['symbol', 'name', 'price', 'initial_price', 'change', 'percent_change'];
  STOCKS: StockTable[] = [];
  dataSource = new MatTableDataSource<StockTable>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private sharedService: SharedService, private stocksService: StocksService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.nextDay();
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getStocks();
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
    for (let i = 0; i < this.STOCKS.length; i++) {
      this.STOCKS[i].price = this.adjustPriceByPercentage(this.STOCKS[i].price, this.randomPercentage());
      this.STOCKS[i].raw_change = this.fixFloat(this.STOCKS[i].price - this.STOCKS[i].initial_price);
      this.STOCKS[i].change = Math.abs(this.STOCKS[i].raw_change);
      this.STOCKS[i].raw_percent_change = this.fixFloat(this.getPercentageChange(this.STOCKS[i].initial_price, this.STOCKS[i].price));
      this.STOCKS[i].percent_change = Math.abs(this.STOCKS[i].raw_percent_change);
    }
    this.dataSource.sort = this.sort;
  }

  convertApiStocksToTableStocks(stocks: StockApi[]): StockTable[] {
    const tableStocks: StockTable[] = stocks.map(stock => {
      const tableStock: StockTable = {
        ...stock,
        initial_price: stock.price,
        raw_change: 0,
        change: 0,
        raw_percent_change: 0,
        percent_change: 0,
      };
      return tableStock;
    });
    return tableStocks;
  }

  getStocks() {
    this.stocksService.getStocks().subscribe(stocks => {
      this.STOCKS = this.convertApiStocksToTableStocks(stocks);
      this.dataSource.data = this.STOCKS;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error(error);
    });
  }
}
