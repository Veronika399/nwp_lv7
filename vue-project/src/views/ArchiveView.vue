<script setup>
import ProjectList from '../components/project/ProjectList.vue';
</script>

<template>
  <ProjectList :projects="projects"></ProjectList>
</template>

<script>
export default {
  name: "ArchiveView.vue",
  computed:{
    projects(){
        let projects = this.$store.getters.projects;
        const user = this.$store.getters.user;
        if(user && projects){
            // Archived projects
            projects = projects.filter(project => Boolean(project.finished_at));
            // Projects where current user is a member or is an owner
            projects = projects.filter(project => project.members.find(member => member._id === user.id) || project.owner.id === user.id);
            // Projects where current user isn't the owner
            return projects;
        }
        return {};
    }
  },
}
</script>