import AppConfig from '@core/config/app'
import * as yup from 'yup'

export const Installments = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '6', value: '6' },
  { label: '12', value: '12' },
]

const TransactionFiltersSchema = yup.object({
  date: yup
    .object({
      from: yup
        .date()
        .min(AppConfig.filters.date.min)
        .when([], {
          is: (_: unknown, ctx: { parent?: { from: Date; to: Date } }) => !!ctx?.parent?.to || !!ctx?.parent?.from,
          then: (s) => s.required('from is required when date is provided'),
          otherwise: (s) => s.notRequired(),
        }),
      to: yup.date().max(AppConfig.filters.date.max).notRequired(),
    })
    .notRequired()
    .nullable(),

  cards: yup.array(yup.string().required()),
  paymentMethods: yup.array(yup.string().required()),
  installments: yup.array(yup.string().required()),
  amount: yup
    .object({
      min: yup
        .number()
        .min(AppConfig.filters.amount.min)
        .when([], {
          is: (_: unknown, ctx: { parent?: { min: number; max: number } }) => !!ctx?.parent?.min || !!ctx?.parent?.max,
          then: (s) => s.required('Min is required when amount is provided'),
          otherwise: (s) => s.notRequired(),
        }),
      max: yup.number().max(AppConfig.filters.amount.max).notRequired(),
    })
    .notRequired()
    .nullable(),
})

export type TransactionFiltersPayload = yup.InferType<typeof TransactionFiltersSchema>

export default TransactionFiltersSchema
