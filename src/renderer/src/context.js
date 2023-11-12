import { createContext, useState, useContext } from 'react'
import { ItemList } from './models/Item'

const ItemsContext = createContext()
// export const ItemsContextProvider = ItemsContext.Provider
// export const useItemsContext = () => useContext(ItemsContext)

const ItemsProvider = ({ children }) => {
  const [state, setState] = useState(new ItemList())

  // const addNewItem = (item) => setNewItem((prevState) => [...prevState, item])

  return <ItemsContext.Provider value={{ state, setState }}>{children}</ItemsContext.Provider>
}

export { ItemsProvider, ItemsContext }
