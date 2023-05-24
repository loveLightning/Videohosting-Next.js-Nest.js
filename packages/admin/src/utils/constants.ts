import { ApiMethods } from '@amazon/common/src'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const GET_IMAGE_URL = (
  method: ApiMethods,
  path: string,
  file: string | undefined,
) => `${publicRuntimeConfig.backendUrl}/${method}/${path}/${file}`
