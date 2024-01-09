import Ws from 'App/Services/Ws'
import Logger from '@ioc:Adonis/Core/Logger'
import { v1 as uuidv1 } from 'uuid'
import Raspberry from 'App/Services/Raspberry'

Ws.boot()
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  const uuid = uuidv1()
  socket.join(uuid)

  socket.on('message', (message) => {
    try {
      //console.log('Ws.io.on.socket.command', message);
      const data = JSON.stringify({ ...message, id: uuid })
      console.log('Modbus', data)
      Raspberry.io.emit('message', {
        data,
      })
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
})

Ws.io.listen(4000)
