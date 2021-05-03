const { contextBridge, ipcRenderer} = require('electron');
const fs = require('fs');
const axios = require('axios');


contextBridge.exposeInMainWorld(
    'electron',
    {
        // Win Menu
            closeApp: () => ipcRenderer.send('close_btn', true),
            minimizeApp: () => ipcRenderer.send('minimize_btn', true),
            loadJSON: (path) =>{
                try {
                    return fs.readFileSync(__dirname + path, 'utf8')
                } catch (err) {
                    console.error(err)
                    return false
                }
            },
            writeJSON: async (path, data) => {
                try{
                    const getData = fs.readFileSync(__dirname + path, {encoding:'utf8', flag:'r'});
                    const json = JSON.parse(getData);
                    json.push(data);
                    fs.writeFileSync(__dirname + path, JSON.stringify(json, null, 2))
                }catch(err){
                    console.error(err);
                    return false
                }
            },
            editCommandJSON: (path, data) =>{
                try{
                    const getData = fs.readFileSync(__dirname + path, {encoding:'utf8', flag:'r'});
                    const json = JSON.parse(getData);
                    json.forEach(res=>{
                        if(res.command === data.command){
                            res.command = data.command;
                            res.response = data.response;
                            res.permission = data.permission;
                            res.reply_in = data.reply_in;
                        };
                    });
                    fs.writeFileSync(__dirname + path, JSON.stringify(json, null, 2))
                }catch(err){
                    console.error(err);
                    return false
                }
            },
            deleteCommandJSON: (path, command) =>{
                const getData = fs.readFileSync(__dirname + path, {encoding:'utf8', flag:'r'});
                const json = JSON.parse(getData);
                for(const [key, item] of Object.entries(json)){
                    if(item.command === command){
                        json.splice(key, 1);
                        fs.writeFileSync(__dirname + path, JSON.stringify(json, null, 2));
                        return;
                    }
                }
            },
            editTimerJSON: (path, data) =>{
                try{
                    const getData = fs.readFileSync(__dirname + path, {encoding:'utf8', flag:'r'});
                    const json = JSON.parse(getData);
                    json.forEach(res=>{
                        if(res.title === data.title){
                            res.title = data.title;
                            res.response = data.response;
                            res.delay_in = data.delay_in;
                        };
                    });
                    fs.writeFileSync(__dirname + path, JSON.stringify(json, null, 2))
                }catch(err){
                    console.error(err);
                    return false
                }
            },
            deleteTimerJSON: (path, timer) =>{
                const getData = fs.readFileSync(__dirname + path, {encoding:'utf8', flag:'r'});
                const json = JSON.parse(getData);
                for(const [key, item] of Object.entries(json)){
                    if(item.title === timer){
                        json.splice(key, 1);
                        fs.writeFileSync(__dirname + path, JSON.stringify(json, null, 2));
                        return;
                    }
                }
            }
    }       
)