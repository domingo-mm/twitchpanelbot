<template>
    <ModalAdd />
    <main class="panel-commands">
        <div class="commands">
           <div class="btn add-btn">+</div>
           <div class="command-panel">
               <div class="command">

               </div>
           </div>
        </div>
    </main>
</template>

<script>
import {onMounted} from "vue";
import ModalAdd from "./modalAdd"

export default {
    name: "ListCommands",
    components:{
        ModalAdd
    },
    setup() {
        let commands = [];
        setInterval(() => {
            const chat = localStorage.getItem('chat_commands');
            if(chat == null){
               commands = [];
            } else{
                commands = JSON.parse(chat);
            }  
        }, 500);
        

        onMounted(()=>{
            commands.push({
                id: 1,
                command: "!hello",
                message: "[BOT]: Hello World"
            },{
                id: 1,
                command: "!test",
                message: "[BOT]: Testing Command"
            });

            localStorage.setItem("chat_commands", JSON.stringify(commands));
        });
    },
}
</script>

<style scoped lang="scss">
    .panel-commands{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
            background-color: white;
        }
        .commands{
            background-color: #7c3d64;
            width: 90%;
            height: 90%;
            border-radius: 20px;

            .add-btn{
                position: relative;
                top: 2%;
                left: 3%;
                border-radius: 50%;
                font-size: 50px;
                transition: all ease-in-out .2s;
                box-shadow: 0px 0px 4px 2px #00000098;
            }
        }
    }
</style>