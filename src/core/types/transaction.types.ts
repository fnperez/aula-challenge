export interface Transaction {
  id: string
  amount: number
  card: 'visa' | 'mastercard' | 'amex'
  installments: number
  createdAt: string
  updatedAt: string
  paymentMethod: 'link' | 'qr' | 'mpos' | 'pospro'
}
