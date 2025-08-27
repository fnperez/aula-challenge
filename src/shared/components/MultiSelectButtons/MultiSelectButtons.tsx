import { useCallback } from 'react'
import SelectableButton from './SelectableButton'

interface MultiSelectProps {
  items: readonly string[]
  selected?: string[]

  allowAll?: boolean
  onChange: (selected: string[]) => void
}

const MultiSelectButtons = ({ items, selected = [], allowAll, onChange }: MultiSelectProps) => {
  const toggleItem = useCallback(
    (item: string) => {
      let newSelected: string[]

      if (selected.includes(item)) {
        newSelected = selected.filter((i) => i !== item)
      } else {
        newSelected = [...selected, item]
      }

      onChange(newSelected)
    },
    [onChange, selected],
  )

  const toggleAll = useCallback(() => {
    let newSelected: string[]

    if (selected.length === items.length) {
      // all already selected → clear all
      newSelected = []
    } else {
      // select all
      newSelected = [...items]
    }

    onChange(newSelected)
  }, [items, onChange, selected.length])

  return (
    <div className="flex flex-wrap gap-3">
      {allowAll && (
        <SelectableButton
          label="Todas"
          selected={selected.length === items.length && items.length > 0}
          onClick={toggleAll}
        />
      )}

      {items.map((item) => (
        <SelectableButton key={item} label={item} selected={selected.includes(item)} onClick={() => toggleItem(item)} />
      ))}
    </div>
  )
}

export default MultiSelectButtons
