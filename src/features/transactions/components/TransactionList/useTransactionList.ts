import { useSearchParams } from 'react-router'
import { selectHydrated } from '@core/stores/transactions/selectors'
import useTransactionsStore from '@core/stores/transactions/store'
import { selectTransactionFiltered } from '@features/transactions/store/selectors'
import { useShallow } from 'zustand/react/shallow'

function parseSearchParams(search: URLSearchParams) {
  return {
    from: search.get('from') || undefined,
    to: search.get('to') || undefined,
    cards: search.get('cards')?.split(',') ?? [],
    paymentMethods: search.get('paymentMethods')?.split(',') ?? [],
    installments: search.get('installments')?.split(',') ?? [],
    min: search.get('min') ? Number(search.get('min')) : undefined,
    max: search.get('max') ? Number(search.get('max')) : undefined,
  }
}

const useTransactionList = () => {
  const [searchParams] = useSearchParams()
  const hydrated = useTransactionsStore(selectHydrated)
  const data = useTransactionsStore(useShallow(selectTransactionFiltered(parseSearchParams(searchParams))))

  return {
    data: data,
    hydrated,
    isEmpty: data.length === 0,
  }
}

export default useTransactionList
