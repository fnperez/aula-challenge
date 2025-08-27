import type { State } from '@core/stores/transactions/types'
import type { FilterParams } from '@core/types/filter.types'
import { isSameDay, isWithinInterval, parseISO, startOfMonth, startOfWeek } from 'date-fns'

export const selectBalance = (state: State) => {
  const today = new Date()
  const weekStart = startOfWeek(today)
  const monthStart = startOfMonth(today)

  const balance = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  }

  for (const tx of state.entities.models.values()) {
    const txDate = new Date(tx.createdAt)

    // Daily
    if (isSameDay(txDate, today)) {
      balance.daily += tx.amount
    }

    // Weekly
    if (txDate >= weekStart) {
      balance.weekly += tx.amount
    }

    // Monthly
    if (txDate >= monthStart) {
      balance.monthly += tx.amount
    }
  }

  return balance
}

export const selectTransactionFiltered = (params: FilterParams) => (state: State) => {
  const ids = []

  for (const tx of state.entities.models.values()) {
    const txDate = parseISO(tx.createdAt)

    // Date range
    if (params.from || params.to) {
      const from = params.from ? new Date(params.from) : new Date(-8640000000000000)
      const to = params.to ? new Date(params.to) : new Date(8640000000000000)

      if (!isWithinInterval(txDate, { start: from, end: to })) continue
    }

    // Cards
    if (params.cards.length && !params.cards.includes(tx.card)) {
      continue
    }

    // Payment Methods
    if (params.paymentMethods.length && !params.paymentMethods.includes(tx.paymentMethod)) {
      continue
    }

    // Installments
    if (params.installments.length && !params.installments.includes(tx.installments.toString(10))) {
      continue
    }

    // Amount
    if (params.min !== undefined && tx.amount < params.min) {
      continue
    }
    if (params.max !== undefined && tx.amount > params.max) {
      continue
    }

    ids.push(tx.id)
  }

  return ids
}
