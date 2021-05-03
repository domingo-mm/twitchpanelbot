<template>
    <div class="login">
        <div class="modal-login">   
        <div class="bg"></div>
            <form action="">
                <h1>
                    <svg viewBox="0 0 512 512">
                        <use href="../assets/icons/twitch-brands.svg#twitch"></use>  
                    </svg>
                    TWITCH BOT PANEL
                </h1>
                <!-- <div class="textInput">
                    <input type="text" class="form-control" placeholder="AUTH2_TOKEN" />
                    <label class="control-label">AUTH2_TOKEN</label>
                </div> -->
                <div class="toolTip">?
                        <i class="toolTipText">{{message}}</i>
                </div>
                <div class="textInput">
                    <input type="text" class="form-control" placeholder="outh2_token" v-model="outh2_token"/>
                    <label class="control-label">outh2_token</label>
                </div>
                
                <a href=""  id="authorized" >LOGIN TWITCH</a>
            </form>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Config from "../store/json/config.json";

export default {
    name: "Login",
    setup() {

        const outh2_token = ref('');
        const message = ref(`Give the outhtoken from the website: https://twitchapps.com/tmi/`);
        const data = {};

        onMounted(()=>{
            const tokenBtn = document.querySelector("#authorized");


            if(localStorage.getItem("outh2_token")){
                outh2_token.value = localStorage.getItem("outh2_token");
            }

            if (document.location.hash && document.location.hash != '') {
                const parsedHash = new URLSearchParams(window.location.hash.replace("#/", ""));
                if(parsedHash.get('access_token')){
                    
                    
                    const GetTwitchData = async (resource)=>{
                        const response = await fetch(
                        resource,
                        {
                            "headers": {
                            "Client-ID": Config.client_id,
                            "Authorization": `Bearer ${parsedHash.get('access_token')}`
                            }
                        }
                        );

                        const data = await response.json();
                        return data;
                    };

                   GetTwitchData('https://api.twitch.tv/helix/users')
                        .then(async  resp =>{
                            const {id, display_name} = await resp.data[0];
                                data.id = id;
                                data.userName = display_name;
                                data.botName = display_name;
                        localStorage.setItem("data", JSON.stringify(data));
                        localStorage.setItem("access_token", parsedHash.get('access_token'))
                    }).catch(err=>console.log(err));
                }
                }else if(document.location.search && document.location.searcha !== ''){
                    const parsedHash = new URLSearchParams(window.location.hash.replace("#/", ""));
                    const parsedParams = new URLSearchParams(window.location.search);
                    if(parsedHash.get('erros_description')){
                        const accessToken ={};
                        accessToken.textContent = parsedParams.get('error') + '-' + parsedParams.get('erros_description');
                    }
            }

                
            tokenBtn.addEventListener('click', ()=>{
                const input = document.querySelector('.form-control');
                if(outh2_token.value !== ""){
                    const client_id = Config.client_id;
                    const redirect = `http://localhost:8080`;
                    const scope = Config.scope;
                    localStorage.setItem("outh2_token", outh2_token.value);
                    tokenBtn.setAttribute("href", `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect.replace('#/', '')}&response_type=token&scope=${scope}`);
                }else input.classList.add("error");
            })
        });


        return{
            outh2_token,
            message
        }
    }
}
</script>

<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100%;
    }

    .modal-login{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .bg {
            width: 100%;
            height: 100%;
            background-color: #5f0f40;
            clip-path: polygon(0% 0%, 0% 5%, 100% 100%, 100% 0%);
        }

        form{
            display: flex;
            position: absolute;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 20px;
            width: 500px;
            height: 600px;
            border: 10px solid #1E2E39;

            h1{
                svg{
                    width: 30px;
                    height: 30px;
                }
            }

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

            }

            
                .toolTip{
                    position: absolute;
                    font-size: 1.5rem;
                    left: 65%;
                    bottom: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #14213d;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px; 
                    color: white;
                    z-index: 2;
                    
                    &:hover .toolTipText{
                        opacity: 1;
			            transform: translate(-50%, 0);
                        display: block;
                    } 

                    .toolTipText{
                        font-size: 1rem;
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

                .error{
                     border: 2px solid red !important;
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