import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Item from './model/Item.class'

export default function AppEditItem() {
  const [item, setItem] = useState({})

  const { itemId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    window.api.getItem(itemId).then((itemFetched) => {
      console.log('result getItem', itemFetched)
      setItem(itemFetched)
    })
  }, [])

  function handleSubmitChanges(event) {
    event.preventDefault()
    const name = event.target.itemName.value
    if (!name) return
    item.name = name
    window.api.updateItem(item)
    event.target.reset()
    event.target.itemName.focus()
    navigate('/')
  }

  async function handleDelete(item) {
    await window.api.deleteItem(item)
  }

  return (
    <div
      id="app-item-edit"
      className="container vh-100 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <h1 className="text-primary">
        <i className="bi bi-pencil-square"></i> Editar producto
      </h1>
      <form action="#" id="itemForm" onSubmit={handleSubmitChanges} className="container">
        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="input-group">
            <span className="input-group-text text-primary col-2">
              <i className="bi bi-pencil-square"> Producto:</i>
            </span>
            <input
              type="text"
              id="itemName"
              name="itemName"
              required
              autoComplete="off"
              className="form-control"
              placeholder="producto..."
              onChange={() => setItem({ ...item, name: event.target.value })}
              value={item.name}
            />
          </div>
          <div className="input-group">
            {/* item.quantity */}
            <span className="input-group-text text-primary col-2">
              <i className="bi bi-hash"> Cantidad:</i>
            </span>
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              autoComplete="off"
              min="1"
              className="form-control"
              placeholder="cantidad..."
              onChange={() => setItem({ ...item, quantity: event.target.value })}
              value={item.quantity}
            />
          </div>
          <div className="d-flex gap-2">
            <button id="btnEdit" title="Borrar" className="btn btn-danger" onClick={handleDelete}>
              <i className="bi bi-trash"> Borrar</i>
            </button>
            <button id="btnEdit" title="Guardar" className="btn btn-primary">
              <i className="bi bi-save"> Guardar cambios</i>
            </button>
            <Link to="/" className="btn btn-secondary">
              <i className="bi bi-arrow-left"> Volver</i>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
