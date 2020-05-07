import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['symbol', 'name', 'price'];
  dataSource = new MatTableDataSource(STOCKS);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
