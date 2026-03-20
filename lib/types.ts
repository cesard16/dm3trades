export interface MarketItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export interface MarketSnapshotResponse {
  data: MarketItem[]
  cached: boolean
  timestamp: number
}
