import { ApiMethods } from '@amazon/common/src'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const PROFILE_IMAGE_URL = (file: string, path: string) =>
  `${publicRuntimeConfig.backendUrl}/${ApiMethods.Users}/${path}/${file}`
