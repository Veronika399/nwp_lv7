import Vuex from 'vuex'
import axios from "axios";
import actions from './actions'
import mutations from './mutations';
import getters from './getters';

const store = new Vuex.Store({
    state () {
      return {
        user: {
          auth: null,
          username: null,
          id: null
        },
        projects: [],
        users: []
      }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
})

export default store;
