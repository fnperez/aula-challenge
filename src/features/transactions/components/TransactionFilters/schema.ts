import * as yup from 'yup'

export const Cards = ['visa', 'mastercard', 'amex']
export const Installments = ['1', '2', '3', '6', '12']
export const Providers = ['link', 'qr', 'm-pos', 'pos-pro']

const TransactionFiltersSchema = yup.object({
  date: yup
    .object({
      from: yup.date().when([], {
        is: (val: unknown, ctx: { parent?: { from: Date; to: Date } }) => !!ctx?.parent?.to || !!ctx?.parent?.from,
        then: (s) => s.required('from is required when date is provided'),
        otherwise: (s) => s.notRequired(),
      }),
      to: yup.date().notRequired(),
    })
    .notRequired()
    .nullable(),

  cards: yup.array(yup.string().required().oneOf(Cards)),
  installments: yup.array(yup.string().required().oneOf(Installments)),
  providers: yup.array(yup.string().required().oneOf(Providers)),

  amount: yup
    .object({
      min: yup
        .number()
        .min(0)
        .when([], {
          is: (val: unknown, ctx: { parent?: { min: number; max: number } }) =>
            !!ctx?.parent?.min || !!ctx?.parent?.max,
          then: (s) => s.required('Min is required when amount is provided'),
          otherwise: (s) => s.notRequired(),
        }),
      max: yup.number().notRequired(),
    })
    .notRequired()
    .nullable(),
})

export type TransactionFiltersPayload = yup.InferType<typeof TransactionFiltersSchema>

export default TransactionFiltersSchema
