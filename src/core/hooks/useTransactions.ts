// shared/hooks/useTransactions.ts
import { useEffect } from 'react'
import { fetchAll } from '@core/api/TransactionsApi'
import {
  selectSetCards,
  selectSetEntities,
  selectSetHydrated,
  selectSetPaymentMethods,
} from '@core/stores/transactions/selectors'
import useTransactionsStore from '@core/stores/transactions/store'
import { useQuery } from '@tanstack/react-query'

export function useTransactions() {
  const setHydrated = useTransactionsStore(selectSetHydrated)
  const setEntities = useTransactionsStore(selectSetEntities)
  const setCards = useTransactionsStore(selectSetCards)
  const setPaymentMethods = useTransactionsStore(selectSetPaymentMethods)

  const query = useQuery({
    queryKey: ['transactions'],
    staleTime: Infinity,
    queryFn: fetchAll,
  })

  useEffect(() => {
    if (query.data) {
      setEntities(query.data.transactions)
      setCards(query.data.metadata.cards)
      setPaymentMethods(query.data.metadata.paymentMethods)

      setHydrated(true)
    }
  }, [query.data, setCards, setEntities, setHydrated, setPaymentMethods])

  return query
}
