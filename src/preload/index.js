import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getList: async () => {
    console.log('RENDERER store:get-list')
    await ipcRenderer.invoke('store:get-list')
  },
  addItem: (item) => {
    console.log('RENDERER store:add-item', item)
    ipcRenderer.send('store:add-item', item)
  },
  deleteItem: async (item) => {
    console.log('RENDERER store:delete-item', item)
    await ipcRenderer.invoke('store:delete-item', item)
    // .then((result) => {
    //   listUpdated(result)
    // })
  },
  updateItem: (item) => {
    console.log('RENDERER store:update-item', item)
    ipcRenderer.send('store:update-item', item)
  }
}

// function listUpdated(list) {
//   // console.log('list-updated', list)
//   const listElement = new CustomEvent('list-updated', { detail: list })
//   document.dispatchEvent(listElement)
// }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
