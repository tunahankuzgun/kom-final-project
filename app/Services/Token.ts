import HttpContext from '@ioc:Adonis/Core/HttpContext'
import AuthManager, { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'
// import { v1 as uuidv1 } from 'uuid'

class TokenService {
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
  }

  public async generate(user: User): Promise<OpaqueTokenContract<User>> {
    const ctx = HttpContext.create('/', {})
    const auth = AuthManager.getAuthForRequest(ctx)
    return auth.use('api').generate(user)
  }

  public async validate(token: string): Promise<User> {
    const ctx = HttpContext.create('/', {})
    ctx.request.headers().authorization = `Bearer ${token}`
    const auth = AuthManager.getAuthForRequest(ctx)
    return auth.use('api').authenticate()
  }
}

export default new TokenService()
