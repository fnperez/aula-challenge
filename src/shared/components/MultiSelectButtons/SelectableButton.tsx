import Text from '../Typography/Typography'

interface SelectableButtonProps {
  label: string
  selected: boolean
  onClick: () => void
}

const SelectableButton = ({ label, selected, onClick }: SelectableButtonProps) => (
  <button
    type="button"
    className={`primary rounded px-3 py-1 outline ${selected ? 'bg-primary-lighter' : ''}`}
    onClick={onClick}
  >
    <Text className="capitalize">{label}</Text>
    {selected && <span className="ml-1 font-bold text-red-500">×</span>}
  </button>
)

export default SelectableButton
