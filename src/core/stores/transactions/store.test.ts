import type { Transaction } from '@core/types/transaction.types'
import { beforeEach, describe, expect, it } from 'vitest'
import useTransactionsStore from './store'

describe('useTransactionsStore', () => {
  beforeEach(() => {
    // reset store to initial state before each test
    useTransactionsStore.setState({
      hydrated: false,
      entities: { ids: [], models: new Map() },
      cards: [],
      paymentMethods: [],
      setHydrated: useTransactionsStore.getState().setHydrated,
      setEntities: useTransactionsStore.getState().setEntities,
      setCards: useTransactionsStore.getState().setCards,
      setPaymentMethods: useTransactionsStore.getState().setPaymentMethods,
    })
  })

  it('initial state is correct', () => {
    const state = useTransactionsStore.getState()
    expect(state.hydrated).toBe(false)
    expect(state.entities.ids).toEqual([])
    expect(state.entities.models.size).toBe(0)
    expect(state.cards).toEqual([])
    expect(state.paymentMethods).toEqual([])
  })

  it('setHydrated updates hydrated flag', () => {
    useTransactionsStore.getState().setHydrated(true)
    expect(useTransactionsStore.getState().hydrated).toBe(true)
  })

  it('setEntities stores ids and models', () => {
    const transactions = [
      { id: '1', amount: 100 },
      { id: '2', amount: 200 },
    ] as Array<Transaction>

    useTransactionsStore.getState().setEntities(transactions)
    const state = useTransactionsStore.getState()

    expect(state.entities.ids).toEqual(['1', '2'])
    expect(state.entities.models.get('1')).toEqual({ id: '1', amount: 100 })
    expect(state.entities.models.get('2')).toEqual({ id: '2', amount: 200 })
  })

  it('setCards updates cards array', () => {
    const cards = [{ value: 'visa', label: 'Visa' }]
    useTransactionsStore.getState().setCards(cards)
    expect(useTransactionsStore.getState().cards).toEqual(cards)
  })

  it('setPaymentMethods updates paymentMethods array', () => {
    const methods = [{ value: 'qr', label: 'QR' }]
    useTransactionsStore.getState().setPaymentMethods(methods)
    expect(useTransactionsStore.getState().paymentMethods).toEqual(methods)
  })
})
