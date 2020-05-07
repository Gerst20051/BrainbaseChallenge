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
    this.getStocks();
  }

  nextDay() {
    for (const [i] of this.STOCKS.entries()) {
      this.STOCKS[i].price = adjustPriceByPercentage(this.STOCKS[i].price, randomPercentage());
      this.STOCKS[i].raw_change = fixFloat(this.STOCKS[i].price - this.STOCKS[i].initial_price);
      this.STOCKS[i].change = Math.abs(this.STOCKS[i].raw_change);
      this.STOCKS[i].raw_percent_change = fixFloat(getPercentageChange(this.STOCKS[i].initial_price, this.STOCKS[i].price));
      this.STOCKS[i].percent_change = Math.abs(this.STOCKS[i].raw_percent_change);
    }
    this.dataSource.sort = this.sort;
  }

  getStocks() {
    this.stocksService.getStocks().subscribe(stocks => {
      this.STOCKS = convertApiStocksToTableStocks(stocks);
      this.dataSource.data = this.STOCKS;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('failed to get stocks', error);
    });
  }
}
