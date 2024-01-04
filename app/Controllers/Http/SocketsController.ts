import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Socket from 'App/Models/Socket'
import SocketValidator from 'App/Validators/SocketValidator'
import Logger from '@ioc:Adonis/Core/Logger'

export default class SocketsController {
  public async store({ request, response }: HttpContextContract) {
    const { data } = await request.validate(SocketValidator)
    try {
      //   const data = new Socket()

      Logger.info(JSON.stringify(data))

      return response.ok({ data })
    } catch (error) {
      return response.internalServerError()
    }
  }
}
