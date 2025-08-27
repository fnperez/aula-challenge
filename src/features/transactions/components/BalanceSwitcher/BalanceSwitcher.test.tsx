import type { Item, TabsProps } from '@shared/components/Tabs/Tabs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi, type Mock } from 'vitest'
import BalanceSwitcher from './BalanceSwitcher'
import useBalanceSwitcher from './useBalanceSwitcher'

vi.mock('@shared/components/Tabs/Tabs', () => ({
  default: ({ selectedKey, items, onItemChange }: TabsProps<string>) => (
    <div data-testid="tabs">
      <div data-testid="selected">{selectedKey}</div>
      {items.map((item: Item<string>) => (
        <button key={item.key} onClick={() => onItemChange(item.key)}>
          {item.title}
        </button>
      ))}
    </div>
  ),
}))

// Mock hook
vi.mock('./useBalanceSwitcher', () => ({
  default: vi.fn(),
}))

describe('BalanceSwitcher', () => {
  it('renders the title and passes correct props to Tabs', () => {
    const setSelectedKey = vi.fn()
    ;(useBalanceSwitcher as Mock).mockReturnValue({
      selectedKey: 'daily',
      setSelectedKey,
      tabs: [
        { key: 'daily', title: 'Diario' },
        { key: 'weekly', title: 'Semanal' },
        { key: 'monthly', title: 'Mensual' },
      ],
    })

    render(<BalanceSwitcher />)

    // Title is rendered
    expect(screen.getByText('Tus cobros')).toBeInTheDocument()

    // Tabs selected key is rendered
    expect(screen.getByTestId('selected')).toHaveTextContent('daily')

    // Clicking a tab should call setSelectedKey
    fireEvent.click(screen.getByText('Semanal'))
    expect(setSelectedKey).toHaveBeenCalledWith('weekly')
  })
})
