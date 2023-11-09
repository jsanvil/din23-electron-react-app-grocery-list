import ThemeSwitcher from './components/ThemeSwitcher'
import ItemInputForm from './components/ItemInputForm'
import ItemList from './components/ItemList'
import ItemListFilters from './components/ItemListFilters'

export default function App() {
  return (
    <div id="app">
      <div id="app-header" className="container d-flex justify-content-between align-items-center">
        <div className="display-5 text-primary">
          <em>
            <i className="bi bi-bag-check-fill"></i> Lista de la compra
          </em>
        </div>
        <ThemeSwitcher className="col-1" />
      </div>

      <ItemInputForm />

      <ItemList />

      <ItemListFilters />
    </div>
  )
}
