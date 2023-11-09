import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

export interface SocketMessage {
  command: string
  params?: object
  data?: object
  status: 'success' | 'error'
  token: string
  id?: string[]
}

class Ws {
  public io: Server
  private booted = false
  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }
    this.booted = true
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })
  }
}
export default new Ws()
