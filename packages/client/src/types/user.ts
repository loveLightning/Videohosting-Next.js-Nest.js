export interface IUser {
  user: UserTypes
  accessToken: string
  refreshToken: string
}

export interface UserTypes {
  id: number
  email: string
}
