import { dependency } from '@foal/core'
import { WsServer } from '@foal/socket.io'
import { scheduleJob } from 'node-schedule'
import { BinanceService } from '../services'

const SYMBOL = 'ETHBTC'
const MAX_AMOUNT_BID = 5
const MAX_SIZE_ASK = 150
export class DepthSync {
    @dependency
    wsServer: WsServer

    @dependency
    binanceService: BinanceService

    async emitDepth(): Promise<void> {
        scheduleJob('*/10 * * * * *', async () => {
            const depth = await this.binanceService.getDepth(SYMBOL, undefined, MAX_AMOUNT_BID, MAX_SIZE_ASK)
            this.wsServer.io.emit('depth_fetch', depth)
        })
    }

}