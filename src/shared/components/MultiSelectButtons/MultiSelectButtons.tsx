import { useCallback } from 'react'
import type { Option } from '@core/types/option.types'
import SelectableButton from './SelectableButton'

export interface MultiSelectProps {
  items: readonly Option[]
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
      newSelected = [...items.map((item) => item.value)]
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
        <SelectableButton
          key={item.value}
          label={item.label}
          selected={selected.includes(item.value)}
          onClick={() => toggleItem(item.value)}
        />
      ))}
    </div>
  )
}

export default MultiSelectButtons
