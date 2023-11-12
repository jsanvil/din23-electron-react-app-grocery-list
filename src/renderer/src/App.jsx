import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Componentes de la aplicación
import AppList from './AppList'
import AppEditItem from './AppEditItem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppList />} />
        <Route path="/:itemId" element={<AppEditItem />} />
      </Routes>
    </BrowserRouter>
  )
}
