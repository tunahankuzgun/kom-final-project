import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    await import('../start/socket-ws')
    await import('../start/socket-raspberry')
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
