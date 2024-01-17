import Ws from 'App/Services/Ws'
import Logger from '@ioc:Adonis/Core/Logger'
import { v1 as uuidv1 } from 'uuid'
import Raspberry from 'App/Services/Raspberry'
import Token from 'App/Services/Token'

Raspberry.boot()
/**
 * Listen for incoming socket connections
 */
Raspberry.io.on('connection', (socket) => {
  const uuid = uuidv1()
  socket.join(uuid)

  socket.on('message', async (message) => {
    try {
      const token = message.message.accessToken
      await Token.validate(token)
      // console.log()
      //console.log('Ws.io.on.socket.command', message);
      const data = JSON.stringify({ ...message, id: uuid })
      console.log('to Modbus data:', data)
      Ws.io.emit('message', {
        data,
      })
      // console.log()
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
})

Raspberry.io.listen(4001)
