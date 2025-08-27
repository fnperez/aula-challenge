import { Virtuoso } from 'react-virtuoso'
import Icon from '@shared/components/Icon/Icon'
import Skeleton from '@shared/components/Skeleton/Skeleton'
import Text from '@shared/components/Typography/Typography'
import TransactionItem from './TransactionItem/TransactionItem'
import useTransactionList from './useTransactionList'

const TransactionList = () => {
  const presenter = useTransactionList()

  if (!presenter.hydrated) {
    return Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)
  }

  return presenter.isEmpty ? (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <Icon name="search-placeholder" size={72} />
      <Text color="text-neutral" weight="font-thin">
        No hay resultados que mostrar. Podés probar usando los filtros.
      </Text>
    </div>
  ) : (
    <Virtuoso
      data={presenter.data}
      computeItemKey={(item) => item}
      itemContent={(_, id) => <TransactionItem id={id} />}
    />
  )
}

export default TransactionList
