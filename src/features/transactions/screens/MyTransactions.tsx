import BalanceSwitcher from '@features/transactions/components/BalanceSwitcher/BalanceSwitcher'
import TransactionFilters from '@features/transactions/components/TransactionFilters/TransactionFilters'
import TransactionList from '@features/transactions/components/TransactionList/TransactionList'
import Text from '@shared/components/Typography/Typography'

const MyTransactions = () => {
  return (
    <section className="mx-auto flex w-full max-w-[440px] flex-col gap-6 xl:max-w-[572px]">
      <BalanceSwitcher />
      <section className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between pl-2">
          <Text>Historial de transacciones</Text>

          <TransactionFilters />
        </div>

        <TransactionList />
      </section>
    </section>
  )
}

export default MyTransactions
