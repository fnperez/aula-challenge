import { useCallback, useMemo, useState } from 'react'
import { useTransactions } from '@core/hooks/useTransactions'

const useDashboard = () => {
  const { isLoading, error } = useTransactions()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return useMemo(
    () => ({
      error,
      isLoading,
      isOpen,
      handleClick,
    }),
    [error, handleClick, isLoading, isOpen],
  )
}

export default useDashboard
