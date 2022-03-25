import { Context, controller, HttpResponse, HttpResponseInternalServerError, IAppController } from '@foal/core'
import { createConnection } from 'typeorm';

import { ApiController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
  ];

  async init() {
    await createConnection();
  }

  handleError(error: Error, ctx: Context): HttpResponse | Promise<HttpResponse> {
    return new HttpResponseInternalServerError({
      status: false,
      message: error.message,
      data: null
    })
  }
}
