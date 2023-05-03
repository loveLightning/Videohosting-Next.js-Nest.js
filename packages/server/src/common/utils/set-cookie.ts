import { Response } from 'express'

export const setCooke = (response: Response, refreshToken: string) => {
  response.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true, => if you use https
  })
}
