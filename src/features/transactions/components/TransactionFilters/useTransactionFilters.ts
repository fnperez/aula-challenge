import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import TransactionFiltersSchema, { Cards, Installments, Providers, type TransactionFiltersPayload } from './schema'

const defaults = {
  date: {
    from: undefined,
    to: undefined,
  },
  cards: [],
  installments: [],
  providers: [],
  amount: {
    min: undefined,
    max: undefined,
  },
}
const useTransactionFilters = () => {
  const [filtersShown, setFiltersShown] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    resetField,
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(TransactionFiltersSchema),
    defaultValues: {
      date: searchParams.has('from')
        ? {
            from: new Date(searchParams.get('from')!),
            to: searchParams.get('to') ? new Date(searchParams.get('to')!) : undefined,
          }
        : defaults.date,
      cards: searchParams.has('cards')
        ? searchParams.getAll('cards').filter((card) => Cards.includes(card))
        : defaults.cards,
      installments: searchParams.has('installments')
        ? searchParams.getAll('installments').filter((installment) => Installments.includes(installment))
        : defaults.installments,
      providers: searchParams.has('providers')
        ? searchParams.getAll('providers').filter((provider) => Providers.includes(provider))
        : defaults.providers,
      amount: searchParams.has('min')
        ? {
            min: Number(searchParams.get('min')),
            max: Number(searchParams.get('max')),
          }
        : defaults.amount,
    },
  })

  const handleDrawerOpen = useCallback(() => {
    setFiltersShown((prev) => !prev)
  }, [])

  const reset = useCallback(() => {
    resetForm(defaults, { keepValues: false, keepDefaultValues: false })
  }, [resetForm])
  const resetDate = useCallback(() => resetField('date', { defaultValue: defaults.date }), [resetField])
  const resetCards = useCallback(() => resetField('cards', { defaultValue: defaults.cards }), [resetField])
  const resetInstallments = useCallback(
    () => resetField('installments', { defaultValue: defaults.installments }),
    [resetField],
  )
  const resetAmount = useCallback(() => resetField('amount', { defaultValue: defaults.amount }), [resetField])
  const resetProviders = useCallback(() => resetField('providers', { defaultValue: defaults.providers }), [resetField])

  const onSubmit = useCallback(
    (payload: TransactionFiltersPayload) => {
      const params: Record<string, string | string[]> = {
        ...(payload.date?.from && { from: format(payload.date.from, 'yyyy-MM-dd') }),
        ...(payload.date?.to && { to: format(payload.date.to, 'yyyy-MM-dd') }),
        ...(payload.cards?.length ? { cards: payload.cards } : {}),
        ...(payload.installments?.length ? { installments: payload.installments } : {}),
        ...(payload.providers?.length ? { providers: payload.providers } : {}),
        ...(!!payload.amount?.min && { min: payload.amount.min.toString(10) }),
        ...(payload.amount?.max && { max: payload.amount.max.toString(10) }),
      }

      setSearchParams(params)
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
      },
      filtersShown,
      cardsOptions: Cards,
      installmentsOptions: Installments,
      providerOptions: Providers,
      resetDate,
      resetCards,
      resetInstallments,
      resetAmount,
      resetProviders,
      handleDrawerOpen,
      onSubmit: handleSubmit(onSubmit),
    }),
    [
      control,
      filtersShown,
      handleDrawerOpen,
      handleSubmit,
      isDirty,
      isValid,
      onSubmit,
      reset,
      resetAmount,
      resetCards,
      resetDate,
      resetInstallments,
      resetProviders,
    ],
  )
}

export default useTransactionFilters
