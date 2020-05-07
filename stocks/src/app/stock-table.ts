export interface StockTable {
  symbol: string;
  name: string;
  price: number;
  initial_price: number;
  raw_change: number;
  change: number;
  raw_percent_change: number;
  percent_change: number;
}
