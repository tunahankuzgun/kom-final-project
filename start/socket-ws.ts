import Ws from 'App/Services/Ws'
import Logger from '@ioc:Adonis/Core/Logger'
import { v1 as uuidv1 } from 'uuid'
// import { io } from 'socket.io-client';
Ws.boot()
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  const uuid = uuidv1()
  socket.join(uuid)

  socket.on('message:command', (message) => {
    try {
      // Send this to lynca
      //console.log('Ws.io.on.socket.command', message);
      const data = JSON.stringify({ ...message, id: uuid })
      console.log(data)
      //console.log('Ws.io.on.socket.message sending:', data);
      //   if (Machine.connected) {
      //     Machine.socket.write(data + '\0', 'utf8')
      //   }
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
})
