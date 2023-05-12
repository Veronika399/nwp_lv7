<template>
    <div class="w-3/4 form-div">
        <form @submit.prevent="submit">
            <div class="flex justify-between">
                <div class="w-full">
                    <div>
                        <FormLabel value="Name"/>
                        <FormInput class="w-1/2" v-model="project.name" id="name" name="name" type="text" :disabled="!isOwner || isArchived"/>
                    </div>
                    <div class="mt-2">
                        <FormLabel value="Price"/>
                        <FormInput class="w-1/2" v-model="project.price" id="price" name="price" type="number" :disabled="!isOwner || isArchived"/>
                    </div>
                </div>
                <div>
                    <TheButton @click="archive()" class="m-2" type="button" v-if="isOwner && !isArchived">Archive</TheButton>
                </div>
            </div>

            <div class="mt-2">
                <FormLabel>Project members</FormLabel>
                <div class="flex">
                    <div v-for="user in project.members" class="pr-2 pt-1">
                        <TheButton class="px-3" type="button" @click="changeMember(user)" :disabled="!isOwner || isArchived">{{ user.username }}</TheButton>
                    </div>
                </div>
                <FormLabel>Add members</FormLabel>
                <div class="flex">
                    <div v-for="user in nonMembers" class="pr-2 pt-1">
                        <TheButton class="px-3" type="button" @click="changeMember(user)" :disabled="!isOwner || isArchived">{{ user.username }}</TheButton>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <FormLabel value="Tasks Done"/>
                <FromTextArea v-model="project.tasks_done" id="tasks_done" name="tasks_done" type="text" :disabled="isArchived"/>
            </div>

            <div class="mt-2">
                <FormLabel class="mb-1" value="Description"/>
                <FromTextArea rows="3" v-model="project.description" :disabled="!isOwner || isArchived"/>
            </div>

            <div class="grid justify-items-stretch mt-2">
                <div class="justify-self-end">
                    <TheButton v-if="!isArchived">Submit</TheButton>
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
  computed:{
      project(){
        // Get project by id from query param
        return this.$store.getters.project(this.$route.params.id) ?? {};
      },
      nonMembers(){
        let users = this.$store.getters.users;
        const members = this.project.members;
        if(members && users){
            // Get all users that aren't already members
            users = users.filter(user => !members.find(member => member._id === user._id))
            // Owner can't be added as a project member
            return users.filter(user => user._id !== this.project.owner.id);
        }
        return {};
      },
      isOwner(){
          const user = this.$store.getters.user;
          const owner = this.project.owner;
          if(user && owner){
            return user.id === owner.id;
          }
          return false;
      },
      isArchived(){
          return this.project.finished_at;
      }
  },
  methods:{
      submit(){
        this.update();
        // Go to previous page
        this.$router.go(-1);
      },
      archive(){
          this.$store.dispatch('archiveProject', this.project._id);
          this.$router.push({name: 'archive'});
      },
      changeMember(user){
        // Get index of the user in project members
        const index = this.project.members.findIndex(member => member._id === user._id);
        // If the user isn't a member, index will be negative and the user should be added
        // Otherwise his index will be found and greater than zero and should be removed
        if(index<0){
            this.project.members.push(user);
        }else{
            this.project.members.splice(index, 1);
        }
        this.update();
      },
      update(){
          this.$store.dispatch('updateProject', {
            id: this.project._id,
            name: this.project.name,
            price: this.project.price,
            tasks_done: this.project.tasks_done,
            members: this.project.members,
            description: this.project.description
        });
      }
  },
}
</script>

