export default function ItemInputForm() {
  return (
    <div id="app-item-input" className="container">
      <form action="#" id="itemForm">
        <div className="d-flex gap-2 align-items-center">
          <div className="input-group">
            <span className="input-group-text text-primary">
              <i className="bi bi-pencil-square"></i>
            </span>
            <input
              type="text"
              id="itemName"
              name="itemName"
              autoComplete="off"
              className="form-control"
              placeholder="producto..."
            />
          </div>
          <button id="btnAdd" title="Añadir producto" className="btn btn-primary">
            <i className="bi bi-bag-plus-fill"></i>
          </button>
        </div>
      </form>
    </div>
  )
}