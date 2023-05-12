<script setup>
import ProjectList from '../components/project/ProjectList.vue';
</script>

<template>
  <div class="flex flex-col">
    <div ><h2 class="text-3xl">Hello <span>{{ user.username }}</span>!</h2></div>
    <button type="button" class="mt-0.5" @click="logout">Logout</button>
  </div>
  
  <br>
  <span class="text-xl">Your projects</span>
  <ProjectList class="mt-4" :projects="projects"></ProjectList>

  <br>
  
</template>

<script>
export default {
  name: "HomeView.vue",
  computed:{
    projects(){
      let projects = this.$store.getters.projects;
      const user = this.$store.getters.user;
      if(user && projects){
        // Projects that aren't archived
        projects = projects.filter(project => !project.finished_at);
        // Projects where the user is the owner
        return projects.filter(project => project.owner.id === user.id);
      }
      return {};
    },
    user(){
      return this.$store.getters.user;
    }
  },
  methods:{
    async logout(){
      await this.axios.get('http://localhost:4000/api/logout')
        .then(res => {
          console.log(res.data);
          this.$store.dispatch('logout');
          this.$router.replace({path: '/login'});
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
span{
    font-weight: bold !important; 
    color: #18A576;
}

</style>