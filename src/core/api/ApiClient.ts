import AppConfig from '@core/config/app'
import axios, { type InternalAxiosRequestConfig } from 'axios'
import JSON from './transactions.json'

const Providers = {
  local: {
    get: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: JSON,
            statusText: 'ok',
            config: {} as InternalAxiosRequestConfig,
            request: undefined,
            headers: {},
          })
        }, 1000)
      }),
  },
  url: axios.create({
    baseURL: AppConfig.api.url,
    timeout: 30,
  }),
}
export const ApiClient = Providers[AppConfig.api.provider]
