import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  public messages: CustomMessages = {}
}
