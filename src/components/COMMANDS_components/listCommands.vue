<template>
    <transition name="fade">
        <div class="modal-add" v-if="addModal || updateModal">
            <form action="">
                <header>
                    <h4>Add Custom Command</h4>
                </header>
                <label for=""></label>
                Command: <input type="text" v-model="command" placeholder="!hello" :disabled="updateModal">
                Response: <textarea type="text" v-model="message" placeholder="Insert your chat response here."></textarea>
                Permission:
                <select v-model="permission" id="type">
                    <option value="regulars">Regulars</option>
                    <option value="follows">Follows</option>
                    <option value="subscribers">Subscribers</option>
                </select>
                Reply in:
                <select v-model="reply_in" id="type">
                    <option value="chat">Chat</option>
                    <option value="whisper">Whisper</option>
                </select>
                <footer>
                    <button  value="ADD" id="add" @click="addCommand" v-if="addModal">ADD</button>
                    <button  value="EDIT" id="add" @click="editCommand" v-else>EDIT</button>
                    <button  @click="addModal = false, updateModal = false">CANCEL</button>
                </footer>
            </form>
        </div>
    </transition>
    <main class="panel-commands">
        <header>
            <h3>
                <svg viewBox="0 0 512 512">
                    <use href="../../assets/icons/twitch-brands.svg#twitch"></use>  
                </svg>
                COMMANDS
            </h3> 
            <div class="btn add-btn" @click="addModal = true, resetValues, command = '', message ='', permission = '', reply_in = ''">Add Command</div>
        </header>
        <div class="commands">
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
                       <button class="btn" @click="getCommandData(command.command)">
                           <svg viewBox="0 0 512 512">
                                <use href="../../assets/icons/pen-solid.svg#fa-pen"></use>  
                            </svg>
                       </button>
                       <button class="btn" @click="deleteCommand(command.command)">
                           <svg viewBox="0 0 512 512">
                                <use href="../../assets/icons/trash-solid.svg#fa-trash"></use>  
                            </svg>
                       </button>
                   </div>
               </div>
           </div>
        </div>
    </main>
</template>

<script>
import {computed, ref } from "vue";
import { useStore } from "vuex";
import path from "path";

export default {
    name: "ListCommands",
    setup() {
        // data
            const store = useStore();
            const command = ref('');
            const message = ref('');
            const permission = ref('');
            const reply_in = ref('');
            const commandsJSON = computed(()=> {
                return store.state.command;
            });
            const addModal = ref(false);
            const updateModal = ref(false);

            console.log(commandsJSON)

            
            function resetValues(){
                command.value = ''; message.value = ''; permission.value = ''; reply_in.value = '';
            }

            function getCommandData(commands){
                updateModal.value = true;
                commandsJSON.value.forEach(res=>{
                    if(res.command === commands){
                        command.value = res.command;
                        message.value = res.response;
                        permission.value = res.permission;
                        reply_in.value = res.reply_in;
                        return;
                    }
                });
            }
            function addCommand(){

                

                if(command.value === '') return console.log("The command field is required.");
                else{
                    for(const [key, item ] of Object.entries(commandsJSON.value)){
                        if(item.command === command.value){
                            console.log(key)
                            return console.log('The command is alredy taken')
                        }
                    }
                }
                if(!command.value.includes("!") || command.value.includes("!") && command.value.length === 1) return console.log("You need to add the char \"!\" and add some letters after.")
                if (message.value === '') return console.log('The message field is required.');
                if (permission.value === '') return console.log('Select a permission.');
                if (reply_in.value === '') return console.log('Select a reply_in.');

                const items = {
                    command: command.value,
                    response: message.value,
                    permission: permission.value,
                    reply_in: reply_in.value
                }
                store.dispatch('addCommand', items)
                window.electron.writeJSON(path.join('/json/commands.json'), items)
                addModal.value = false;

            }

            function editCommand(){
                const items = {
                    command: command.value,
                    response: message.value,
                    permission: permission.value,
                    reply_in: reply_in.value
                };

                for(const [key, item] of Object.entries(commandsJSON.value)){
                    if(item.command === items.command){
                        console.log(key)
                        item.command = items.command;
                        item.response = items.response;
                        item.permission = items.permission;
                        item.reply_in = items.reply_in;
                    }
                }
                updateModal.value = false;
                window.electron.editCommandJSON(path.join('/json/commands.json'), items)
            }

            function deleteCommand(command){
                for(const [key, item] of Object.entries(commandsJSON.value)){
                    if(item.command === command){
                       commandsJSON.value.splice(key, 1)
                    }
                }
                window.electron.deleteCommandJSON('/json/commands.json',command);
            }

            

        return{
            // data
                commandsJSON,
                addModal,
                updateModal,
                command,
                message,
                permission,
                reply_in,
            // functions
                addCommand, 
                getCommandData,
                editCommand,
                resetValues,
                deleteCommand
        }
    }
}

</script>

<style scoped lang="scss">
     .panel-commands{
         position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 90%;
        height: 85vh;

        header{
                display: flex;
                justify-content: space-around;
                width: 100%;
                align-items: center;

                h3{
                    font-size: 3rem;
                    color: white;
                    margin-bottom: 0;
                    padding: 0;

                    svg{
                        height: 2rem;
                        width: 2rem;
                    }
                }

                .add-btn{
                    width: 100px;
                    height: 30px;
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

        svg{
            height: 20px;
            width: 20px;
        }

        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: white;
        }

        
        .commands{
            background-color: white;
            border: 10px solid #1E2E39;
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
                    width: 100px;
                    height: 30px;
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
                display: grid;
                grid-template-columns:  auto auto auto;
                width: 1058px;
                border-radius: 15px 15px 0 0;
                height: 92px;
                color: white;
                justify-items: center;
                align-items: center;
                font-size: 2rem;
                background: #1E2E39;
                margin: 0 auto;
                margin-top: 33px;
                text-align: justify;
            }

            .command-panel{
               
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 75%;
                width: 1058px;
                background-color: #fff;
                overflow-y: scroll;
                margin: 5px auto;
                &::-webkit-scrollbar {
                    display: none;
                    width: 10px;
                }

                &::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }

                &::-webkit-scrollbar-thumb {
                    background: #D56DFA; 
                }


                .command{
                    display: grid;
                    grid-template-columns:  auto 450px 300px;
                    justify-items: center;
                    align-items: center;
                    font-weight: bold;
                    width: 100%;
                    height: 5rem;
                    margin-top: 5px;
                    text-align: justify;
                    white-space: normal;

                    div{
                        display: flex;
                        justify-content: space-evenly;
                        width: 100%;

                        .btn{
                            color: white;
                            border: none;
                            border-radius: 10px;
                            width: 46px;
                            height: 41px;
                            transition: all ease-in-out .2s;

                            &:hover{
                                cursor: pointer;
                            }

                            &:nth-child(1){
                            background-color: #007CC7;
                            }
                            &:nth-child(1):hover{
                                background-color: #0065a3;
                            }
                            &:nth-child(2){
                                background-color: red;
                            }
                            &:nth-child(2):hover{
                                background-color: rgb(185, 0, 0);
                            }
                        }
                    }

                }
            }
        }

        
    }

     .modal-add{
             position: absolute;
            top: 2.2rem;
            width: 92.5%;
            height: 95.9vh;
            background-color: #000000cc;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;

            form{
                width: 30%;
                height: 70%;
                padding: 20px;
                border-radius: 33px;
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: justify;
                border: 10px solid #585858;

                header{
                    font-size: 2rem;
                }

                label{
                    margin-top: 2rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                    width: 350px;
                }

                textarea{
                    width: 350px;
                }

                select{
                    border: none;
                    outline: none;
                    cursor: pointer;
                    height: 45px;
                    width: 150px;
                    line-height: 1.1;
                    background-color: #7c3d64;
                    color: white;
                    font-size: 20px;
                    -webkit-appearance: none;   
                    text-indent: 32px;
                    text-overflow: '';

                    &:nth-child(1){
                        text-indent: 10px;
                        width: 40px;
                    }
                    &[multiple] {
                        height: 6rem;
                    }
                    option{
                        outline: none;
                        background-color:white;
                        font-size: 15px;
                        color: #000;
                        &:hover{
                            background-color: white;
                        }
                    }
                }
                

                input[type="text"]{
                    width: 350px;
                }

                input, button{
                    height: 40px;
                    width: 100px;
                }

                footer{
                    width: 60%;
                    margin-top: 2.5rem;
                    display: flex;
                    justify-content: space-evenly;
                }
            }
        }
</style>