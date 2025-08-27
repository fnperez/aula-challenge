import { useCallback, useMemo, useState } from 'react'

const useDashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return useMemo(
    () => ({
      handleClick,
      isOpen,
    }),
    [handleClick, isOpen],
  )
}

export default useDashboard
