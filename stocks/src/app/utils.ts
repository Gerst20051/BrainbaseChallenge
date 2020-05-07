import { StockApi } from './interfaces/stock-api';
import { StockTable } from './interfaces/stock-table';
import { DAYS, MONTHS } from './constants';

export function adjustPriceByPercentage(price: number, percentage: number): number {
  return fixFloat(price + price * percentage);
}

export function convertApiStocksToTableStocks(stocks: StockApi[]): StockTable[] {
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

export function fixFloat(price: number): number {
  return parseFloat(price.toFixed(2));
}

export function formatDate(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getPercentageChange(oldPrice: number, newPrice: number): number {
  return (newPrice / oldPrice - 1) * 100;
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPercentage(): number {
  const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
  const percentage = randomInteger(0, 1000) / 100;
  return (positiveOrNegative * percentage) / 100;
}
