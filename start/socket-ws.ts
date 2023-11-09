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
  socket.on('message:program', async (message) => {
    try {
      // Should be available in future versions
      // 1. gcode parts list
      // 2. gcode file reader
      if (message.type === 'gcode_list') {
        // return gcode file list
      } else if (message.type === 'gcode_read') {
        // return read gcode file content
      } else {
        throw new Error('Unhandled command on ??')
      }
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
  socket.on('message:setting', async (message) => {
    try {
      // Should be available in future versions
      // 3. settings reader
      if (message.type === 'set_setting') {
        // set database value of given setting
      } else if (message.type === 'get_setting') {
        // return read database value of given setting
      } else {
        throw new Error('Unhandled command on ??')
      }
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
  socket.on('message:command', (message) => {
    try {
      // Send this to lynca
      //console.log('Ws.io.on.socket.command', message);
      const data = JSON.stringify({ ...message, id: uuid })
      //console.log('Ws.io.on.socket.message sending:', data);
      //   if (Machine.connected) {
      //     Machine.socket.write(data + '\0', 'utf8')
      //   }
    } catch (error) {
      Logger.error(`WebSocket server on message error ${error.message}`)
    }
  })
})
/**
 * Warning! Test lines ahead.
 */
// const client = io('ws://127.0.0.1:3333', {
//   autoConnect: false,
//   reconnection: true,
//   reconnectionDelay: 500,
//   reconnectionAttempts: 1e6,
// });
// client.on('connect', () => {
//   Logger.info('connected?');
//   client.emit('message:command', {
//     command: 'login',
//     params: {
//       username: 'username',
//       password: 'password',
//     },
//     token: '',
//   });
// });
// let i = 0;
// client.on('message', (message) => {
//   console.log({ message });
//   const { token } = message;
//   if (i++ < 1) {
//     // setInterval(() => {
//     //   client.emit('message:command', {
//     //     command: 'heart_beat',
//     //     params: {},
//     //     token: token,
//     //   });
//     // }, 5000);
//     client.emit('message:command', {
//       command: 'get_state',
//       params: {},
//       token: token,
//     });
//   }
// });
// client.connect();
