import { RootCart } from './cart'
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
  role: Role
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
  carts: RootCart[]
}

export interface IUpdateUser {
  name?: string
  phone?: string
}

export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}
