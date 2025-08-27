import { type PropsWithChildren } from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import Icon from '../Icon/Icon'
import Text from '../Typography/Typography'

export interface DrawerProps extends PropsWithChildren {
  position?: 'left' | 'right'
  visible?: boolean
  closeOnBlur?: boolean
  className?: string
  title?: string
  back?: boolean
  onClose: () => void
}

const Backdrop = ({ hidden, children, onClick }: PropsWithChildren<{ hidden: boolean; onClick?: VoidFunction }>) => (
  <div
    onClick={onClick}
    className={classNames(
      'absolute top-0 right-0 bottom-0 left-0 z-1 bg-black/60 opacity-0 transition-opacity duration-200',
      {
        hidden,
        'opacity-60': !hidden,
      },
    )}
  >
    {children}
  </div>
)

const Drawer = ({
  children,
  visible,
  closeOnBlur = true,
  title,
  back,
  position = 'left',
  className,
  onClose,
}: DrawerProps) => {
  return (
    <>
      <Backdrop hidden={!visible} onClick={closeOnBlur ? onClose : undefined} />

      <aside
        className={twMerge(
          classNames(
            'absolute z-1 flex h-full w-full flex-col overflow-auto bg-neutral-200 shadow-xl transition-all duration-200',
            visible ? 'translate-x-0' : '',
            position === 'right' ? 'right-0' : 'left-0',
            className,
            {
              'translate-x-[100%]': !visible && position === 'right',
              '-translate-x-[100%]': !visible && position === 'left',
            },
          ),
        )}
      >
        {(back || title) && (
          <div className="flex items-center md:p-4">
            {back && (
              <button className="icon" onClick={onClose}>
                <Icon name="left" size={24} />
              </button>
            )}
            {title && (
              <Text size="b1" weight="font-semibold">
                {title}
              </Text>
            )}
          </div>
        )}

        {children}
      </aside>
    </>
  )
}

export default Drawer
