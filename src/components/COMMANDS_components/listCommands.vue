<template>
    <ModalAdd />
    <main class="panel-commands">
        <div class="commands">
           <header> <h3>Custom Commands</h3> <div class="btn add-btn">Add Command</div></header>
           <div class="headers">
                   <span>Command</span>
                   <span>Response</span>
                   <span>Operations</span>
            </div>
            <div class="command-panel">
               <div class="command" v-for="command in commandsJSON" :key="command">
                   <span>
                       {{command.command}}
                    </span>
                   <span>
                       {{command.response}}
                    </span>
                   <div>
                       <button class="btn">UPDATE</button>
                       <button class="btn">DELETE</button>
                   </div>
               </div>
           </div>
        </div>
    </main>
</template>

<script>
import { onMounted, computed} from "vue";
import { useStore } from "vuex";
import ModalAdd from "./modalAdd"

export default {
    name: "ListCommands",
    components:{
        ModalAdd
    },
    setup() {
        const store = useStore();
        
        const commandsJSON = computed(()=> {
            return store.state.command;
        });



        // const items = {
        //     id: 0,
        //     command: "",
        //     response: "",
        //     reply_in: "",
        //     permission: ""
        // }
        // console.log(items);

        onMounted(()=>{

            // const commands = [{
            //     id: 1,
            //     command: "!hello",
            //     response: "Hello World",
            //     reply_in: "whisper",
            //     permission: "regulars"
            // },{
            //     id: 2,
            //     command: "!test",
            //     response: "Testing Command",
            //     reply_in: "chat",
            //     permission: "regulars"
            // },{
            //     id: 3,
            //     command: "!hello ${user}",
            //     response: "Hello ${user}, how are you?",
            //     reply_in: "chat",
            //     permission: "regulars"
            // }];


            // if(commandsJSON.value.length === 0){
            //     store.dispatch('addCommand', commands);
            // }
        });
            
        function AddCommand(){

        }
        

        return{
            commandsJSON,
            AddCommand
        }
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


            header{
                display: flex;
                justify-content: space-around;
                margin-top: 20px;

                h3{
                    font-size: 25px;
                    color: white;
                }

                .add-btn{
                    width: 120px;
                    height: 50px;
                    font-size: 15px;
                    transition: all ease-in-out .2s;
                    box-shadow: 0px 0px 4px 2px #00000098;
                }

                .add-btn:hover{
                    cursor: pointer;
                    background-color: #64b082;
                    color:white;
                    transition: all ease-in-out .2s;
                }
            }

            .headers{
                display: flex;
                justify-content: space-between;
                width: 70%;
                color:white;
                margin: 0 auto;
            }

            .command-panel{
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 85%;
                width: 85%;
                background-color: #fff;
                overflow-y: scroll;
                margin: 5px auto;
                &::-webkit-scrollbar {
                    display: none;
                }


                .command{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #4e2b45;
                    color: #fff;
                    white-space: normal;
                    width: 95%;
                    padding: 20px;
                    margin-top: 10px;
                    margin-left: 10px;


                    div{
                        display: flex;
                        justify-content: space-between;
                        width: 30%;
                        display: flex;
                        justify-content: space-around;

                        .btn{
                            width: 80px;
                            height: 50px;
                            transition: all ease-in-out .2s;
                        }
                    }

                    span:nth-child(1){
                        width: 10px;
                    }
                    span:nth-child(2){
                        width: 200px;
                        text-align: justify;
                    }
                }
            }
        }
    }
</style>