import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { StoreManager } from './StoreManager.js'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Register events
const store = new StoreManager({ name: 'main' })

ipcMain.handle('store:get-list', async () => {
  try {
    console.log('MAIN store:get-list')
    const list = await store.getList()
    mainWindow.send('list-updated', list)
  } catch (error) {
    console.error(error)
  }
})

ipcMain.on('store:add-item', (event, item) => {
  console.log('MAIN store:add-item', item)
  // event.sender.send('list-updated', store.getList())
  mainWindow.send('list-updated', store.addItem(item))
})

ipcMain.handle('store:delete-item', async (event, item) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'warning',
    title: `Borrar ${item.name}`,
    message: `¿Borrar '${item.name}' de la lista?`,
    buttons: ['Cancelar', 'BORRAR'],
    cancelId: 0,
    defaultId: 1
  })

  if (result.response === 1) {
    console.log('MAIN store:delete-item', item)
    mainWindow.send('list-updated', store.deleteItem(item))
  }
})

ipcMain.on('store:update-item', (event, item) => {
  console.log('MAIN store:update-item', item)
  mainWindow.send('list-updated', store.updateItem(item))
})
