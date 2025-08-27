import { Outlet } from 'react-router'
import Drawer from '@shared/components/Drawer/Drawer'
import Icon from '@shared/components/Icon/Icon'
import Menu from '@shared/components/Menu/Menu'
import UserAvatar from '@shared/components/UserAvatar/UserAvatar'
import classNames from 'classnames'
import useLayout from './useLayout'

const Layout = () => {
  const { isOpen, handleClick } = useLayout()

  return (
    <div id="dashboard" className="relative flex h-[100vh] w-[100vw] overflow-x-hidden">
      <Drawer
        visible={isOpen}
        onClose={handleClick}
        closeOnBlur
        className="max-w-[280px] bg-white md:relative md:translate-x-0 xl:max-w-[364px]"
      >
        <button
          onClick={handleClick}
          className="absolute top-8 right-4 text-sm text-neutral-200 md:hidden"
          aria-label="Cerrar menu"
        >
          <Icon name="menu" />
        </button>
        <Menu />
      </Drawer>

      <div
        className={classNames(
          'flex max-w-full flex-1 flex-col bg-neutral-200 transition-all duration-200',
          'md:translate-x-0',
          isOpen ? 'translate-x-[240px]' : '-translate-x-0',
        )}
      >
        <header className="relative flex w-full items-center rounded-bl-[32px] bg-white px-2 py-4 shadow md:rounded-none">
          <UserAvatar name="Facundo Perez" src="/avatar.jpg" className="hidden md:flex" />
          <button className="p-2 md:hidden" onClick={handleClick} aria-label="Abrir menu">
            <Icon name="menu" />
          </button>

          <img src="/minimal-logo.png" alt="Uala logo" className="mx-auto md:hidden" width={80} />
        </header>

        <main className="flex flex-1 px-2 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
