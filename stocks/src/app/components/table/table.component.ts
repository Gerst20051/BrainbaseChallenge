import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { SharedService } from './../../services/shared.service';
import { StocksService } from './../../services/stocks.service';
import { StockApi } from './../../interfaces/stock-api';
import { StockTable } from './../../interfaces/stock-table';
import {
  adjustPriceByPercentage,
  convertApiStocksToTableStocks,
  fixFloat,
  getPercentageChange,
  randomInteger,
  randomPercentage,
} from './../../utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  clickEventSubscription: Subscription;
  dataSource = new MatTableDataSource<StockTable>();
  displayedColumns: string[] = ['symbol', 'name', 'price', 'initial_price', 'change', 'percent_change'];
  stocks: StockTable[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private sharedService: SharedService, private stocksService: StocksService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.nextDay();
    });
  }

  ngOnInit(): void {
    this.getStocks();
  }

  nextDay() {
    for (const [i] of this.stocks.entries()) {
      this.stocks[i].price = adjustPriceByPercentage(this.stocks[i].price, randomPercentage());
      this.stocks[i].raw_change = fixFloat(this.stocks[i].price - this.stocks[i].initial_price);
      this.stocks[i].change = Math.abs(this.stocks[i].raw_change);
      this.stocks[i].raw_percent_change = fixFloat(getPercentageChange(this.stocks[i].initial_price, this.stocks[i].price));
      this.stocks[i].percent_change = Math.abs(this.stocks[i].raw_percent_change);
    }
    this.dataSource.sort = this.sort;
  }

  getStocks() {
    this.stocksService.getStocksFromMock().subscribe(stocks => {
      this.stocks = convertApiStocksToTableStocks(stocks);
      this.dataSource.data = this.stocks;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('failed to get stocks', error);
    });
  }
}
