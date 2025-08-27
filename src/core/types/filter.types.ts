export interface FilterParams {
  from?: string
  to?: string
  cards: string[]
  paymentMethods: string[]
  installments: string[]
  min?: number
  max?: number
}
