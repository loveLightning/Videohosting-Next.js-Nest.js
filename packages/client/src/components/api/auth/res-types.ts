export interface IUser {
  user: UserTypes
  accessJwt: string
  refreshJwt: string
}

export interface UserTypes {
  id: number
  email: string
}
