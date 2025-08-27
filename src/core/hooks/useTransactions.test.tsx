import type { TransactionsFetchResponse } from '@core/api/data.types'
import { fetchAll } from '@core/api/TransactionsApi'
import useTransactionsStore from '@core/stores/transactions/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTransactions } from './useTransactions'

// Mock the API
vi.mock('@core/api/TransactionsApi', () => ({
  fetchAll: vi.fn(),
}))

// Helper to wrap hook with QueryClientProvider
function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('useTransactions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useTransactionsStore.setState({
      hydrated: false,
      entities: { ids: [], models: new Map() },
      cards: [],
      paymentMethods: [],
    })
  })

  it('fetches transactions and updates the store', async () => {
    const mockResponse: TransactionsFetchResponse = {
      transactions: [
        {
          id: '1',
          amount: 100,
          card: 'visa',
          installments: 1,
          createdAt: '2025-08-27T10:00:00Z',
          updatedAt: '2025-08-27T11:00:00Z',
          paymentMethod: 'qr',
        },
      ],
      metadata: {
        cards: [{ value: 'visa', label: 'Visa' }],
        paymentMethods: [{ value: 'qr', label: 'QR' }],
      },
    }

    vi.mocked(fetchAll).mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useTransactions(), { wrapper })

    // Wait for React Query to resolve
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // Assert API was called
    expect(fetchAll).toHaveBeenCalled()

    // Assert Zustand store was updated
    const state = useTransactionsStore.getState()
    expect(state.hydrated).toBe(true)
    expect(state.entities.ids).toEqual(['1'])
    expect(state.cards).toEqual(mockResponse.metadata.cards)
    expect(state.paymentMethods).toEqual(mockResponse.metadata.paymentMethods)
  })
})
