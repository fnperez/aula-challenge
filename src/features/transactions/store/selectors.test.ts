import type { State } from '@core/stores/transactions/types'
import type { FilterParams } from '@core/types/filter.types'
import type { Transaction } from '@core/types/transaction.types'
import { startOfWeek } from 'date-fns'
import { describe, expect, it } from 'vitest'
import { selectBalance, selectTransactionFiltered } from './selectors'

function makeState(transactions: Transaction[]): State {
  const models = new Map(transactions.map((tx) => [tx.id, tx]))
  return {
    hydrated: true,
    entities: {
      ids: transactions.map((t) => t.id),
      models,
    },
    cards: [],
    paymentMethods: [],
  }
}

describe('selectBalance', () => {
  it('computes daily, weekly and monthly balance correctly', () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const startWeek = startOfWeek(today)
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    const state = makeState([
      { id: '1', amount: 100, createdAt: today.toISOString() }, // today
      { id: '2', amount: 200, createdAt: yesterday.toISOString() }, // this week
      { id: '3', amount: 300, createdAt: startWeek.toISOString() }, // this week
      { id: '4', amount: 400, createdAt: lastMonth.toISOString() }, // last month
    ] as Transaction[])

    const balance = selectBalance(state)

    // daily: only today's tx
    expect(balance.daily).toBe(100)

    // weekly: today + yesterday + startOfWeek
    expect(balance.weekly).toBe(100 + 200 + 300)

    // monthly: all this month's tx (today, yesterday, startWeek) but not last month
    expect(balance.monthly).toBe(100 + 200 + 300)
  })
})

describe('selectTransactionFiltered', () => {
  const baseTx = {
    amount: 100,
    card: 'visa',
    installments: 3,
    createdAt: new Date('2025-08-15T10:00:00Z').toISOString(),
    paymentMethod: 'qr',
  }

  const state = makeState([
    { id: '1', ...baseTx },
    { id: '2', ...baseTx, card: 'mastercard', amount: 200 },
    { id: '3', ...baseTx, paymentMethod: 'link', amount: 300 },
    { id: '4', ...baseTx, installments: 6, amount: 400 },
  ] as Transaction[])

  it('filters by card', () => {
    const params: FilterParams = {
      from: undefined,
      to: undefined,
      cards: ['visa'],
      paymentMethods: [],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual(['1', '3', '4'])
  })

  it('filters by payment method', () => {
    const params: FilterParams = {
      from: undefined,
      to: undefined,
      cards: [],
      paymentMethods: ['link'],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual(['3'])
  })

  it('filters by installments', () => {
    const params: FilterParams = {
      from: undefined,
      to: undefined,
      cards: [],
      paymentMethods: [],
      installments: ['6'],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual(['4'])
  })

  it('filters by amount range', () => {
    const params: FilterParams = {
      from: undefined,
      to: undefined,
      cards: [],
      paymentMethods: [],
      installments: [],
      min: 150,
      max: 350,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual(['2', '3'])
  })

  it('filters by date range', () => {
    const params: FilterParams = {
      from: '2025-08-15',
      to: '2025-08-16',
      cards: [],
      paymentMethods: [],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    // all tx created on 2025-08-15 should match
    expect(result).toEqual(['1', '2', '3', '4'])
  })

  it('filters by from date only (exclude older tx)', () => {
    const params: FilterParams = {
      from: '2025-08-16', // all created before 16th should be excluded
      to: undefined,
      cards: [],
      paymentMethods: [],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual([]) // all tx in state were created on 2025-08-15
  })

  it('filters by to date only (exclude newer tx)', () => {
    const params: FilterParams = {
      from: undefined,
      to: '2025-08-14', // all tx created after 14th should be excluded
      cards: [],
      paymentMethods: [],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual([]) // all tx in state are 2025-08-15 (too new)
  })

  it('filters correctly when from and to span the tx date', () => {
    const params: FilterParams = {
      from: '2025-08-14',
      to: '2025-08-16',
      cards: [],
      paymentMethods: [],
      installments: [],
      min: undefined,
      max: undefined,
    }
    const result = selectTransactionFiltered(params)(state)
    expect(result).toEqual(['1', '2', '3', '4']) // all tx created on 2025-08-15
  })
})
