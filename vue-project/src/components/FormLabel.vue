<script setup>
defineProps(['value']);
</script>

<template>
    <label class="block">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>

<style scoped>
label{
    font-weight: bold !important; 
    color: #18A576;
}

</style>