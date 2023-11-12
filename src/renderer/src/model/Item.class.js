/**
 * Clase que representa un item
 */
export default class Item {
  /**
   * Crea un nuevo item
   * @param {string} name
   * @param {number} [id=null]
   */
  constructor(name, id = null) {
    this.id = id || Date.now()
    this.name = name
    this.quantity = 1
    this.checked = false
  }

  toString() {
    return `${this.name}`
  }
}
