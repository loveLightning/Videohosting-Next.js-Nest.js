export interface AuthRegister {
  name: string
  email: string
  password: string
}

export type AuthLogin = Omit<AuthRegister, 'name'>

export enum AuthModeEnum {
  SignIn,
  SignUp,
}
