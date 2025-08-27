import { MemoryRouter } from 'react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Balance from './Balance'

// Mock formatARSParts so tests are stable
vi.mock('@shared/utils/currency', () => ({
  formatARSParts: (amount: number) => {
    const [int, decimals] = amount.toFixed(2).split('.')
    return { int, decimals }
  },
}))

// Mock Icon so it doesn't break the render
vi.mock('@shared/components/Icon/Icon', () => ({
  default: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}))

// Mock Text just to simplify snapshot/testing
vi.mock('@shared/components/Typography/Typography', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

describe('Balance', () => {
  it('renders amount formatted with int and decimals', () => {
    render(
      <MemoryRouter>
        <Balance amount={1234.56} />
      </MemoryRouter>,
    )

    // "$ 1234,56" but with custom formatting
    expect(screen.getByText(/1234,/)).toBeInTheDocument()
    expect(screen.getByText(/56/)).toBeInTheDocument()
  })

  it('renders link to metrics with icon and text', () => {
    render(
      <MemoryRouter>
        <Balance amount={100} />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: /Ver métricas/i })
    expect(link).toHaveAttribute('href', '/metrics')
    expect(screen.getByTestId('icon')).toHaveTextContent('analyze')
  })
})
