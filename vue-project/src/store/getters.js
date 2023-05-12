const getters = {
    projects(state){
      return state.projects;
    },
    project: (state) => (id) => {
        return state.projects.find(x => x._id === id);
    },
    auth(state){
      return state.user.auth;
    },
    user(state){
      return state.user;
    },
    users(state){
      return state.users;
    }
  }

export default getters; 