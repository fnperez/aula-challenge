import Tabs from '@shared/components/Tabs/Tabs'
import Text from '@shared/components/Typography/Typography'
import useBalanceSwitcher from './useBalanceSwitcher'

const BalanceSwitcher = () => {
  const presenter = useBalanceSwitcher()

  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 px-2 py-4 xl:max-w-[416px]">
      <Text as="h1" size="h2" weight="font-semibold" className="ml-6">
        Tus cobros
      </Text>
      <Tabs selectedKey={presenter.selectedKey} items={presenter.tabs} onItemChange={presenter.setSelectedKey} />
    </div>
  )
}

export default BalanceSwitcher
