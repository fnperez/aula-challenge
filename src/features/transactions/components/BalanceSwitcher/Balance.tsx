import '@core/stores/transactions/selectors'
import { NavLink } from 'react-router'
import Icon from '@shared/components/Icon/Icon'
import Text from '@shared/components/Typography/Typography'
import { formatARSParts } from '@shared/utils/currency'

interface BalanceProps {
  amount: number
}

const Balance = ({ amount }: BalanceProps) => {
  const { int, decimals } = formatARSParts(amount)

  return (
    <div className="flex flex-col items-center gap-4">
      <Text color="text-dark" size="xl" weight="font-extralight">
        +$ {int},<span className="text-[70%] font-light">{decimals}</span>
      </Text>

      <NavLink to="/metrics" className="btn-primary flex items-center gap-1">
        <Icon name="analyze" /> <Text color="text-primary">Ver métricas</Text>
      </NavLink>
    </div>
  )
}

export default Balance
