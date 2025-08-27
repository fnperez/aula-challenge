import { useCallback, useState, type PropsWithChildren, type ReactElement } from 'react'
import classNames from 'classnames'
import Switch from '../Switch/Switch'
import Text from '../Typography/Typography'

export interface SwitchContainerProps extends PropsWithChildren {
  title: string
  icon?: ReactElement
  className?: string
  open?: boolean
  onClose?: () => void
}

const SwitchContainer = ({ title, icon, open = false, onClose, className, children }: SwitchContainerProps) => {
  const [isOpen, setIsOpen] = useState(open)

  const handleClose = useCallback(
    (checked: boolean) => {
      setIsOpen(checked)

      if (!checked && onClose) {
        onClose()
      }
    },
    [onClose],
  )

  return (
    <div className={classNames('flex w-full flex-col gap-4 p-4', className)}>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          {icon}
          {title && <Text weight="font-semibold">{title}</Text>}
        </div>

        <Switch checked={isOpen} onChange={handleClose} />
      </div>

      {isOpen && children}
    </div>
  )
}

export default SwitchContainer
