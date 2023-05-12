<script setup>
import TheButton from './TheButton.vue';
const props = defineProps({
    id: String,
    name: String,
    price: Number,
    tasks_done: String,
    description: String,
    created_at: Date,
    updated_at: Date,
    members: String
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
                <p><span>Tasks done:&nbsp;</span> {{ tasks_done }}</p>
                <p><span>Project members:&nbsp;</span> {{ members }}</p>
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
                    <TheButton type="button" @click="redirect()"> Edit</TheButton>
                    <TheButton type="button" @click="remove()"> Delete</TheButton>
                </div>
                
            </div>
        </div>
        
    </div>
    

</template>

<script>
export default {
    emits:['projectRemove'],
    methods:{
        dateToString(date){
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        },
        redirect(){
            this.$router.push({name: 'update', params: { 
                id: this.id,
                name: this.name,
                price: this.price,
                tasks_done: this.tasks_done,
                members: this.members,
                description: this.description
            }});
        },
        remove(){
            this.axios.delete(`http://localhost:4000/api/projects/${this.id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            this.$emit('projectRemove', this.id);
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