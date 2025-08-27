import { useCallback } from 'react'
import { NavLink, type NavLinkRenderProps } from 'react-router'
import Icon from '@shared/components/Icon/Icon'
import Text from '@shared/components/Typography/Typography'
import classNames from 'classnames'

const Menu = () => {
  const isActive = useCallback(({ isActive }: NavLinkRenderProps) => {
    return classNames(
      'p-3 flex gap-2 items-center hover:text-primary hover:bg-border-neutral transition-colors duration-200 rounded',
      {
        'text-primary bg-border-neutral': isActive,
      },
    )
  }, [])

  return (
    <div className="flex h-full flex-col px-2 py-4 pb-8">
      <img src="/logo.png" alt="Ualá Logo" width={120} className="mb-5" />
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={isActive}>
          {({ isActive }) => (
            <>
              <Icon name="home" className={isActive ? 'fill-primary-light' : 'fill-neutral-400'} />
              <Text>Home</Text>
            </>
          )}
        </NavLink>
        <NavLink to="/metrics" className={isActive}>
          {({ isActive }) => (
            <>
              <Icon name="metrics" className={isActive ? 'fill-primary-light' : 'fill-neutral-400'} size={20} />
              <Text>Metrics</Text>
            </>
          )}
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6">
        <Text size="h2" weight="font-semibold">
          Descargá la app desde
        </Text>
        <div className="flex flex-col items-center gap-4">
          <img src="/store_android.jpg" alt="Descargá la app desde android" className="w-[136px] lg:w-[176px]" />
          <img src="/store_ios.jpg" alt="Descargá la app desde ios" className="w-[136px] lg:w-[176px]" />
        </div>
      </div>
    </div>
  )
}

export default Menu
