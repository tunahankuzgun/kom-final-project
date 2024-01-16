import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import CreateUserValidator from 'App/Validators/CreateUserValidator'
import IndexUserValidator from 'App/Validators/IndexUserValidator'
import ShowUserValidator from 'App/Validators/ShowUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage, type } = await request.validate(IndexUserValidator)

    const query = User.query()
    if (type) {
      query.where('type', type)
    }
    const users = await query.paginate(page || 1, perPage)

    return response.ok(users)
  }

  // public async store({ request, response }: HttpContextContract) {
  //   try {

  //     const user = new User()
  //     await user.save()

  //     return response.ok({ user })
  //   } catch (error) {
  //     return response.internalServerError()
  //   }
  // }

  public async show({ request, response }: HttpContextContract) {
    const { id } = await request.validate(ShowUserValidator)

    const user = await User.findOrFail(id)

    return response.ok(user)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = await request.validate(ShowUserValidator)
    const { email, password } = await request.validate(UpdateUserValidator)

    const user = await User.findOrFail(id)

    user.merge({ email, password })
    await user.save()

    return response.ok(user)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = await request.validate(ShowUserValidator)

    const user = await User.findOrFail(id)
    await user.delete()

    return response.ok('User deleted.')
  }
}
