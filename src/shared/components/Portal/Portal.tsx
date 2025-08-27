import { useEffect, useState, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, portalID }: PropsWithChildren<{ portalID?: string }>) => {
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<Element | null>(null)

  useEffect(() => {
    const el = document.getElementById(portalID || 'dashboard')
    setContainer(el)
    setMounted(true)
  }, [portalID])

  if (!mounted || !container) return null

  return createPortal(children, container)
}

export default Portal
