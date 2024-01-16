import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, []),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.requiredIfNotExists('password'),
    ]),
    withToken: schema.boolean.optional([rules.requiredIfNotExists('email')]),
  })

  public messages: CustomMessages = {}
}
