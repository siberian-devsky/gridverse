export interface StockCell {
  id: number;
  ticker: string;
  priceCurrent: number;
  priceDelta: number;
  priceDeltaPercent: number;
  priceTimestamp: Date;
  priceHigh: number;
  priceLow: number;
  updatedAt: Date;
}