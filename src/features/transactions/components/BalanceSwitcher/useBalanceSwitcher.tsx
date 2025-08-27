import { useState } from 'react'
import Balance from './Balance'

const TabsOptions = [
  {
    key: 'daily',
    title: 'Diario',
    children: <Balance period="daily" />,
  },
  {
    key: 'weekly',
    title: 'Semanal',
    children: <Balance period="weekly" />,
  },
  {
    key: 'monthly',
    title: 'Mensual',
    children: <Balance period="monthly" />,
  },
] as const

type Keys = 'daily' | 'weekly' | 'monthly'

const useBalanceSwitcher = () => {
  const [selectedKey, setSelectedKey] = useState<Keys>('weekly')

  return {
    selectedKey,
    setSelectedKey,
    options: TabsOptions,
  }
}

export default useBalanceSwitcher
