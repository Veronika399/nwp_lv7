const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{ type: String,required: true },
    price:{ type: Number, required: true },
    tasks_done: String,
    description: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    finished_at:{ type: Date, required: false },
    owner:{
        id: { type: String, required: true },
        username : { type: String, required: true }
    },
    members:[
        {
            id: { type: String, required: true },
            username : { type: String, required: true }
        }
    ]
})

const Project = mongoose.model('project', projectSchema);
module.exports = Project;