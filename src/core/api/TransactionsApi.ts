import type { AxiosResponse } from 'axios'
import { ApiClient } from './ApiClient'
import type { TransactionsFetchResponse } from './data.types'

export async function fetchAll() {
  const response = (await ApiClient.get('transactions.json')) as AxiosResponse<TransactionsFetchResponse>

  if (response.status !== 200) {
    throw new Error('Request failed.')
  }

  return response.data
}
