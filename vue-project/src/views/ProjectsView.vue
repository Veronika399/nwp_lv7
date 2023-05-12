<script setup>
import ProjectList from '../components/project/ProjectList.vue';
</script>

<template>
  <ProjectList :projects="projects"></ProjectList>
</template>

<script>
export default {
  name: "ProjectsView.vue",
  computed:{
    projects(){
        let projects = this.$store.getters.projects;
        const user = this.$store.getters.user;
        if(user && projects){
            // Projects that aren't archived
            projects = projects.filter(project => !project.finished_at);
            // Projects where current user is a member
            projects = projects.filter(project => project.members.find(member => member._id === user.id));
            // Projects where current user isn't the owner
            return projects.filter(project => project.owner.id !== user.id);
        }
        return {};
    }
  },
}
</script>