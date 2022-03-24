import { Config } from '@foal/core'
import * as axios from 'axios'
import { Depth } from '../models'

const binanceUrl = Config.get('binance.url')
const api = axios.default

export class BinanceService {
    async getDepth(symbol: string, limit: number | undefined, maxAmountBid: number, maxSizeAsk: number): Promise<Depth> {
        const { data } = await api.get(`${binanceUrl}/api/v3/depth`, { params: { symbol, limit } })
        const limitDepth = this.getListWithLimitAmount(data, maxAmountBid, maxSizeAsk)
        return new Depth(limitDepth.bids, limitDepth.asks)
    }

    private getListWithLimitAmount(depth: Depth, maxAmountBid = 0, maxSizeAsk = 0) {
        let amountBid = 0
        let sizeAsk = 0
        const list = new Depth([], [])

        if (maxAmountBid <= 0) {
            list.bids = depth.bids
        }

        if (maxSizeAsk <= 0) {
            list.asks = depth.asks
        }

        if (maxAmountBid > 0) {
            for (const bid of depth.bids) {
                const size = Number(bid[1])
                const price = Number(bid[0])
                amountBid += price * size
                if (amountBid > maxAmountBid) break
                list.bids.push(bid)
            }
        }

        if (maxSizeAsk > 0) {
            for (const ask of depth.asks) {
                const size = Number(ask[1])
                sizeAsk += size
                if (sizeAsk > maxSizeAsk) break
                list.asks.push(ask)
            }
        }

        return list
    }
}
