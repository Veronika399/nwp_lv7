<script setup>
import ProjectItem from './ProjectItem.vue';
const props = defineProps({
    projects: Array
})
</script>

<template>
    <div class="w-3/4">
        <div v-for="project in projects" class="mb-4" :key="project.id">
            <ProjectItem 
            :id="project._id"
            :name="project.name"
            :price="Number(project.price)"
            :owner="project.owner.username"
            :tasks_done="project.tasks_done"
            :description="project.description"
            :created_at = "new Date(project.created_at)"
            :updated_at = "new Date(project.updated_at)"
            :members = "project.members"
            />
        </div>
    </div>
</template>