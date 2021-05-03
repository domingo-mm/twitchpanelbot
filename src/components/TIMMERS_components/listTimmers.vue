<template>
    <transition name="fade">
        <div class="modal-add" v-if="addModal || updateModal">
            <form action="">
                <header>
                    <h4>Add Timer</h4>
                </header>
                <label for="title">Title: </label>
                <input type="text" name="title" v-model="title" placeholder="title" :disabled="updateModal">
                <label for="response">Response:</label>
                 <textarea type="text" name="response" v-model="message" placeholder="Insert your chat response here."></textarea>
                <label for="delay">Delay_in: </label>
                <input type="text" name="delay" v-model="delay_in" placeholder="In minutes" >
                <footer>
                    <button  value="ADD" id="add" @click="addTimer" v-if="addModal">ADD</button>
                    <button  value="EDIT" id="add" @click="editTimer" v-else>EDIT</button>
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
                TIMERS
            </h3> 
            <div class="btn add-btn" @click="addModal = true, resetValues, title = '', message ='', delay_in = ''">Add Timer</div>
        </header>
        <div class="commands">
           <div class="headers">
                   <span>title</span>
                   <span>response</span>
                   <span>operations</span>
            </div>
            <div class="command-panel">
               <div class="command" v-for="timer in timers" :key="timer">
                   <span>
                       {{timer.title}}
                    </span>
                   <span>
                       {{timer.response}}
                    </span>
                   <div class="btns">
                       <button class="btn" @click="getTimerData(timer.title)">
                           <svg viewBox="0 0 512 512">
                                <use href="../../assets/icons/pen-solid.svg#fa-pen"></use>  
                            </svg>
                        </button>
                       <button class="btn" @click="deleteTimer(timer.title)">
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import path from "path";

export default {
    name: "ListTimmers",
    setup() {
        // data
            const store = useStore();
            const title = ref('');
            const message = ref('');
            const delay_in = ref(0);
            const timers = computed(()=> {
                return store.state.timer;
            });

            const addModal = ref(false);
            const updateModal = ref(false);

            

            function getTimerData(timer){
                updateModal.value = true;
                timers.value.forEach(res=>{
                    if(res.title === timer){
                        title.value = res.title;
                        message.value = res.response;
                        delay_in.value = res.delay_in;
                        return;
                    }
                });
            }


            function addTimer(){

                if(title.value === '') return console.log("The title field is required.");
                else{
                    for(const [key, timer] of Object.entries(timers.value)){
                        if(timer.title === timers.value){
                            console.log(key)
                            return console.log('The Timer is alredy taken')
                        }
                    }
                }
                if (message.value === '') return console.log('The message field is required.');
                if (delay_in.value === '') return console.log('The delay field is required.');

                const items = {
                    title: title.value,
                    response: message.value,
                    delay_in: delay_in.value
                }
                store.dispatch('addTimer', items)
                window.electron.writeJSON(path.join('/json/timers.json'), items)
                addModal.value = false;
                this.$router.reload();
            }


            function editTimer(){
                const items = {
                    title: title.value,
                    response: message.value,
                    delay_in: delay_in.value,
                };

                timers.value.forEach(timer =>{
                     if(timer.title === items.title){
                        timer.title = items.title;
                        timer.response = items.response;
                        timer.delay_in = items.delay_in;
                    }
                })
                updateModal.value = false;
                window.electron.editTimerJSON(path.join('/json/timers.json'), items);
                this.$router.reload();
            }

            function deleteTimer(timer){
                for(const [key, item] of Object.entries(timers.value)){
                    if(item.title === timer){
                       timers.value.splice(key, 1)
                    }
                }
                window.electron.deleteTimerJSON('/json/timers.json', timer);
                this.$router.reload();
            }

            

        return{
            // data
                timers,
                addModal,
                updateModal,
                title,
                message,
                delay_in,
            // functions
                addTimer, 
                getTimerData,
                editTimer,
                deleteTimer
        }
    },
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

        
        .commands{
            background-color: white;
            border: 10px solid #1E2E39;
            width: 90%;
            height: 90%;
            border-radius: 20px;


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
                    grid-template-columns:  auto 500px 300px;
                    justify-items: center;
                    align-items: center;
                    font-weight: bold;
                    width: 100%;
                    height: 5rem;
                    margin: 0 auto;
                    text-align: justify;
                    white-space: normal;

                    div{
                        display: flex;
                        justify-content: space-evenly;
                        width: 100%;

                        .btn{
                            border: none;
                            border-radius: 10px;
                            color: white;
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