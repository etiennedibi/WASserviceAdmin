import axios from "axios";
// import Vue from "vue";
const state = {
  project: [],
};

const getters = {
  Project: (state) => {
    let project = state.project
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    for (let index = 0; index < project.length; index++) {
      let date = new Date(project[index].created_at);
      project[index].created_at = date.toLocaleDateString("fr", options)
    }
    return project;
  },
};

const mutations = {
  SET_PROJECTS(state, data) {
    state.project = data;
  },
};

const actions = {
  init_project: ({ commit }) => {
    axios
      .get("project/list")
      .then((res) => {
        commit("SET_PROJECTS", res.data);
      })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
