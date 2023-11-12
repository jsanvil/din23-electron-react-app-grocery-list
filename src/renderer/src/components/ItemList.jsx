import Item from './ItemRow'

export default function ItemList({ listModel, deleteCallback, editCallback, checkCallback }) {
  return (
    <div id="app-list" className="container">
      <ul className="list-group">
        {listModel.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteCallback={() => deleteCallback(item)}
            editCallback={() => editCallback(item)}
            checkCallback={checkCallback}
          />
        ))}
      </ul>
    </div>
  )
}
