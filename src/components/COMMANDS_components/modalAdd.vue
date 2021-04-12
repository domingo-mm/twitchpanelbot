<template>
    <div class="modal-add">
        <form action="">
            <select name="char" id="char">
                <option value="!">!</option>
                <option value="@">@</option>
                <option value="#">#</option>
                <option value="$">$</option>
            </select>

            <input type="text" name="command" placeholder="Command">
            <input type="text" name="message" placeholder="Message">
            
            <select name="type" id="type">
                <option value="message">Message</option>
                <option value="command">Command</option>
            </select>

            <input type="submit" value="DODAJ" id="add">
        </form>
    </div>
</template>

<script>
export default {
    name: "ModalAdd",
    setup() {
        
    },
}
</script>

<style scoped lang="scss">
    .modal-add{
        form{
            position: absolute;
            top: 10%;
            left: 16%;
            width: 40%;
            height: 5%;
            padding: 20px;
            background-color: white;
            display: flex;
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
            

            input{
                height: 40px;
                width: 100px;
            }

            input[type="text"]{
                width: 140px;
            }
        }
    }
</style>