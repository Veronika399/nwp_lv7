<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
    <input class="rounded-md shadow-sm px-1 w-1/3 h-7 mt-1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input">
</template>


<style scoped>
input{
    background-color: var(--vt-c-text-light-2);
    
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    border-radius: 0;
    -webkit-box-shadow: 0 0 0 30px var(--vt-c-black-soft) inset !important;
    -webkit-text-fill-color: var(--vt-c-text-dark-2) !important;
    
}

</style>