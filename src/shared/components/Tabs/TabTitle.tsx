import { memo, useCallback } from 'react'
import Icon from '@shared/components/Icon/Icon'
import Text from '@shared/components/Typography/Typography'

export interface TabTitleProps<TKey> {
  id: TKey
  selected: boolean
  title: string
  onItemChange: (key: TKey) => void
}

const TabTitle = <TKey extends string>({ id, title, selected, onItemChange }: TabTitleProps<TKey>) => {
  const handleClick = useCallback(() => onItemChange(id), [id, onItemChange])

  return (
    <button className="flex flex-1 flex-col items-center gap-1" onClick={handleClick}>
      <Text weight={selected ? 'font-semibold' : 'font-thin'} color="text-neutral-400">
        {title}
      </Text>
      {selected && <Icon name="dot" size={8} />}
    </button>
  )
}

export default memo(TabTitle) as typeof TabTitle
