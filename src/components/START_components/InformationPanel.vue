<template>
  <div class="panel-information">
    <div class="panel-top">
      <div>
        <h3>TWITCH_USERNAME</h3>
        <h4>{{userName}}</h4>
      </div>
      <div>
        <h3>BOT_NAME</h3>  
        <h4 v-if="checkBotName">{{botName}}</h4>
        <h4 v-else>{{userName}}</h4>
      </div>
    </div>
    <div class="panel-center">
      <div class="content-l">
        <h1>Information:</h1>
        <div><h4>Follows</h4> <h3>[{{follows}}]</h3></div>
        <div><h4> Subscriptions</h4><h3>[{{subscriptions}}]</h3></div>
      </div>
      <div class="content-r">
        <h1>CHAT</h1>
        <div class="chat" v-for="chat in dataChat" :key="chat">
          <div class="username">{{chat.username}}: </div>
          <div class="message">{{chat.message}}</div>
        </div>
      </div>
     
    </div>
    <div class="panel-bottom">
      <span>COMMANDS [{{commands}}]</span> <span>TIMMERS [{{timmers}}]</span> <span>MODULES [{{modules}}]</span> <span>FUNS [{{funs}}]</span> <span>TRIGGERS [{{triggers}}]</span>
    </div>
  </div>
</template>

<script>
import tmi from "tmi.js";
import {onMounted, ref} from "vue";
import config from "../../store/json/config.json";

export default {
  name: "InformationPanel",
  setup(){
    // Variables
      // Strings
        const botName = ref('');
        const userName = ref('');
      // Booleans
        const checkBotName = ref(false);
      // Objects
        const data = {};
      // Numbers
        const commands = ref(0);
        const timmers = ref(0);
        const modules = ref(0);
        const funs = ref(0);
        const triggers = ref(0);
        const follows = ref(0);
        const subscriptions = ref(0);
      // Arrays
        const dataChat = ref([]);


    onMounted(()=>{

      if((localStorage.getItem("commands") && localStorage.getItem("timmers") && localStorage.getItem("modules") && localStorage.getItem("funs") && localStorage.getItem("triggers")) === null){
        console.log("NUll")
      }else{
        commands.value = (localStorage.getItem("commands").length && localStorage.getItem("commands") !== null) || 0;
        timmers.value = (localStorage.getItem("timmers").length && localStorage.getItem("timmers") !== null) | 0;
        modules.value = (localStorage.getItem("modules").length && localStorage.getItem("modules") !== null) || 0;
        funs.value = (localStorage.getItem("funs").length && localStorage.getItem("funs") !== null) || 0;
        triggers.value = (localStorage.getItem("triggers").length && localStorage.getItem("triggers") !== null)  || 0;
      }


        const token = localStorage.getItem("access_token");


        const GetTwitchData = async (resource)=>{
          const response = await fetch(
            resource,
            {
              "headers": {
                "Client-ID": config.client_id,
                "Authorization": "Bearer " + token
              }
            }
          );

          const data = await response.json();
          return data;
        };


        GetTwitchData('https://api.twitch.tv/helix/users')
          .then(resp=> {
            const {id, display_name} = resp.data[0];


            data.id = id;
            data.userName = display_name;
            data.botName = display_name;
            localStorage.setItem("data", JSON.stringify(data));


            // SetVariables
              botName.value = data.botName;
              userName.value = data.userName;


            // Follows
              GetTwitchData(`https://api.twitch.tv/helix/users/follows?to_id=${data.id}`)
              .then(resp =>{
                const {total} = resp;
                follows.value = total;
              }).catch(err=>{
                console.log(err);
              });


            // Subscriptions
              GetTwitchData(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${data.id}`)
              .then(resp =>{
                const {data} = resp;
                subscriptions.value = data.length - 1;
              }).catch(err=>{
                console.log(err);
              });


            // chat
              const client = new tmi.Client({
                      options: { debug: true },
                      connection: { reconnect: true },
                      identity: {
                        username: data.botName,
                        password: config.outh2_token
                      },
                      channels: [ data.userName ]
                    });

              client.connect();


            // get txt and username from chat
            client.on('message', (channel, tags, message, self) => {
              if (self) return;

              if(message.toLowerCase() === '!hello'){
                client.say(channel, "Hello World :D");
              }

              let chatObj = [];
              let chat = localStorage.getItem('chat');
              if(chat == null){
                chatObj = [];
              } else{
                chatObj = JSON.parse(chat);
              }
              chatObj.unshift({username: tags.username, message});
              localStorage.setItem("chat",JSON.stringify(chatObj));
              dataChat.value = chatObj;
            });

          }).catch(err=>{
            console.log(err);
          });
          // Chat
          
    });

  return{
    // Strings
      botName,
      userName,
    // Booleans
      checkBotName,
    // Numbers
      commands,
      timmers,
      modules,
      funs,
      triggers,
      follows,
      subscriptions,
    // Arrays
      dataChat
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .panel-information{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
    height: 90%;
    border-radius: 20px;
    background-color: #c94322;
  }


  .panel-top{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    right: 0;
    padding: 0;


    div{
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #000000bb;
      width: 100%;


      h3{
        border-radius: 5px;
        padding: 10px;
        background-color: white;
        width: 100%;
      }

      h4{
        color: white;
      }

    }

  }


  .panel-center{
    display: flex;
    justify-content: space-evenly;

    .content-l{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #2e011da4;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      color: white;
      z-index: 0;


       h3{
         margin: 0;
       }

       h4{
         margin: .5rem;
       }
    }

    .content-r{
      position:relative; 
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 750px;
      height: 500px;
      background-color: white;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 10px;
      }
        
      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }
        
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #e9c46a; 
      }

      .chat{
        display: flex;
        width: 80%;
        flex-direction: column;
        background-color: #8b1601;
        font-weight: bold;
        color: white;
        padding: 20px;
        margin-top: 10px;
        .username{
          margin-bottom: 10px;
          font-size: 25px;
        }

        .message{
          white-space: normal;
        }
      }
    }

  }


  .panel-bottom{
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-evenly;

    span{
      font-weight: bold;
      text-shadow: 1px 1px #2e011da4;
    }
  }
</style>
