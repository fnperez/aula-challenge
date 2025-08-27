import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Action, State } from './types'

const useTransactionsStore = create<State & Action>()(
  immer((set) => ({
    hydrated: false,
    entities: {
      ids: [],
      models: new Map(),
    },
    cards: [],
    paymentMethods: [],

    setHydrated: (hydrated) => set({ hydrated }),
    setEntities: (items) =>
      set((state) => {
        state.entities.ids = []
        state.entities.models = new Map()

        items.forEach((item) => {
          state.entities.ids.push(item.id)
          state.entities.models.set(item.id, item)
        })
      }),

    setCards: (cards) => set({ cards: [...cards] }),
    setPaymentMethods: (paymentMethods) => set({ paymentMethods: [...paymentMethods] }),
  })),
)

export default useTransactionsStore
