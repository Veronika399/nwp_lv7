<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
<div class="grid justify-items-center">
    <div class="pb-4">
        <header>
            <nav>
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </nav>
    </header>  
  </div>
</div>
</template>
