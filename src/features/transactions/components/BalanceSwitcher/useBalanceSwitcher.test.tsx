import { selectBalance } from '@features/transactions/store/selectors'
import { renderHook } from '@testing-library/react'
import { vi, type Mock } from 'vitest'
import useBalanceSwitcher from './useBalanceSwitcher'

// mock Balance so we can inspect props
vi.mock('./Balance', () => ({
  default: ({ amount }: { amount: number }) => <div data-testid="balance">{amount}</div>,
}))

// spy on the selector
vi.mock('@features/transactions/store/selectors', () => ({
  selectBalance: vi.fn(),
}))

describe('useBalanceSwitcher', () => {
  it('returns balances from selector', () => {
    ;(selectBalance as Mock).mockReturnValue({ daily: 10, weekly: 20, monthly: 30 })

    const { result } = renderHook(() => useBalanceSwitcher())
    const amounts = result.current.tabs.map((t) => t.children.props.amount as number)

    expect(amounts).toEqual([10, 20, 30])
  })
})
