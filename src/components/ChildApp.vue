<template>
    <div class="child-app">
        <div id="nav">
            <router-link to="/" class="btn-start">
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/home-solid.svg#fa-home"></use>  
            </svg> <br />
            START
            </router-link>
        <router-link to="/command" class="btn-command" >
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/terminal-solid.svg#fa-terminal"></use>  
            </svg> <br />
            COMMANDS
        </router-link>
        <router-link to="/timer" class="btn-timer" >
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/clock-solid.svg#fa-clock"></use>  
            </svg> <br />
            TIMERS
        </router-link>
        <router-link to="/module" class="btn-module">
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/modx-brands.svg#fa-modx"></use>  
            </svg> <br />
            MODULES
        </router-link>
        <router-link to="/fun" class="btn-fun" >
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/star-solid.svg#fa-star"></use>  
            </svg> <br />
            FUN
        </router-link>
        <router-link to="/trigger" class="btn-trigger" >
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/cat-solid.svg#fa-cat"></use>  
            </svg> <br />
            TRIGGER
        </router-link>
        <router-link to="" class="btn-logout">
            <svg viewBox="0 0 512 512">
                <use href="../assets/icons/sign-out-alt-solid.svg#fa-w-16"></use>  
            </svg> <br />
            LOG-OUT
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
  margin-bottom: 53px;
  width: 100px;
  height: 100vh;
  position: static;
  z-index: 2;
  background: #414141;
  
  svg {
      width: 35px;
      height: 35px;
    }


  a {
      font-weight: bold;
      color: white;
      text-decoration: none;
      font-size: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      transition: all ease-in-out .2s;
    }

// BTN's APP

  .btn-start, .btn-command, .btn-timer, .btn-module, .btn-fun, .btn-trigger{
    &:hover, &.router-link-exact-active{
      font-size: 15px;
    }
  }

  .btn-start{
    &:hover, &.router-link-exact-active{
      background-color: #980000;
    }
  }

  .btn-command{
    &:hover, &.router-link-exact-active{
      background-color: #830098;  
    }
  }

  .btn-timer{
    &:hover, &.router-link-exact-active{
      background-color: #000F98;
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
    background-color: #b10000;
    &:hover, &.router-link-exact-active{
      font-size: 15px;
    }
  }
}
</style>