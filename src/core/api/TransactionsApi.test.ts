import { describe, expect, it, vi } from 'vitest'
import { ApiClient } from './ApiClient'
import type { TransactionsFetchResponse } from './data.types'
import { fetchAll } from './TransactionsApi'

// --- Mock ApiClient module ---
vi.mock('./ApiClient', () => ({
  ApiClient: {
    get: vi.fn(),
  },
}))

// Use vi.mocked to type ApiClient properly
const mockedApiClient = vi.mocked(ApiClient, { deep: true })

describe('TransactionsApi', () => {
  describe('fetchAll', () => {
    it('returns data when response status is 200', async () => {
      const mockData: TransactionsFetchResponse = {
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

      mockedApiClient.get.mockResolvedValueOnce({
        status: 200,
        data: mockData,
      })

      const result = await fetchAll()

      expect(result).toEqual(mockData)
      expect(mockedApiClient.get).toHaveBeenCalledWith('transactions.json')
    })

    it('throws an error when status is not 200', async () => {
      mockedApiClient.get.mockResolvedValueOnce({
        status: 500,
        data: {} as TransactionsFetchResponse,
      })

      await expect(fetchAll()).rejects.toThrow('Request failed.')
      expect(mockedApiClient.get).toHaveBeenCalledWith('transactions.json')
    })
  })
})
