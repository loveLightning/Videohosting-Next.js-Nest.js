import { IProduct } from './product'

export interface IUser {
  user: UserTypes
  accessToken: string
  refreshToken: string
}

export interface UserTypes {
  id: number
  email: string
  isActivated: boolean
}

export interface IProfile {
  id: number
  email: string
  name: string
  avatarPath: string
  phone: string
}

export interface IFullProfile extends IProfile {
  favorites: IProduct[]
}

export interface IUpdateUser {
  name?: string
  phone?: string
}
