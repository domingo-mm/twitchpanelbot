<template>
  <MenuWin />
  <Login v-if="checkToken == false" />
  <ChildApp v-if="checkToken"  />
</template>

<script>

// Configuration
  import {onMounted, ref, computed, onUpdated} from "vue";
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
     
    onUpdated(()=>{
        store.commit('SetCommands', JSON.parse(window.electron.loadJSON('/json/commands.json')));
        store.commit('SetTimers', JSON.parse(window.electron.loadJSON('/json/timers.json')));
    })

    onMounted(()=>{ 
        const commands = computed(()=>{
          return store.state.command
        });
        const timers = computed(()=>{
          return store.state.timer;
        })

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


                      

                  // Show the chat
                    client.on("message", (channel, tags, message, self) =>{
                      if(self) return;

                        timers.value.forEach((timer)=>{
                          setInterval(()=>{
                            console.log(timer);
                            const date = new Date();
                              if((date.getMinutes() % timer.delay_in) == 0){
                                  client.say(channel, `[BOT]: ${timer.response}`)
                              } 
                          }, 60000);
                        });


                        if(tags['message-type'] === 'chat'){
                           GetTwitchData(`https://api.twitch.tv/helix/users?login=${tags.username}`)
                              .then(resp=>{
                                const {profile_image_url} = resp.data[0];
                                store.dispatch('addChat', {username: tags.username, message, profile_image_url, color: tags.color});
                              })
                          .catch(err=>console.log(err));
                        }
                    });


                    // Commands Event
                      if(window.electron.loadJSON('/json/commands.json')){
                        client.on("message", (channel, tags, message, self)=>{
                          if(self) return;
                          const changeString = (string) =>{
                                return string
                                        .replace('{user}', `@${tags.username}`)
                                        .replace('{followage}', ()=>{
                                        });
                          }

                          commands.value.forEach(command =>{
                            const args = message.split(' ' + ',');

                            if(command.command === args[0]){

                              switch(command.reply_in){
                                case "chat":
                                  
                                  GetTwitchData(`https://api.twitch.tv/helix/users`)
                                    .then(res_parent=>{
                                      
                                      switch(command.permission){
    
                                        case "follows":
    
                                          // Get id from the user who is writing now
                                          GetTwitchData(`https://api.twitch.tv/helix/users?login=${tags.username}`)
                                            .then(id_follow_user =>{
                                              GetTwitchData(`https://api.twitch.tv/helix/users/follows?from_id=${id_follow_user.data[0].id}&to_id=${res_parent.data[0].id}`)
                                                .then(result =>{
                                                  if(result.total === 1 || res_parent.data[0].login === tags.username){
                                                    client.say(channel, `[BOT]: ${changeString(command.response)}`);
                                                  }else{
                                                    client.say(channel, `[BOT]: @${tags.username} You dont have permission to this command if you dont follow this channel.`)
                                                  }
                                                })
                                                .catch(err => console.error(err));
                                            }).catch(err=>console.log(err));
    
                                          break;
                                        case "subscribers":
                                          
                                            GetTwitchData(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${res_parent.data[0].id}`)
                                              .then(result =>{
                                                console.log(res_parent);
                                                if(result.data[0].user_login === tags.username ||  res_parent.data[0].login === tags.username)
                                                  client.say(channel, `[BOT]: ${changeString(command.response)}`);
                                                else 
                                                  client.say(channel, `[BOT]: @${tags.username} You dont have permission to this command if you dont subscribe this channel.`)
                                              })
                                              .catch(err => console.error(err));
                                          console.log("subscribers");
    
                                          break;
                                        default:
    
                                          client.say(channel, `[BOT]: ${changeString(command.response)}`);
    
                                          break;
    
                                      }
    
                                    })
                                    .catch(err=> console.log(err)); 

                                  break;
                                case "whisper":
                                  console.log(tags.username)
                                  client.whisper(tags.username, `[BOT]: ${changeString(command.response)}`);
                                  break;
                              }
                            }
                          })
                        })
                      }
          }
    });

    return{
      checkToken,
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

@font-face {
  font-family: IcelandR;
  src: url("assets/fonts/Iceland-Regular.ttf");
}


template{
  margin: 0;
  padding: 0;
}


#app {
  font-family: IcelandR;
  text-align: center;

  height: 100vh;
  overflow: hidden;
}
</style>
