import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockApi } from './../interfaces/stock-api';
import { API_ENDPOINT } from './../constants';
import { stocks } from './../mocks';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getStocks(): Observable<StockApi[]> {
    return this.http.get<StockApi[]>(API_ENDPOINT);
  }

  getStocksFromMock(): Observable<StockApi[]> {
    return of(stocks);
  }
}
