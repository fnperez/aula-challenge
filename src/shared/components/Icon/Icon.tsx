import { lazy } from 'react'

const ICON_HASH = {
  analyze: lazy(() => import('./icons/analyze')),
  calendar: lazy(() => import('./icons/calendar')),
  'calendar-alt': lazy(() => import('./icons/calendar-alt')),
  'card-alt': lazy(() => import('./icons/card-alt')),
  categories: lazy(() => import('./icons/categories')),
  commission: lazy(() => import('./icons/commission')),
  download: lazy(() => import('./icons/download')),
  filter: lazy(() => import('./icons/filter')),
  home: lazy(() => import('./icons/home')),
  'program-deposit': lazy(() => import('./icons/program-deposit')),
  'search-placeholder': lazy(() => import('./icons/search-placeholder')),
  metrics: lazy(() => import('./icons/metrics')),
  menu: lazy(() => import('./icons/menu')),
  dot: lazy(() => import('./icons/dot')),
  left: lazy(() => import('./icons/left')),
}

export interface IconProps {
  name: keyof typeof ICON_HASH
  size?: number
  color?: string
  className?: string
}

const Icon = ({ name, size = 24, color, className }: IconProps) => {
  const IconComponent = ICON_HASH[name] ?? <></>

  return <IconComponent width={size} height={size} color={color} className={className} />
}

export default Icon
