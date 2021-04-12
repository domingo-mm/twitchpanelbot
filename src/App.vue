<template>
  <MenuWin />
  <Login v-if="checkToken == false" />
  <ChildApp v-if="checkToken"  />
</template>

<script>

// Configuration
  import {onMounted, ref} from "vue";
  import { useStore} from "vuex";
  import config from "./store/json/config";
  import tmi from "tmi.js";
// Components
  import Login from "@/components/Login.vue";
  import ChildApp from "@/components/ChildApp.vue";
  import MenuWin from "@/components/menu/MenuWin.vue";



export default {
  components:{
    Login,
    ChildApp,
    MenuWin
  },
  setup()  {
      const checkToken = ref(false);
      const store = useStore();
    onMounted(()=>{ 
        setTimeout(() => {
          if(localStorage.getItem("access_token")){
                    const outh2_token = localStorage.getItem("outh2_token");
                    const token = localStorage.getItem("access_token");

                    const GetTwitchData = async (resource)=>{
                        const response = await fetch(
                          resource,
                          {
                            "headers": {
                              "Client-ID": config.client_id,
                              "Authorization": `Bearer ${token}`
                            }
                          }
                        );

                        const data = await response.json();
                        return data;
                      };

                    const {userName, botName} =  JSON.parse(localStorage.getItem("data"));

                    const client = new tmi.Client({
                      options: { debug: true },
                      connection: { reconnect: true },
                      identity: {
                        username: botName,
                        password: outh2_token
                      },
                      channels: [ userName]
                    });
                    client.connect();

                    checkToken.value = true;

                    client.on("message", (channel, tags, message, self) =>{
                      if(self) return;


                      GetTwitchData(`https://api.twitch.tv/helix/users?login=${tags.username}`)
                        .then(resp=>{
                          const {profile_image_url} = resp.data[0];
                          store.dispatch('add', {username: tags.username, message, profile_image_url});
                        })
                        .catch(err=>console.log(err));
                    })

                    if(localStorage.getItem("chat_commands")){
                      let commands = []
                      commands = JSON.parse(localStorage.getItem("chat_commands"));
                      
                      client.on("message", (channel, tags, message, self)=>{
                        if(self) return;


                        commands.forEach(command =>{
                          if(message.toLowerCase() == command.command){
                            client.say(channel, command.message);
                          }
                        })
                      })
                    }
              }
      }, 1000);

      
    });

    return{
      checkToken,
    }
    
  },
  watch:{
    client: function () {
            
    }
  },
  methods: {
    deleteToken(){
      const token = localStorage.getItem("access_token");
      if(token){
        localStorage.removeItem("access_token");
      }
    }
  }
}
</script>

<style lang="scss">
template{
  margin: 0;
  padding: 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}
</style>
