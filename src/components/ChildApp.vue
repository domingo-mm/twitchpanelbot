<template>
    <div class="child-app">
        <div id="nav">
        <div class="btns">
          <router-link to="/" class="btn-start">
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/home-solid.svg#fa-home"></use>  
            </svg> <br />
          </router-link>
          <router-link to="/command" class="btn-command" >
              <svg viewBox="0 0 512 512">
                  <use href="../assets/icons/terminal-solid.svg#fa-terminal"></use>  
              </svg> <br />
          </router-link>
          <router-link to="/timer" class="btn-timer" >
              <svg viewBox="0 0 512 512">
                  <use href="../assets/icons/clock-solid.svg#fa-clock"></use>  
              </svg> <br />
          </router-link>
        </div>
        <router-link to="" class="btn-logout">
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/sign-out-alt-solid.svg#fa-w-16"></use>  
            </svg> <br />
        </router-link >
    </div>
        <router-view />
  </div>
</template>

<script>
import {onMounted, ref} from "vue";


export default {
    setup() {
      // Variables
        const checkToken = ref(false);

      // Functions
        function closeApp(){
          window.electron.closeApp();
        }


        function minimizeApp(){
          window.electron.minimizeApp();
        }


        onMounted(()=>{

          const btnLogOut = document.querySelector(".btn-logout");
          btnLogOut.addEventListener("click", ()=>{
            const token = localStorage.getItem("access_token");
              if(token){
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("data");
                  localStorage.removeItem("chat");
                  window.location.href = '/';
              }
          });
        });

      return{
        checkToken,
        closeApp,
        minimizeApp
      }
    }
}
</script>

<style scoped lang="scss">
    .child-app{
        display: flex;
        height: 100%;
        width: 100%;
    }

#nav {
  -webkit-app-region: no-drag;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 53px;
  width: 120px;
  height: 100vh;
  position: static;
  z-index: 2;
  background: #1E2E39;
  
  .btns{
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  svg {
      width: 35px;
      height: 35px;
    }

  a {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: white;
      text-decoration: none;
      width: 69px;
      height: 57px;
      background-color: #204661;
      border-radius: 9px;
      font-size: 10px;
      transition: all ease-in-out .2s;
    }

// BTN's APP

  .btn-start, .btn-command, .btn-timer, .btn-module, .btn-fun, .btn-trigger{
    &:hover, &.router-link-exact-active{
      background-color: #03131E;
      font-size: 15px;
    }
  }

  .btn-start{
    &:hover, &.router-link-exact-active{
      color: #5DB9F0;
    }
  }

  .btn-command{
    &:hover, &.router-link-exact-active{
      color: #D56DFA;  
    }
  }

  .btn-timer{
    &:hover, &.router-link-exact-active{
      color: #78F075;
    }
  }

  .btn-module{
    &:hover, &.router-link-exact-active{
      background-color: #009886;
    }
  }

  .btn-fun{
    &:hover, &.router-link-exact-active {
      background-color: #EC8E00;
    }
  }

  .btn-trigger{
    &:hover,  &.router-link-exact-active {
      background-color: #C60053;
    }
  }

  .btn-logout{
    background-color: none !important;
    color: #b10000;
    &:hover, &.router-link-exact-active{
      font-size: 15px;
    }
  }
}
</style>