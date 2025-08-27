import { DayPicker, type DayPickerProps } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import { format } from 'date-fns'

const Calendar = (props: DayPickerProps) => (
  <DayPicker
    navLayout="around"
    timeZone="utc"
    className="rounded-lg p-3"
    style={{ boxShadow: '0px 2px 24px 0px #55555514' }}
    locale={es}
    formatters={{
      formatWeekdayName: (day: Date) => format(day, 'EEE', { locale: es }),
    }}
    {...props}
  />
)

export default Calendar
