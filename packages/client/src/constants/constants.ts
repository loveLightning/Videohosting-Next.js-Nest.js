import { ApiMethods } from 'src/types'

import { SUPPORTED_FORMATS } from './regex'

export const PROFILE_IMAGE_URL = (file: string) =>
  `${process.env.SERVER_URL}/${ApiMethods.Users}/profile/${file}`

export const checkFileSize = (file: File) =>
  !file || file.length === 0 || file.size <= 1024 * 1024

export const checkFormatFile = (file: File) =>
  SUPPORTED_FORMATS.includes(file.type)
