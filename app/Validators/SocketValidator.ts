import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocketValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data: schema
      .object()
      .members({ command: schema.string(), value: schema.number() || schema.string() }),
    type: schema.enum(['guest', 'user', 'programmer', 'moderator', 'admin', 'developer'] as const),
  })

  public messages: CustomMessages = {}
}
