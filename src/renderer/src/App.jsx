import { useEffect, useState } from 'react'

// Componentes de la aplicación
import ThemeSwitcher from './components/ThemeSwitcher'
import ItemInputForm from './components/ItemInputForm'
import ItemList from './components/ItemList'
import ItemListFilters from './components/ItemListFilters'

export default function App() {
  // const initialState = {
  //   itemList: [],
  //   filteredList: [],
  //   filters: { name: '', checked: false }
  // }

  const [itemList, setItemList] = useState([])
  const [filters, setFilters] = useState({ name: '', checked: false })

  // const [state, setState] = useState(initialState)

  useEffect(() => {
    window.api.getList()
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on('list-updated', handleUpdateList)
    console.log('useEffect ipcRenderer on list-updated')
    return () => {
      window.electron.ipcRenderer.removeListener('list-updated', handleUpdateList)
    }
  })

  function handleUpdateList(event, list) {
    console.log('handleUpdateList', list)
    const newList = getFilteredList(list)
    setItemList([...newList])
  }

  function handleFilters(name, checked) {
    const newFilters = { ...filters }
    newFilters.name = name
    newFilters.checked = checked
    window.api.getList()
    setFilters(newFilters)
    // getFilteredList()
  }

  function getFilteredList(list) {
    let filteredList = [...list]
    if (filters.name.length > 0 || filters.checked) {
      filteredList = list.filter((item) => {
        let result = item.name.toUpperCase().includes(filters.name.toUpperCase())
        if (filters.checked) {
          result = result && !item.checked
        }
        return result
      })
    }

    return filteredList
  }

  function handleChecked(item) {
    item.checked = !item.checked
    console.log('update checked item', item)
    window.api.updateItem(item)
  }

  async function handleDelete(item) {
    console.log('delete item', item)
    await window.api.deleteItem(item).then(() => {
      console.log('item deleted')
    })
  }

  return (
    <div id="app">
      <div id="app-header" className="container d-flex justify-content-between align-items-center">
        <div className="display-5 text-primary">
          <em>
            <i className="bi bi-bag-check-fill"></i> Lista de la compra
          </em>
        </div>

        {/* Componente encargado de cambiar el tema de la aplicación (light/dark) */}
        <ThemeSwitcher />
      </div>

      {/* Componente encargado de añadir nuevos elementos a la lista */}
      <ItemInputForm />

      {/* Componente encargado de mostrar los elementos de la lista */}
      <ItemList listModel={itemList} deleteCallback={handleDelete} checkCallback={handleChecked} />

      {/* Componente encargado aplicar filtros la lista */}
      <ItemListFilters filterCallback={handleFilters} />
    </div>
  )
}
