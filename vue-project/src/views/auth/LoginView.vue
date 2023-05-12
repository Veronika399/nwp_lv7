<template>
    <div class="w-1/3">
        <form @submit.prevent="login" class="" >
            <div>
                <FormLabel value="Username"/>
                <FormInput v-model="username" id="username" name="username" type="text" class="w-full"/>
            </div>
            
            <div class="mt-2">
                <FormLabel value="Password"/>
                <FormInput v-model="password" id="password" name="password" type="password" class="w-full"/>
            </div>

            <div class="grid justify-items-stretch mt-4">
                <div class="justify-self-end">
                    <TheButton>Log In</TheButton>
                </div>
            </div>
        </form>
    </div>

</template>


<script>
import FormInput from "@/components/form/FormInput.vue";
import FormLabel from "@/components/form/FormLabel.vue";
import FromTextArea from "@/components/form/FromTextArea.vue";
import TheButton from "@/components/TheButton.vue";
import axios from "axios";

export default{
    components: { FormInput, FormLabel, FromTextArea, TheButton },
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods:{
        async login(){
            await axios.post('http://localhost:4000/api/login',{
                username: this.username,
                password: this.password
            }).then((res) => {
                this.$store.dispatch('login', res.data.user);
                this.$router.push('/');
            })
            .catch(err => {
                if(err.response.status === 401){
                    alert('User with those credentials doesn\'t exist');
                }
                this.password = '';
            })
        }
    },
}

</script>
