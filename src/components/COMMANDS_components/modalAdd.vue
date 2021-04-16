<template>
    <div class="modal-add" v-if="modal">
        <form action="">
            <header>
                <h4>Add Custom Command.</h4>
            </header>
            <label for=""></label>
            <input type="text" :name="command" placeholder="!hello">
            <textarea type="text" :name="message" placeholder="Insert your chat response here."></textarea>
            
            <select :name="type" id="type">
                <option value="message">Message</option>
                <option value="command">Command</option>
            </select>
            <footer>
                <input type="submit" value="ADD" id="add">
                <button value="DODAJ" >CANCEL</button>
            </footer>
        </form>
    </div>
</template>

<script>
import { ref} from "vue";

export default {
    name: "ModalAdd",
    setup() {
        const modal = ref(false);
        // const char = ref('');
        // const command = ref('');
        // const message = ref('');
        // const type = ref('');

        function addCommand(){

        }

        // onMounted(()=>{
        //     console.log(char.value, command.value, message.value, type.value);
        // });


        return{
            // char,
            // command,
            // message,
            // type,
            modal,
            addCommand
        }
    },
}
</script>

<style scoped lang="scss">
    .modal-add{
        position: absolute;
        width: 94.9%;
        height: 96.6vh;
        background-color: #00000067;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        form{
            width: 40%;
            height: 40%;
            padding: 20px;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

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
            

            input, button{
                height: 40px;
                width: 100px;
            }

            input[type="text"]{
                width: 140px;
            }
        }
    }
</style>