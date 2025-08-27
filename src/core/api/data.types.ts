import type { Option } from '@core/types/option.types'
import type { Transaction } from '@core/types/transaction.types'

export type ApiResponse<TData, TMetadata = unknown, TDataKey extends string = 'data'> = {
  [K in TDataKey]: TData
} & {
  metadata: TMetadata
}

export interface TransactionFetchMetadata {
  cards: ReadonlyArray<Option>
  paymentMethods: ReadonlyArray<Option>
}

export type TransactionsFetchData = ReadonlyArray<Transaction>

export type TransactionsFetchResponse = ApiResponse<TransactionsFetchData, TransactionFetchMetadata, 'transactions'>
