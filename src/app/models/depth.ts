export class Depth {
    bids: object[]
    asks: object[]

    constructor(bids: object[], asks: object[]) {
        this.bids = bids
        this.asks = asks
    }
}