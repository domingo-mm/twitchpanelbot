import { createStore } from "vuex";
// import path from "path";
  
  export default createStore({
    state: {
      chat: [],
      command: [],
      timer: []
    },
    mutations: {
      GetChatData: (state, chat) =>{ 
          state.chat.unshift(chat);
      },
      // Commands
        SetCommands: (state, command) =>{
          state.command = command;
        },
        addCommandsData: (state, command)=> {
          state.command.push(command);
        },
      // Timmers
        SetTimers:(state, timer) =>{
          state.timer = timer;
        },
        addTimerData: (state, timer)=> {
          state.timer.push(timer);
        },
    },
    actions: {
      addChat: ({commit}, chat)=>{
        commit('GetChatData', chat);
      },
      addCommand: ({commit}, command)=>{
        commit('addCommandsData', command);
      },
      addTimer: ({commit}, timer)=>{
        commit('addTimerData', timer);
      }
    },
    modules: {},
    getters:{
      chat_list: state => state.chat,
      commands: state => state.command,
      timers: state => state.timer,
    }
  });


