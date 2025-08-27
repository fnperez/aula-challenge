import { useRef } from 'react'
import classNames from 'classnames'
import TabTitle from './TabTitle'

export type Item<TKey extends string> = {
  key: TKey
  title: string
  children: React.ReactElement
}

export interface TabsProps<TKey extends string> {
  items: readonly Item<TKey>[]
  selectedKey: TKey
  onItemChange: (key: TKey) => void
}

const Tabs = <TKey extends string>({ items, selectedKey, onItemChange }: TabsProps<TKey>) => {
  const indexMap = useRef(new Map(items.map((item, index) => [item.key, index])))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-2">
        {items.map((item) => (
          <TabTitle
            key={item.key}
            id={item.key}
            title={item.title}
            selected={selectedKey === item.key}
            onItemChange={onItemChange}
          />
        ))}
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${indexMap.current.get(selectedKey)! * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div key={item.key} className={classNames('w-full shrink-0')}>
              {item.children}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tabs
