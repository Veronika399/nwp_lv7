import axios from "axios"

const actions = {
    // AUTH
    login(context, user) {
      context.commit('login', user)
      context.dispatch('readProjects');
      context.dispatch('readUsers');
    },
    logout(context) {
      context.commit('logout')
    },
    // PROJECTS CRUD
    async readProjects(context){
        await axios.get(
          "http://localhost:4000/api/projects"
        ).then(response => {
          context.commit('setProjects', response.data)
        })
    },
    async createProject(context, project){
        await axios.post("http://localhost:4000/api/projects", project)
          .then(response => {
              context.commit('addProject', response.data);
          })
          .catch(err => {
              console.log(err);
          });
    },
    async updateProject(context, project){
        await axios.put(`http://localhost:4000/api/projects/${project.id}`, {
                name: project.name,
                price: project.price,
                tasks_done: project.tasks_done,
                members: project.members,
                description: project.description
            })
            .then(response => {
                context.commit('updateProject', response.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    async deleteProject(context, id){
        await axios.delete(`http://localhost:4000/api/projects/${id}`)
            .then(res => {
                context.commit('deleteProject', id);
            })
            .catch(err => {
                console.log(err)
            })
    },
    async archiveProject(context, id){
        await axios.post(`http://localhost:4000/api/archive/${id}`)
            .then(res => {
                context.commit('updateProject', res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            })
    },
    async readUsers(context){
        await axios.get('http://localhost:4000/api/users')
            .then(res => {
                context.commit('setUsers', res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default actions;