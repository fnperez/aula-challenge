import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import AppConfig from '@core/config/app'
import { selectCards, selectPaymentMethods } from '@core/stores/transactions/selectors'
import useTransactionsStore from '@core/stores/transactions/store'
import { yupResolver } from '@hookform/resolvers/yup'
import TransactionFiltersSchema, { Installments, type TransactionFiltersPayload } from './schema'

export const buildSearchParams = (payload: TransactionFiltersPayload) => ({
  ...(payload.date?.from && { from: payload.date.from.toISOString().slice(0, 10) }),
  ...(payload.date?.to && { to: payload.date.to.toISOString().slice(0, 10) }),
  ...(payload.cards?.length ? { cards: payload.cards } : {}),
  ...(payload.installments?.length ? { installments: payload.installments } : {}),
  ...(payload.paymentMethods?.length ? { paymentMethods: payload.paymentMethods } : {}),
  ...(payload.amount?.min !== undefined && { min: payload.amount.min.toString(10) }),
  ...(payload.amount?.max && { max: payload.amount.max.toString(10) }),
})

const defaults = {
  date: {
    from: undefined,
    to: undefined,
  },
  cards: [] as string[],
  installments: [] as string[],
  paymentMethods: [] as string[],
  amount: {
    min: undefined,
    max: undefined,
  },
}

const useTransactionFilters = () => {
  const [filtersShown, setFiltersShown] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const cards = useTransactionsStore(selectCards)
  const paymentMethods = useTransactionsStore(selectPaymentMethods)

  const formValues = useMemo(
    () => ({
      date: searchParams.has('from')
        ? {
            from: new Date(searchParams.get('from')!),
            to: searchParams.get('to') ? new Date(searchParams.get('to')!) : undefined,
          }
        : defaults.date,
      cards: searchParams.has('cards') ? searchParams.getAll('cards') : defaults.cards,
      paymentMethods: searchParams.has('paymentMethods')
        ? searchParams.getAll('paymentMethods')
        : defaults.paymentMethods,
      installments: searchParams.has('installments') ? searchParams.getAll('installments') : defaults.installments,
      amount: searchParams.has('min')
        ? {
            min: Number(searchParams.get('min')),
            max: Number(searchParams.get('max')),
          }
        : defaults.amount,
    }),
    [searchParams],
  )

  const filtersApplied =
    searchParams.has('from') ||
    searchParams.has('cards') ||
    searchParams.has('paymentMethods') ||
    searchParams.has('installments') ||
    searchParams.has('min') ||
    searchParams.has('max')

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    resetField,
    reset: resetForm,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(TransactionFiltersSchema),
    defaultValues: formValues,
  })

  const handleDrawerOpen = useCallback(() => {
    setFiltersShown((prev) => !prev)
  }, [])

  const reset = useCallback(() => {
    resetForm(defaults, { keepValues: false, keepDefaultValues: false })
  }, [resetForm])
  const resetDate = useCallback(() => resetField('date', { defaultValue: defaults.date }), [resetField])
  const resetCards = useCallback(() => resetField('cards', { defaultValue: defaults.cards }), [resetField])
  const resetAmount = useCallback(() => resetField('amount', { defaultValue: defaults.amount }), [resetField])
  const resetInstallments = useCallback(
    () => resetField('installments', { defaultValue: defaults.installments }),
    [resetField],
  )
  const resetPaymentMethods = useCallback(
    () => resetField('paymentMethods', { defaultValue: defaults.paymentMethods }),
    [resetField],
  )

  const onSubmit = useCallback(
    (payload: TransactionFiltersPayload) => {
      setSearchParams(buildSearchParams(payload))
      setFiltersShown(false)
    },
    [setSearchParams],
  )

  return useMemo(
    () => ({
      form: {
        control,
        isDirty,
        isValid,
        reset,
        filtersApplied,
      },
      configs: {
        dateMax: AppConfig.filters.date.max,
        dateMin: AppConfig.filters.date.min,
        amountMax: AppConfig.filters.amount.max,
        amountMin: AppConfig.filters.amount.min,
      },
      filtersShown,
      cardsOptions: cards,
      paymentMethodOptions: paymentMethods,
      installmentOptions: Installments,
      resetInstallments,
      resetDate,
      resetCards,
      resetAmount,
      resetPaymentMethods,
      handleDrawerOpen,
      onSubmit: handleSubmit(onSubmit),
    }),
    [
      cards,
      control,
      filtersApplied,
      filtersShown,
      handleDrawerOpen,
      handleSubmit,
      isDirty,
      isValid,
      onSubmit,
      paymentMethods,
      reset,
      resetAmount,
      resetCards,
      resetDate,
      resetInstallments,
      resetPaymentMethods,
    ],
  )
}

export default useTransactionFilters
