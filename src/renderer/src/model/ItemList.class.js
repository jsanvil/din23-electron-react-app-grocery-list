import Item from './Item.class'

/**
 * Clase que representa una lista de items
 **/
export default class ItemList {
  /**
   * Crea una nueva lista de items
   * a partir de un array de objetos con los datos de los items
   *
   * @param {Array<Item>} list
   */
  constructor(list = []) {
    this._list = list

    // list.forEach((obj) => {
    //   const item = new Item(obj._name, obj._id)
    //   item.quantity = obj._quantity
    //   item.status = obj._status
    //   this._list.push(item)
    // })

    this._filter = {
      hideChecked: null,
      nameContains: null
    }
  }

  /**
   * Devuelve la lista de items
   */
  get list() {
    this.sortByStatus()
    return this._list
  }

  /**
   * Crea un nuevo item y lo agrega a la lista
   *
   * @param {string} name
   */
  create(name) {
    const item = new Item(name)
    this.add(item)
  }

  /**
   * Agrega un item al principio de la lista
   *
   * @param {Item} item
   */
  add(item) {
    this._list.unshift(item)
  }

  /**
   * Elimina un item de la lista
   *
   * @param {Item} item
   */
  remove(item) {
    this._list = this._list.filter((i) => i !== item)
  }

  /**
   * Cambia el estado de un item
   *
   * @param {Item} item
   */
  switchChecked(item) {
    item.switchChecked
    this.sortByStatus()
  }

  /**
   * Ordena la lista por estado
   * primero los items no completados
   */
  sortByStatus() {
    this._list = this._list.sort((a, b) => {
      if (a.status === false && b.status === false) return 0
      if (a.status === false) return -1
      return 1
    })
  }

  /**
   * Devuelve la lista de items con filtros aplicados
   */
  getFiltered() {
    const filtered = this._list.filter((item) => {
      if (this._filter.hideChecked && item.checked) return false
      if (
        this._filter.nameContains &&
        !item.name.toLowerCase().includes(this._filter.nameContains.toLowerCase())
      )
        return false

      return true
    })

    return filtered
  }

  /**
   * Establece el filtro de items completados
   */
  setFilterHideChecked(hideChecked) {
    this._filter.hideChecked = hideChecked
  }

  /**
   * Establece el filtro de nombre
   */
  setFilterNameContains(nameContains) {
    this._filter.nameContains = nameContains
  }

  /**
   * Limpia los filtros
   */
  clearFilters() {
    this._filter.hideChecked = null
    this._filter.nameContains = null
  }

  /**
   * Devuelve la lista de items en formato de texto JSON
   */
  toString() {
    return JSON.stringify(this._list)
  }
}
