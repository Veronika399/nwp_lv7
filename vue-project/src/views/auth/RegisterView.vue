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

            <div class="mt-2">
                <FormLabel value="Confirm password"/>
                <FormInput v-model="password_confirm" id="password_confirm" name="password_confirm" type="password" class="w-full"/>
            </div>

            <div class="grid justify-items-stretch mt-4">
                <div class="justify-self-end">
                    <TheButton @click="register">Register</TheButton>
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

export default{
    components: { FormInput, FormLabel, FromTextArea, TheButton },
    data(){
        return{
            username: '',
            password: '',
            password_confirm: '',
        }
    },
    methods:{
        async register(){
            if(this.password === this.password_confirm){
                await this.axios.post('http://localhost:4000/api/register',{
                    username: this.username,
                    password: this.password
                }).then(res => {
                    if(res.status === 200){
                        this.$store.dispatch('login', res.data.user)
                        this.$router.push('/');
                    }
                }).catch(err => {
                    if(err.response.data){
                        alert(err.response.data.message);
                    }
                    else{
                        console.log(err);
                    }
                })
            }
        }
    }
}

</script>