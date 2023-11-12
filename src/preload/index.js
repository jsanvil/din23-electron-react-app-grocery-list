import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getList: async () => {
    console.log('RENDERER store:get-list')
    await ipcRenderer.invoke('store:get-list')
  },
  getItem: (itemId) => {
    console.log('RENDERER store:get-item', itemId)
    return ipcRenderer.invoke('store:get-item', itemId)
    // result.then((item) => {
    //   console.log('RENDERER store:get-item RESULT', item)
    //   return item
    // })
    // .then((result) => {
    //   console.log('RENDERER store:get-item RESULT', result)
    // })
  },
  addItem: (item) => {
    console.log('RENDERER store:add-item', item)
    ipcRenderer.send('store:add-item', item)
  },
  deleteItem: async (item) => {
    console.log('RENDERER store:delete-item', item)
    await ipcRenderer.invoke('store:delete-item', item)
  },
  updateItem: (item) => {
    console.log('RENDERER store:update-item', item)
    ipcRenderer.send('store:update-item', item)
  }
}

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
