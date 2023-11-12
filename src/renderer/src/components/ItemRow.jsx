function formatFilteredName(name, filter) {
  if (!filter) {
    return name
  }
  return name.replace(new RegExp(`(${filter})`, 'gi'), '<em>$1</em>')
}

export default function ItemRow({ item, filter, deleteCallback, editCallback, checkCallback }) {
  function handleChecked(event, item) {
    const updatedItem = { ...item }
    updatedItem.checked = !item.checked
    event.target.checked = updatedItem.checked
    console.log('update checked item', item)
    checkCallback(item)
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {/* checkbox */}
      <input
        id="item-status"
        type="checkbox"
        name="completed"
        className="form-check-input"
        defaultChecked={item.checked}
        onClick={() => handleChecked(event, item)}
      //onChange={() => handleChecked(event, item)}
      />
      {/* nombre */}
      <label htmlFor="item-status">{formatFilteredName(item.name, filter)}</label>
      {/* cantidad */}
      <em className="small border rounded px-1">x{item.quantity}</em>
      {/* espaciador */}
      <div className="flex-grow-1"></div>
      {/* botón editar */}
      <button
        className="btn btn-link edit py-1 px-2"
        title="editar"
        onClick={() => editCallback(item)}
      >
        <i className="bi bi-pencil"></i>
      </button>
      {/* botón eliminar */}
      <button
        className="btn btn-link delete py-1 px-2"
        title="eliminar"
        onClick={() => deleteCallback(item)}
      >
        <i className="bi bi-x-circle"></i>
      </button>
    </li>
  )
}
