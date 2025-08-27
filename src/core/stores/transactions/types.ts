import type { Option } from '@core/types/option.types'
import type { Transaction } from '@core/types/transaction.types'

export type ID = Transaction['id']

export interface State {
  hydrated: boolean
  entities: {
    ids: ID[]
    models: Map<ID, Transaction>
  }
  cards: Array<Option>
  paymentMethods: Array<Option>
}

export interface Action {
  setHydrated: (hydrated: boolean) => void
  setEntities: (items: ReadonlyArray<Transaction>) => void
  setCards: (items: ReadonlyArray<Option>) => void
  setPaymentMethods: (items: ReadonlyArray<Option>) => void
}
