import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface StockInterface {
  symbol: string;
  name: string;
  price: number;
}

// TODO: determine if it makes sense to provide in root
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {}
}
