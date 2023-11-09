import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShowUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unsigned(), rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages: CustomMessages = {}

  public get data() {
    return Object.assign({}, this.ctx.request.all(), { id: this.ctx.params.id })
  }
}
