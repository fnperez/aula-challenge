import { BrowserRouter, Route, Routes } from 'react-router'
import Metrics from '@features/metrics/screens/Metrics.tsx'
import MyTransactions from '@features/transactions/screens/MyTransactions.tsx'
import Dashboard from '@shared/components/Layout/Dashboard/Dashboard.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route index element={<MyTransactions />} />
          <Route path="metrics" element={<Metrics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
