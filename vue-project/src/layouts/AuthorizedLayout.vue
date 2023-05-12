<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div>
        <header>
            <nav>
                <RouterLink to="/">Pocetna</RouterLink>
                <RouterLink to="/create">Kreirati</RouterLink>
                <RouterLink to="/projects">Projekti</RouterLink>
                <RouterLink to="/archive">Arhiva</RouterLink>
            </nav>
        </header>  
    </div>
</template>

