import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StockApi } from './../interfaces/stock-api';
import { API_ENDPOINT } from './../constants';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getStocks(): Observable<StockApi[]> {
    return this.http.get<StockApi[]>(API_ENDPOINT);
  }
}
