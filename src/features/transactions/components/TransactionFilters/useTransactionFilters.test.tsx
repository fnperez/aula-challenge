import { MemoryRouter } from 'react-router'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Installments } from './schema'
import useTransactionFilters, { buildSearchParams } from './useTransactionFilters'

// Mock selectors + store
vi.mock('@core/stores/transactions/store', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  default: vi.fn((cp) => cp()), // not used directly, we mock selectors
}))
vi.mock('@core/stores/transactions/selectors', () => ({
  selectCards: () => [{ label: 'Visa', value: 'visa' }],
  selectPaymentMethods: () => [{ label: 'QR', value: 'qr' }],
}))
vi.mock('@core/config/app', () => ({
  __esModule: true,
  default: {
    filters: {
      date: { min: new Date('2020-01-01'), max: new Date('2030-01-01') },
      amount: { min: 0, max: 10000 },
    },
  },
}))

const mockResetField = vi.fn()
const mockReset = vi.fn()

vi.mock('react-hook-form', () => {
  return {
    __esModule: true,
    useForm: () => ({
      control: {},
      formState: { isDirty: false, isValid: true },
      resetField: mockResetField,
      reset: mockReset,
      handleSubmit: (cb: (params: unknown) => void) => (data?: unknown) => cb(data),
    }),
  }
})

// Helper wrapper so hook can use useSearchParams
function wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('useTransactionFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('provides default values when no search params', () => {
    const { result } = renderHook(() => useTransactionFilters(), { wrapper })

    expect(result.current.form.filtersApplied).toBe(false)
    expect(result.current.cardsOptions).toEqual([{ label: 'Visa', value: 'visa' }])
    expect(result.current.paymentMethodOptions).toEqual([{ label: 'QR', value: 'qr' }])
    expect(result.current.installmentOptions).toEqual(Installments) // from Installments
  })

  it('detects filtersApplied when params exist', () => {
    const WrapperWithParams = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/?from=2025-08-15&cards=visa']}>{children}</MemoryRouter>
    )

    const { result } = renderHook(() => useTransactionFilters(), { wrapper: WrapperWithParams })

    expect(result.current.form.filtersApplied).toBeTruthy()
  })

  it('toggles drawer visibility', () => {
    const { result } = renderHook(() => useTransactionFilters(), { wrapper })

    expect(result.current.filtersShown).toBe(false)
    act(() => result.current.handleDrawerOpen())
    expect(result.current.filtersShown).toBe(true)
    act(() => result.current.handleDrawerOpen())
    expect(result.current.filtersShown).toBe(false)
  })

  it('resets fields with reset helpers', () => {
    const { result } = renderHook(() => useTransactionFilters(), { wrapper })

    result.current.form.reset()
    result.current.resetDate()
    result.current.resetCards()
    result.current.resetAmount()
    result.current.resetInstallments()
    result.current.resetPaymentMethods()

    expect(mockResetField).toHaveBeenCalledTimes(5)
    expect(mockReset).toHaveBeenCalled()
  })

  it('builds correct params', () => {
    const payload = {
      date: { from: new Date('2025-08-10'), to: new Date('2025-08-15') },
      cards: ['visa'],
      paymentMethods: ['qr'],
      installments: ['3'],
      amount: { min: 100, max: 500 },
    }
    const result = buildSearchParams(payload)

    expect(result).toEqual({
      from: '2025-08-10',
      to: '2025-08-15',
      cards: ['visa'],
      paymentMethods: ['qr'],
      installments: ['3'],
      min: '100',
      max: '500',
    })
  })
})
