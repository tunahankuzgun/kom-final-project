import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterAuthValidator from 'App/Validators/RegisterAuthValidator'
import LoginAuthValidator from 'App/Validators/LoginAuthValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = await request.validate(RegisterAuthValidator)

    try {
      const user = new User()
      user.fill({ email, password })
      await user.save()

      return response.ok({ user })
    } catch (error) {
      return response.internalServerError()
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password, withToken } = await request.validate(LoginAuthValidator)

    try {
      if (withToken) {
        await auth.use('api').authenticate()
        return response.ok({ user: auth.user })
      }

      if (email && password) {
        const accessToken = await auth.use('api').attempt(email, password, { expiresIn: '1 days' })
        return response.ok({ user: auth.user, accessToken })
      }
    } catch {
      return response.badRequest('Invalid credentials.')
    }
  }
}
