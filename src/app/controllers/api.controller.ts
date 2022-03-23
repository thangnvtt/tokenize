import { Context, dependency, Get, HttpResponseOK } from '@foal/core'
import { BinanceService } from '../services'
export class ApiController {

  @dependency
  binanceService: BinanceService

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

  @Get('/depth')
  async getDepth(ctx: Context) {
    const { symbol, limit } = ctx.request.query
    const depth = await this.binanceService.getDepth(symbol, limit)
    return new HttpResponseOK({
      status: true,
      message: '',
      data: depth
    })
  }

}
