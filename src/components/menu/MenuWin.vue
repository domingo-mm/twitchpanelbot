<template>
    <div id="nav_win" class="drag">
        <div>
            <div class="crl minimaze" @click="minimizeApp()">
                <svg viewBox="0 0 512 512">
                    <use href="@/assets/icons/window-minimize-solid.svg#fa-window-minimize"></use>  
                </svg>
            </div>
            <div class="crl close" @click="closeApp()">
                <svg viewBox="0 0 512 512">
                    <use href="@/assets/icons/times-solid.svg#fa-times"></use>  
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuWin",
    setup() {
        function closeApp(){
            window.electron.closeApp();
        }


        function minimizeApp() {
            window.electron.minimizeApp();
        }


        return{
            minimizeApp,
            closeApp
        }
    },
}
</script>

<style scoped lang="scss">
    #nav_win{
    position: absolute;
    -webkit-app-region: drag;
    width: 100vw;
    z-index: 1;
    display: flex;
    background: #1E2E39;

    div{
      display: flex;
      margin-right: 0;
      margin-left: auto;

      .crl{
        -webkit-app-region: no-drag;
        margin-left: 0;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out .2s;


        &:hover{
          background-color: #222222;
        }

        svg{
          width: 20px;
          height: 20px;
          color: white;
        }
      }
    }

    h4{
      color: white;
      height: 0;
    }

    

    .close{
      &:hover{
        background-color: #ff0000 !important;
      }
    }

    .drag{
      -webkit-app-region: drag;
    }
    
}
</style>