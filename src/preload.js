const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        // Win Menu
            closeApp: () => ipcRenderer.send('close_btn', true),
            minimizeApp: () => ipcRenderer.send('minimize_btn', true),
    }       
)