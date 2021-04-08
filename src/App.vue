<template>
  <MenuWin />
  <Login v-if="checkToken == false" />
  <ChildApp v-if="checkToken"  :data="client"/>
</template>

<script>

// Configuration
  import {onMounted, ref} from "vue";
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
  mounted(){
    
  },
  setup() {
      const checkToken = ref(false);
      let client = '';
    onMounted(()=>{ 
      if(localStorage.getItem("access_token")){
        checkToken.value = true;
      }
    });

    return{
      checkToken,
      client
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
  display: flex;
  flex-direction: column;
}
</style>
