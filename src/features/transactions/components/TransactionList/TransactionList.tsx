import { Virtuoso } from 'react-virtuoso'
import Icon from '@shared/components/Icon/Icon'
import Text from '@shared/components/Typography/Typography'
import TransactionItem from './TransactionItem/TransactionItem'
import useTransactionList from './useTransactionList'

const TransactionList = () => {
  const presenter = useTransactionList()

  return presenter.isEmpty ? (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <Icon name="search-placeholder" size={72} />
      <Text color="text-neutral" weight="font-thin">
        No hay resultados que mostrar. Podés probar usando los filtros.
      </Text>
    </div>
  ) : (
    <Virtuoso data={presenter.data} computeItemKey={(item) => item} itemContent={(_, item) => <TransactionItem />} />
  )
}

export default TransactionList
