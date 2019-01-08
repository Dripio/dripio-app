import { firebaseMutations } from 'vuexfire'
const store = new Vuex.Store({
  state: {
    todos: [], // Will be bound as an array
    user: null, // Will be bound as an object
  },
  mutations: {
    // your mutations
    ...firebaseMutations,
  },
})
