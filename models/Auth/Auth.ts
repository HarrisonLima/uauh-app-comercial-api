import IAuth from '../../interfaces/Auth/IAuth'

class Auth implements IAuth {
  constructor(public user: string, public password: string) {}
}

export default Auth;