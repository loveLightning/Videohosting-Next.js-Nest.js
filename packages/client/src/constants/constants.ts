import { ApiMethods } from '@amazon/common/src'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

type PathType = 'profile' | 'products'

export const GET_IMAGE_URL = (
  method: ApiMethods,
  path: PathType,
  file: string,
) => `${publicRuntimeConfig.backendUrl}/${method}/${path}/${file}`
