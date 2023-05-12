const mutations = {
    // AUTH
    login (state, user) {
        state.user.auth = true;
        state.user.id = user.id;
        state.user.username = user.username
    },
    logout(state){
        state.user.auth = false;
        state.user.id = null;
        state.user.username = null
    },
    // PROJECT CRUD
    setProjects(state, projects){
      state.projects = projects;
    },
    addProject(state, project){
        state.projects.push(project);
    },
    deleteProject(state, id){
        state.projects = state.projects.filter(item => item._id !== id);
    },
    updateProject(state, project){
        let index = state.projects.findIndex(( object => object._id === project._id));
        state.projects.splice(index, 1, project);
    },
    // USERS
    setUsers(state, users){
        state.users = users;
    }
  }

export default mutations;