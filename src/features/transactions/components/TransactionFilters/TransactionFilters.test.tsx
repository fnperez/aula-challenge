import type { DrawerProps } from '@shared/components/Drawer/Drawer'
import type { MultiSelectProps } from '@shared/components/MultiSelectButtons/MultiSelectButtons'
import type { SwitchContainerProps } from '@shared/components/SwitchContainer/SwitchContainer'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TransactionFilters from './TransactionFilters'
import useTransactionFilters from './useTransactionFilters'

// 🟢 Mock shared child components so we can assert structure without heavy internals
vi.mock('@shared/components/Icon/Icon', () => ({
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}))
vi.mock('@shared/components/Typography/Typography', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))
vi.mock('@shared/components/Drawer/Drawer', () => ({
  default: ({ visible, children, onClose, title }: DrawerProps) =>
    visible ? (
      <div data-testid="drawer">
        <h2>{title}</h2>
        <button onClick={onClose}>close</button>
        {children}
      </div>
    ) : null,
}))
vi.mock('@shared/components/Calendar/Calendar', () => ({
  default: () => <div data-testid="calendar" />,
}))
vi.mock('@shared/components/MultiSelectButtons/MultiSelectButtons', () => ({
  default: ({ items }: MultiSelectProps) => <div data-testid="multiselect">{items.map((i) => i.label).join(',')}</div>,
}))
vi.mock('@shared/components/Portal/Portal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
vi.mock('@shared/components/SwitchContainer/SwitchContainer', () => ({
  default: ({ title, children }: SwitchContainerProps) => <div data-testid={`switch-${title}`}>{children}</div>,
}))
vi.mock('react-range-slider-input', () => ({
  __esModule: true,
  default: () => <div data-testid="slider" />,
}))

vi.mock('react-hook-form', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    Controller: ({ render }: any) => render({ field: { value: undefined, onChange: vi.fn() } }),
  }
})

// 🟢 Mock the presenter hook
vi.mock('./useTransactionFilters', () => ({
  default: vi.fn(),
}))

describe('TransactionFilters', () => {
  const mockPresenter = {
    handleDrawerOpen: vi.fn(),
    filtersShown: true,
    resetDate: vi.fn(),
    resetCards: vi.fn(),
    resetInstallments: vi.fn(),
    resetAmount: vi.fn(),
    resetPaymentMethods: vi.fn(),
    configs: { dateMin: new Date(), dateMax: new Date(), amountMin: 0, amountMax: 1000 },
    cardsOptions: [{ label: 'Visa', value: 'visa' }],
    installmentOptions: [{ label: '3', value: '3' }],
    paymentMethodOptions: [{ label: 'QR', value: 'qr' }],
    onSubmit: vi.fn(),
    form: {
      control: {},
      reset: vi.fn(),
      isDirty: false,
      isValid: true,
      filtersApplied: true,
    },
  }

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vi.mocked(useTransactionFilters).mockReturnValue(mockPresenter)
  })

  it('renders filter and download buttons', () => {
    render(<TransactionFilters />)
    expect(screen.getByTestId('icon-filter')).toBeInTheDocument()
    expect(screen.getByTestId('icon-download')).toBeInTheDocument()
  })

  it('shows dot when filtersApplied is true', () => {
    render(<TransactionFilters />)
    expect(screen.getByTestId('filters-dot')).toBeInTheDocument()
  })

  it('renders Drawer when filtersShown is true', () => {
    render(<TransactionFilters />)
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('calls form.reset when clicking "Limpiar"', () => {
    render(<TransactionFilters />)
    fireEvent.click(screen.getByText('Limpiar'))
    expect(mockPresenter.form.reset).toHaveBeenCalled()
  })

  it('calls onSubmit when clicking "Aplicar filtros"', () => {
    render(<TransactionFilters />)
    fireEvent.click(screen.getByText('Aplicar filtros'))
    expect(mockPresenter.onSubmit).toHaveBeenCalled()
  })

  it('renders all SwitchContainers with children', () => {
    render(<TransactionFilters />)
    expect(screen.getByTestId('switch-Fecha')).toBeInTheDocument()
    expect(screen.getByTestId('switch-Tarjeta')).toBeInTheDocument()
    expect(screen.getByTestId('switch-Cuotas')).toBeInTheDocument()
    expect(screen.getByTestId('switch-Monto')).toBeInTheDocument()
    expect(screen.getByTestId('switch-Métodos de cobro')).toBeInTheDocument()
  })
})
