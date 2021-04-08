<template>
    <div class="login">
        <div class="modal-login">   
            <form action="">
                <h1>
                    TWITCH BOT
                </h1>
                <!-- <div class="textInput">
                    <input type="text" class="form-control" placeholder="AUTH2_TOKEN" />
                    <label class="control-label">AUTH2_TOKEN</label>
                </div> -->
                <a href=""  id="authorized" @click="setBotName()">LOGIN TWITCH</a>
                <!-- <label for="">
                    <input type="checkbox" id="checkbox" v-model="checked"> BOT USERNAME &nbsp; 
                    <div class="toolTip">?
                        <i class="toolTipText">{{message}}</i>
                    </div>
                </label>
                <div class="textInput" v-if="checked">
                    <input type="text" class="form-control" placeholder="NAME_BOT" v-model="botName"/>
                    <label class="control-label">NAME_BOT</label>
                </div> -->
            </form>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Config from "../store/json/config.json"

export default {
    name: "Login",
    setup() {

        // const botName = ref('');
        const checked = ref(false);
        const message = ref("If you have an additional account twitch to use to be the BOT then check the checkbox and write the twitch username.");


        function setBotName() {
            const client_id = Config.client_id;
            const redirect = `http://localhost:8080`;
            const scope = Config.scope;
            const tokenBtn = document.querySelector("#authorized");
            tokenBtn.setAttribute("href", `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect.replace('#/', '')}&response_type=token&scope=${scope}`)
        }


        onMounted(()=>{
            if (document.location.hash && document.location.hash != '') {
                const parsedHash = new URLSearchParams(window.location.hash.replace("#/", ""));
                if(parsedHash.get('access_token')){
                    const access_token = parsedHash.get('access_token');
                    localStorage.setItem("access_token", access_token)
                }
            }else if(document.location.search && document.location.searcha !== ''){
                const parsedHash = new URLSearchParams(window.location.hash.replace("#/", ""));
                const parsedParams = new URLSearchParams(window.location.search);
                if(parsedHash.get('erros_description')){
                    const accessToken ={};
                    accessToken.textContent = parsedParams.get('error') + '-' + parsedParams.get('erros_description');
                }
            }
        });


        return{
            // botName,
            setBotName,
            checked,
            message
        }
    }
}
</script>

<style scoped lang="scss">
    .login{
        background-color: #5f0f40;
        width: 100%;
        height: 100%;
    }

    .modal-login{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 20px;
            width: 600px;
            height: 700px;

            label{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px;
                padding: 10px;

                input[type="checkbox"]{
                    width: 20px;
                    height: 20px;
                }

                .toolTip{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #14213d;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px; 
                    color: white;
                    
                    &:hover .toolTipText{
                        opacity: 1;
			            transform: translate(-50%, 0);
                        display: block;
                    } 

                    .toolTipText{
                        display: none;
                        position: absolute;
                        left: 50%;
                        bottom: 100%;
                        opacity: 0;
                        width: 200px;
                        margin-bottom: 1em;
                        padding: .5em;
                        background-color: #14213d;
                        line-height: 1.6;
                        text-align: center;
                        transform: translate(-50%, 1em);
                        transition: all .15s ease-in-out;

                        &::after{
                            content: '';
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            width: 0;
                            height: 0;
                            border: .5em solid transparent;
                            border-top-color: #14213d;
                            transform: translate(-50%, 0);
                        }
                    }
                }
            }

            .textInput{
                margin: 20px auto;
                position: relative;
                .form-control{
                    display: block;
                    line-height: 2em;
                    margin: 0;
                    padding-left: 10px;
                    height: 50px;
                    width: 100%;
                    font-size: medium;
                    border: 1px solid #f4f4f4;
                    background-color: #cacaca;
                    border-radius: 5px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    font-weight: 500;
                    outline: none;

                    &:focus {
                        border: 2px solid #5f0f40;
                    }

                    &::placeholder{
                        color:#38383898;
                    }

                    &:placeholder-shown + .control-label {
                        visibility: hidden;
                        z-index: -1;
                        transition: 0.2s ease-in-out;
                    } 

                    &:not(:placeholder-shown) + .control-label,
                    &:focus:not(:placeholder-shown) + .control-label {
                        visibility: visible;
                        z-index: 1;
                        opacity: 1;
                        transform: translateY(-10px);
                        transition: 0.2s ease-in-out transform;
                    }
                }
                .control-label {
                    display: block;
                    position: absolute;
                    opacity: 0;
                    bottom: 1.5rem;
                    color: #5d5d5d;
                    transition: 0.2s ease-in-out transform;
                    font-size: 12px;
                }

            }

            #authorized{
                cursor: pointer;
                display: block;
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #480ca8;
                text-decoration: none;
                color: white;
                width: 200px;
                height: 50px;
            }
        }
    }
</style>