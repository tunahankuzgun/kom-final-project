// import HttpContext from '@ioc:Adonis/Core/HttpContext'
// import AuthManager, { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
// import User from 'App/Models/User'
// import { v1 as uuidv1 } from 'uuid'
// import type { LoginData, MachineData } from './Machine'

// const makeAccessLevelFromLynca = (
//   level: number
// ): 'guest' | 'user' | 'programmer' | 'moderator' | 'admin' | 'developer' => {
//   switch (level) {
//     case 4:
//       return 'developer'
//     case 3:
//       return 'admin'
//     case 2:
//       return 'moderator'
//     case 1:
//       return 'programmer'
//     case 0:
//       return 'user'
//     default:
//       return 'guest'
//   }
// }

class TokenService {
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
  }

  //   public async generate(user: User): Promise<OpaqueTokenContract<User>> {
  //     const ctx = HttpContext.create('/', {})
  //     const auth = AuthManager.getAuthForRequest(ctx)
  //     return auth.use('api').generate(user)
  //   }

  //   public async validate(token: string): Promise<User> {
  //     const ctx = HttpContext.create('/', {})
  //     ctx.request.headers().authorization = `Bearer ${token}`
  //     const auth = AuthManager.getAuthForRequest(ctx)
  //     return auth.use('api').authenticate()
  //   }

  //   public async syncUser(data: MachineData): Promise<{ token: string; user: User }> {
  //     const details: LoginData = data.data

  //     const username = details.username || 'lynca'
  //     const password = uuidv1()
  //     const type = makeAccessLevelFromLynca(details.access_level)

  //     const user = await User.firstOrCreate({ username }, { password, type })
  //     user.merge({ type })
  //     user.save()

  //     const tokenService = new TokenService()

  //     if (data.token_api) {
  //       try {
  //         const validUser = await tokenService.validate(data.token_api)
  //         if (validUser.id !== user.id) {
  //           throw new Error('Invalid token')
  //         }
  //         return { token: data.token_api, user: validUser }
  //       } catch (error) {
  //         console.error(error.message)
  //       }
  //     }
  //     const token = await tokenService.generate(user)
  //     return { token: token.token, user }
  //   }
}

export default new TokenService()
