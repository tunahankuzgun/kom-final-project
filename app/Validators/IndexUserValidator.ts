import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional([]),
    perPage: schema.number.optional([]),
    type: schema.enum.optional([
      'guest',
      'user',
      'programmer',
      'moderator',
      'admin',
      'developer',
    ] as const),
  })

  public messages: CustomMessages = {}
}
