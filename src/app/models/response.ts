export class Response<T> {
    data: T
    message: string
    status: boolean

    constructor(data: T, status: boolean, message?: string) {
        this.status = status
        this.message = message ? message : ''
        this.data = data
    }
}