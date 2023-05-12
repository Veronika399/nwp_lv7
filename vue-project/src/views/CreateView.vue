<template>
    <div class="w-3/4 form-div">
        <form @submit.prevent="submit">
            <div>
                <FormLabel value="Name"/>
                <FormInput v-model="name" id="name" name="name" type="text"/>
            </div>
            
            <div class="mt-2">
                <FormLabel value="Price"/>
                <FormInput v-model="price" id="price" name="price" type="number"/>
            </div>

            <div class="mt-2">
                <FormLabel value="Description"/>
                <FromTextArea rows="3" v-model="description" />
            </div>

            <div class="grid justify-items-stretch mt-2">
                <div class="justify-self-end">
                    <TheButton>Submit</TheButton>
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

export default {
  components: { FormInput, FormLabel, FromTextArea, TheButton },
  data() {
    return {
      name: '',
      price: null,
      description: ''
    }
  },
  methods:{
      submit(){
        this.$store.dispatch('createProject', {
            name: this.name,
            price: this.price,
            description: this.description
        })
        this.$router.push('/');
      }
  }
}
</script>

