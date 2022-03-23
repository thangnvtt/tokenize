import { Config } from '@foal/core'
import * as axios from 'axios'
import { DepthDTO } from '../dto'

const binanceUrl = Config.get('binance.url')

const api = axios.default

export class BinanceService {

    async getDepth(symbol: string, limit: number): Promise<DepthDTO> {
        const { data } = await api.get(`${binanceUrl}/api/v3/depth`, { params: { symbol, limit } })
        return new DepthDTO(data.bids, data.asks)
    }
}
