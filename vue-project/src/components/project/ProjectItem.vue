<script setup>
import TheButton from '../TheButton.vue';
const props = defineProps({
    id: String,
    name: String,
    price: Number,
    owner: String,
    tasks_done: String,
    description: String,
    created_at: Date,
    updated_at: Date,
    members: Array
})
</script>

<template>
    <div class="rounded-lg p-3 project-item min-w-fit">
        <div class="flex justify-between">
            <div class="flex flex-col">
                <div>
                    <span>Name:&nbsp;</span> {{ name }}
                </div>
                <div>
                    <span>Price:&nbsp;</span> {{ price }}
                </div>
                <div>
                    <span>Owner:&nbsp;</span> {{ owner }}
                </div>
                <p><span>Tasks done:&nbsp;</span> {{ tasks_done }}</p>
                <div class="flex">
                    <span>Project members:&nbsp;</span>
                        
                    <div v-for="member in members" class="px-1">
                        {{ member.username }}
                    </div>
                </div>
                <p><span>Description:&nbsp;</span> {{ description }}</p>
            </div>
            <div class="flex flex-col flex-none min-w-fit w-2/12 px-2">
                <div>
                    <span>Created at:&nbsp;</span> {{ dateToString(created_at) }}
                </div>
                <div>
                    <span>Updated at:&nbsp;</span> {{ dateToString(updated_at) }}
                </div>
                <div class="flex justify-between mt-2">
                    <TheButton type="button" @click="edit()"> Edit</TheButton>
                    <TheButton type="button" @click="remove()"> Delete</TheButton>
                </div>
                
            </div>
        </div>
        
    </div>
    

</template>

<script>
export default {
    methods:{
        dateToString(date){
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        },
        edit(){
            this.$router.push({name: 'update', params: {id: this.id}});
        },
        remove(){
            this.$store.dispatch('deleteProject', this.id);
        }
    }
}
</script>

<style scoped>
span{
    font-weight: bold;
    color: #18A576;
}
.project-item{
    background-color: var(--vt-c-divider-light-1);
}
</style>