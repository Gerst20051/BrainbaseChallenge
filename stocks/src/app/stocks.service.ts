import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StockApi } from './stock-api';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getStocks(): Observable<StockApi[]> {
    return this.http.get<StockApi[]>('https://staging-api.brainbase.com/stocks.php');
  }
}
