import { createStore } from "vuex";
import path from "path";
  
  export default createStore({
    state: {
      chat: [],
      command: []
    },
    mutations: {
      GetChatData: (state, chat) =>{ 
          state.chat.unshift(chat);
      },
      // Commands
      SetCommands: (state, command) =>{
        state.command = command;
      },
      addCommandsData: (command)=> {
        window.electron.writeJSON(path.join('/json/commands.json'), command)
      }
    },
    actions: {
      add: ({commit}, chat)=>{
        commit('GetChatData', chat);
      },
      addCommand: ({commit}, command)=>{
        commit('addCommandsData', command);
      }
    },
    modules: {},
    getters:{
      chat_list: state => state.chat,
      commands: state => state.command,
    }
  });


