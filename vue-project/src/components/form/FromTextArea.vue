
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template><textarea class="rounded-md w-full p-1 mt-1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input"></textarea></template>


<style scoped>
textarea{
    background-color: var(--vt-c-text-light-2);
}
</style>