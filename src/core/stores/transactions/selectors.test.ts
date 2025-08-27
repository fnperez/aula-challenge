import type { Transaction } from '@core/types/transaction.types'
import { describe, expect, it, vi } from 'vitest'
import {
  selectCards,
  selectEntities,
  selectEntityById,
  selectHydrated,
  selectIds,
  selectPaymentMethods,
  selectSetCards,
  selectSetEntities,
  selectSetHydrated,
  selectSetPaymentMethods,
} from './selectors'
import type { Action, ID, State } from './types'

describe('transaction selectors', () => {
  const mockState: State = {
    hydrated: true,
    entities: {
      ids: ['1'],
      models: new Map([['1', { id: '1', amount: 100 } as Transaction]]),
    },
    cards: [{ value: 'visa', label: 'Visa' }],
    paymentMethods: [{ value: 'qr', label: 'QR' }],
  }

  const mockActions: Action = {
    setHydrated: vi.fn(),
    setEntities: vi.fn(),
    setCards: vi.fn(),
    setPaymentMethods: vi.fn(),
  }

  it('selectHydrated returns hydrated flag', () => {
    expect(selectHydrated(mockState)).toBe(true)
  })

  it('selectEntities returns entities', () => {
    expect(selectEntities(mockState)).toEqual(mockState.entities)
  })

  it('selectIds returns ids', () => {
    expect(selectIds(mockState)).toEqual(['1'])
  })

  it('selectEntityById returns entity by id', () => {
    const selector = selectEntityById('1' as ID)
    expect(selector(mockState)).toEqual({ id: '1', amount: 100 })
  })

  it('selectCards returns cards', () => {
    expect(selectCards(mockState)).toEqual([{ value: 'visa', label: 'Visa' }])
  })

  it('selectPaymentMethods returns payment methods', () => {
    expect(selectPaymentMethods(mockState)).toEqual([{ value: 'qr', label: 'QR' }])
  })

  it('selectSetHydrated returns setHydrated action', () => {
    expect(selectSetHydrated(mockActions)).toBe(mockActions.setHydrated)
  })

  it('selectSetEntities returns setEntities action', () => {
    expect(selectSetEntities(mockActions)).toBe(mockActions.setEntities)
  })

  it('selectSetCards returns setCards action', () => {
    expect(selectSetCards(mockActions)).toBe(mockActions.setCards)
  })

  it('selectSetPaymentMethods returns setPaymentMethods action', () => {
    expect(selectSetPaymentMethods(mockActions)).toBe(mockActions.setPaymentMethods)
  })
})
