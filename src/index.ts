import 'source-map-support/register'

// std
import * as http from 'http'

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core'

// App
import { AppController } from './app/app.controller'
import { WebsocketController } from './app/services'
import { DepthSync } from './app/jobs/deothSync'

async function main() {
  const serviceManager = new ServiceManager()
  const app = await createApp(AppController, { serviceManager })

  const httpServer = http.createServer(app)
  await serviceManager.get(WebsocketController).attachHttpServer(httpServer)
  const port = Config.get('port', 'number', 3001)
  httpServer.listen(port, () => displayServerURL(port))

  await serviceManager.get(DepthSync).emitDepth()
}

main()
  .catch(err => { console.error(err.stack); process.exit(1) })
