import { useMemo, useState } from 'react'
import { selectHydrated } from '@core/stores/transactions/selectors.ts'
import useTransactionsStore from '@core/stores/transactions/store'
import { selectBalance } from '@features/transactions/store/selectors'
import Skeleton from '@shared/components/Skeleton/Skeleton.tsx'
import { useShallow } from 'zustand/react/shallow'
import Balance from './Balance'

type Keys = 'daily' | 'weekly' | 'monthly'

const useBalanceSwitcher = () => {
  const [selectedKey, setSelectedKey] = useState<Keys>('weekly')
  const balance = useTransactionsStore(useShallow(selectBalance))
  const hydrated = useTransactionsStore(selectHydrated)

  const tabs = useMemo(
    () => [
      {
        key: 'daily',
        title: 'Diario',
        children: hydrated ? <Balance amount={balance.daily} /> : <Skeleton simple className="h-[104px]" />,
      },
      {
        key: 'weekly',
        title: 'Semanal',
        children: hydrated ? <Balance amount={balance.weekly} /> : <Skeleton simple className="h-[104px]" />,
      },
      {
        key: 'monthly',
        title: 'Mensual',
        children: hydrated ? <Balance amount={balance.monthly} /> : <Skeleton simple className="h-[104px]" />,
      },
    ],
    [balance.daily, balance.monthly, balance.weekly, hydrated],
  )

  return useMemo(
    () => ({
      tabs,
      selectedKey,
      setSelectedKey: setSelectedKey as (key: string) => void,
    }),
    [tabs, selectedKey],
  )
}

export default useBalanceSwitcher
