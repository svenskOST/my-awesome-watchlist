import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

function createWindow() {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
      },
   })

   win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)
