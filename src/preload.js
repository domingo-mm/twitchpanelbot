const { contextBridge, ipcRenderer} = require('electron');
const fs = require('fs');
contextBridge.exposeInMainWorld(
    'electron',
    {
        // Win Menu
            closeApp: () => ipcRenderer.send('close_btn', true),
            minimizeApp: () => ipcRenderer.send('minimize_btn', true),
            writeJSON: (path,data) => {
                try {
                    fs.writeFileSync(__dirname + path, JSON.stringify(data, null, 2))
                  } catch (err) {
                    console.error(err)
                }
            },
            loadJSON: (path) =>{
                try {
                    return fs.readFileSync(__dirname + path, 'utf8')
                } catch (err) {
                    console.error(err)
                    return false
                }
            }
    }       
)