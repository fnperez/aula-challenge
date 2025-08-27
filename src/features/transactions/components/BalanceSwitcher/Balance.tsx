import Icon from '@shared/components/Icon/Icon'
import Text from '@shared/components/Typography/Typography'

interface BalanceProps {
  period: 'weekly' | 'daily' | 'monthly'
}

const Balance = ({ period }: BalanceProps) => {
  // TODO: read from store using period

  return (
    <div className="flex flex-col items-center gap-4">
      <Text color="text-dark" size="xl" weight="font-extralight">
        +$35.000,
        <span className="text-[70%] font-light">00</span>
      </Text>

      <button className="primary flex items-center gap-1">
        <Icon name="analyze" /> <Text color="text-primary">Ver métricas</Text>
      </button>
    </div>
  )
}

export default Balance
