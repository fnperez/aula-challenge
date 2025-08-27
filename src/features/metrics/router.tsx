import type { RouteObject } from 'react-router'
import MetricsView from './views/MetricsView'

export const MetricsRoutes: RouteObject[] = [
  {
    index: true,
    Component: MetricsView,
  },
]
