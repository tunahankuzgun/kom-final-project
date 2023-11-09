import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, []),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.requiredIfNotExists('password'),
    ]),
    withToken: schema.boolean.optional([rules.requiredIfNotExists('username')]),
  })

  public messages: CustomMessages = {}
}
