import axios from "axios";
// import Vue from "vue";
const state = {
  article: [],
};

const getters = {
  Articles: (state) => {
    let article = state.article
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    for (let index = 0; index < article.length; index++) {
      let date = new Date(article[index].created_at);
      article[index].created_at = date.toLocaleDateString("fr", options)
    }
    console.log(article);
    return article;
  },
};

const mutations = {
  SET_ARTICLES(state, data) {
    state.article = data;
  },
};

const actions = {
  init_article: ({ commit }) => {
    axios
      .get("article/list")
      .then((res) => {
        commit("SET_ARTICLES", res.data);
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
