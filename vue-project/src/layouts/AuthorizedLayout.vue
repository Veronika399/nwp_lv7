<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div>
        <header>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/create">Create</RouterLink>
                <RouterLink to="/projects">Projects</RouterLink>
                <RouterLink to="/archive">Archive</RouterLink>
            </nav>
        </header>  
    </div>
</template>

