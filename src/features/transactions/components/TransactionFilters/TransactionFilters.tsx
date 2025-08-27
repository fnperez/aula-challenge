import type { DateRange } from 'react-day-picker'
import { Controller } from 'react-hook-form'
import RangeSlider from 'react-range-slider-input'
import Calendar from '@shared/components/Calendar/Calendar'
import Drawer from '@shared/components/Drawer/Drawer'
import Icon from '@shared/components/Icon/Icon'
import MultiSelectButtons from '@shared/components/MultiSelectButtons/MultiSelectButtons'
import Portal from '@shared/components/Portal/Portal'
import SwitchContainer from '@shared/components/SwitchContainer/SwitchContainer'
import Text from '@shared/components/Typography/Typography'
import useTransactionFilters from './useTransactionFilters'

const TransactionFilters = () => {
  const presenter = useTransactionFilters()

  return (
    <div>
      <button className="icon p-3" onClick={presenter.handleDrawerOpen}>
        <Icon name="filter" />
      </button>
      <button className="icon p-3">
        <Icon name="download" />
      </button>
      <Portal>
        <Drawer
          className="max-w-[542px]"
          visible={presenter.filtersShown}
          onClose={presenter.handleDrawerOpen}
          closeOnBlur
          position="right"
          title="Filtros"
          back
        >
          <div className="flex flex-1 flex-col px-4 py-4 md:px-8">
            <div className="flex items-center justify-between">
              <Text size="b1" weight="font-semibold">
                Todos los filtros
              </Text>
              <button onClick={presenter.form.reset}>
                <Text
                  size="b1"
                  weight={presenter.form.isDirty ? 'font-normal' : 'font-thin'}
                  color={presenter.form.isDirty ? 'text-primary' : 'text-neutral'}
                >
                  Limpiar
                </Text>
              </button>
            </div>

            <Controller
              control={presenter.form.control}
              name="date"
              render={({ field }) => (
                <SwitchContainer
                  title="Fecha"
                  icon={<Icon name="calendar" />}
                  open={!!field.value?.from}
                  onClose={presenter.resetDate}
                  className="items-center"
                >
                  <Calendar
                    mode="range"
                    selected={field.value as DateRange}
                    onSelect={field.onChange}
                    footer={
                      <div className="mt-3 flex justify-end">
                        <button className="primary outline" onClick={presenter.resetDate}>
                          <Text weight="font-[100]">Borrar</Text>
                        </button>
                      </div>
                    }
                  />
                </SwitchContainer>
              )}
            />
            <Controller
              control={presenter.form.control}
              name="cards"
              render={({ field }) => (
                <SwitchContainer
                  title="Tarjeta"
                  icon={<Icon name="card-alt" />}
                  open={!!field.value?.length}
                  onClose={presenter.resetCards}
                >
                  <MultiSelectButtons
                    items={presenter.cardsOptions}
                    selected={field.value as string[]}
                    onChange={field.onChange}
                    allowAll
                  />
                </SwitchContainer>
              )}
            />

            <Controller
              control={presenter.form.control}
              name="installments"
              render={({ field }) => (
                <SwitchContainer
                  title="Cuotas"
                  open={!!field.value?.length}
                  icon={<Icon name="program-deposit" />}
                  onClose={presenter.resetInstallments}
                >
                  <MultiSelectButtons
                    items={presenter.installmentsOptions}
                    selected={field.value as string[]}
                    onChange={field.onChange}
                    allowAll
                  />
                </SwitchContainer>
              )}
            />
            <Controller
              control={presenter.form.control}
              name="amount"
              render={({ field }) => (
                <SwitchContainer
                  title="Monto"
                  open={!!field.value?.min}
                  icon={<Icon name="commission" />}
                  onClose={presenter.resetAmount}
                >
                  <RangeSlider
                    min={0}
                    max={10000}
                    step={100}
                    thumbsDisabled={[false, false]}
                    value={[field.value?.min || 0, field.value?.max || 0]}
                    onInput={([min, max]) => field.onChange({ min, max })}
                  />
                </SwitchContainer>
              )}
            />

            <Controller
              control={presenter.form.control}
              name="providers"
              render={({ field }) => (
                <SwitchContainer
                  title="Métodos de cobro"
                  open={!!field.value?.length}
                  icon={<Icon name="categories" />}
                  onClose={presenter.resetProviders}
                >
                  <MultiSelectButtons
                    items={presenter.providerOptions}
                    selected={field.value as string[]}
                    onChange={field.onChange}
                    allowAll
                  />
                </SwitchContainer>
              )}
            />

            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button disabled={!presenter.form.isValid} className="primary filled mt-auto" onClick={presenter.onSubmit}>
              <Text>Aplicar filtros</Text>
            </button>
          </div>
        </Drawer>
      </Portal>
    </div>
  )
}

export default TransactionFilters
