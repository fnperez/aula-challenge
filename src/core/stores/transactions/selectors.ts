import type { Action, ID, State } from './types'

export const selectHydrated = (state: State) => state.hydrated

export const selectEntities = (state: State) => state.entities
export const selectIds = (state: State) => state.entities.ids
export const selectEntityById = (id: ID) => (state: State) => state.entities.models.get(id)
export const selectCards = (state: State) => state.cards
export const selectPaymentMethods = (state: State) => state.paymentMethods
export const selectSetHydrated = (state: Action) => state.setHydrated
export const selectSetEntities = (state: Action) => state.setEntities
export const selectSetCards = (state: Action) => state.setCards
export const selectSetPaymentMethods = (state: Action) => state.setPaymentMethods
