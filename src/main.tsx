import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { queryClient } from '@core/config/queryClient.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import AppRouter from './router'
import '@core/assets/css/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>,
)
