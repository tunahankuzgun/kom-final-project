import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
    type: schema.enum(['guest', 'user', 'programmer', 'moderator', 'admin', 'developer'] as const),
  })

  public messages: CustomMessages = {}
}
