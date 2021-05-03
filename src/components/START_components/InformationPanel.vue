<template>
  <div class="panel-information">
    <div class="panel-top">
      <div>
        <h3>
          TWITCH_USERNAME / BOT_NAME
          <svg viewBox="0 0 512 512" style="color: #007CC7;">
              <use href="../../assets/icons/user-solid.svg#user-solid"></use>  
          </svg>
        </h3>
        <h4>{{userName}}</h4>
      </div>
      <div>
        <h3>
          Follows
          <svg viewBox="0 0 512 512" style="color: #9B38AB;">
              <use href="../../assets/icons/star-solid.svg#fa-star"></use>  
          </svg>
        </h3>
        <h4>{{follows}}</h4>
      </div>
      <div>
        <h3>
          Subscriptions
          <svg viewBox="0 0 512 512" style="color: #FF0000;">
              <use href="../../assets/icons/heart-solid.svg#fa-heart"></use>  
          </svg>
        </h3>
        <h4>{{subscriptions}}</h4>
      </div>
    </div>
    <div class="panel-center">
        <h1>
          <div>
            <svg viewBox="0 0 512 512">
                <use href="../../assets/icons/twitch-brands.svg#twitch"></use>  
            </svg>
            CHAT
          </div>
        </h1>
        <div class="content-r">
          <transition-group name="fade">
            <div class="chat" v-for="chat in dataChat" :key="chat">
              <article>
                <div class="username">
                  <img :src="chat.profile_image_url" alt="">
                  <span :style="{color: chat.color}">{{chat.username}}:</span>
                  <p class="message">{{chat.message}}</p>
                </div>
              </article>
            </div>
          </transition-group>
        </div>
    </div>
  </div>
</template>

<script>
import { useStore} from "vuex";
import {onMounted, ref, computed} from "vue";
import config from "../../store/json/config";


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
        const store = useStore()
      // Numbers
        const commands = ref(0);
        const timmers = ref(0);
        const modules = ref(0);
        const funs = ref(0);
        const triggers = ref(0);
        const follows = ref(0);
        const subscriptions = ref(0);
      // Arrays
        let dataChat = computed(()=>{
          return store.state.chat;
        });



    onMounted(()=>{
      const localData = localStorage.getItem('data');
      if(localData == null){
        data.id = '';
        data.userName = '';
        data.botName = '';
      } else{
        data.id = JSON.parse(localData).id;
        data.userName = JSON.parse(localData).userName;
        data.botName = JSON.parse(localData).botName;
      }

      

      if((localStorage.getItem("commands") && localStorage.getItem("timmers") && localStorage.getItem("modules") && localStorage.getItem("funs") && localStorage.getItem("triggers")) === null){
        console.log()
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
                "Authorization": `Bearer ${token}`
              }
            }
          );

          const data = await response.json();
          return data;
        };

          GetTwitchData('https://api.twitch.tv/helix/users')
            .then(function (resp){
                const {id, display_name} = resp.data[0];

                botName.value = display_name;
                userName.value = display_name;


              // Follows
                GetTwitchData(`https://api.twitch.tv/helix/users/follows?to_id=${id}`)
                  .then(resp =>{
                    const {total} = resp;
                    follows.value = total;
                  }).catch(err=>{
                    console.log(err);
                  });


              // Subscriptions
                GetTwitchData(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${id}`)
                  .then(resp =>{
                    const {data} = resp;
                    subscriptions.value = data.length - 1;
                  }).catch(err=>{
                    console.log(err);
                  });

            }).catch(err=>{
              console.log(err);
            });
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
    width: 90%;
    height: 85vh;
    border-radius: 20px;
  }

  svg {
      width: 30px;
      height: 30px;
    }

  .panel-top{
    display: flex;
    position: relative;
    top: 40%;
    flex-direction: column;
    justify-content: space-around;
    width: 90%;
    height: 30%;
    left: 5%;
    padding: 0; 

    div{
      padding: 0;
      width: 100%;
      h3, h4{
        margin: 0;
        padding: 0;
      }
      h3{
        text-align: left;
        font-size: 25px;
      }
      h4{
        text-align: left;
        font-size: 20px;
      }

    }
  }

  .panel-center{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 0;
    
    h1{
      margin: 0;
      padding: 0;
      color: white;
        svg{
          height: 2rem;
          width: 2rem;
          position: relative;
          top: 1rem;
          left: -0.5rem;
        }
      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 4rem;
      }
    }

    .content-r{
      display: flex;
      align-items: center;
      flex-direction: column;

      border: 10px solid #1E2E39;
      border-radius: 30px;
      width: 473px;
      height: 742px;
      background-color: white;
      overflow: auto;


      &::-webkit-scrollbar {
        display: none;
      }
        
      .chat{
        display: flex;
        justify-content: space-evenly;
        width: 90%;
        height: auto;
        background-color: #08141e;
        font-weight: bold;
        color: white;
        border-radius: 10px;
        margin-top: 20px;
        transition: all ease-in-out .2s;

        article{
          min-height: 0;
          width: 100%;
          transition: all ease-in-out .2s;
          img{
            height: 35px;
            width: 35px;
            border-radius: 50%;
          }
          .username{
            display: flex;
          align-items: center;

            padding-left: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 20px;

            span{
              display: flex;
              margin-left: 10px;
            }
          }

          .message{
            width: 160px;
            font-size: 15px;
            word-wrap: break-word;
            text-align: justify;
            margin-left: 10px;
          }
        }
      }
    }
  }


  
</style>
