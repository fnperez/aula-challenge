import { createBrowserRouter, RouterProvider } from 'react-router'
import { MetricsRoutes } from '@features/metrics/router'
import { TransactionRoutes } from '@features/transactions/routes'
import Layout from '@layouts/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      ...TransactionRoutes,
      {
        path: 'metrics',
        children: MetricsRoutes,
      },
    ],
  },
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter
