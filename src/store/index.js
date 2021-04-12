import { createStore } from "vuex";

    
  export default createStore({
    state: {
      chat: []
    },
    mutations: {
      GetChatData(state, chat){ 
          state.chat.unshift(chat);
      } 
    },
    actions: {
      add({commit}, chat){
        commit('GetChatData', chat);
      }
    },
    modules: {},
    getters:{
      chat_list: state => state.chat
    }
  });


