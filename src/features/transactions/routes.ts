import type { RouteObject } from 'react-router'
import ListView from './views/ListView'

export const TransactionRoutes: RouteObject[] = [
  {
    index: true,
    Component: ListView,
  },
]
