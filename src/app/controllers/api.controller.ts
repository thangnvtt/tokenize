import { Context, dependency, Get, Hook, HttpResponseOK, ValidateQueryParam } from '@foal/core'
import { Response } from '../models'
import { BinanceService } from '../services'

@Hook(() => response => {
  // Every response of this controller and its sub-controllers will be added this header.
  response.setHeader('Access-Control-Allow-Origin', '*')
})
export class ApiController {

  @dependency
  binanceService: BinanceService

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!')
  }

  @Get('/depth')
  @ValidateQueryParam('symbol', { type: 'string' }, { required: true })
  @ValidateQueryParam('limit', { type: 'integer' }, { required: false })
  @ValidateQueryParam('maxAmountBid', { type: 'integer' }, { required: false })
  @ValidateQueryParam('maxSizeAsk', { type: 'integer' }, { required: false })
  async getDepth(ctx: Context) {
    const { symbol, limit, maxAmountBid, maxSizeAsk } = ctx.request.query
    const depth = await this.binanceService.getDepth(symbol, limit, maxAmountBid, maxSizeAsk)
    const response = new Response<any>(depth, true)
    return new HttpResponseOK(response)
  }

}
