import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

import Home from '../views/Home.vue'
import Project from '../views/project.vue'
import Article from '../views/article.vue'
import Articlelist from '../views/Articleliste.vue'



Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/article-list");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: Home,
    beforeEnter: ifNotAuthenticated,
    meta: {
      plainLayout: true,
    },
  },
  {
    path: '/projet',
    name: 'Project',
    component: Project,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/article-list',
    name: 'ArticleList',
    component: Articlelist,
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  routes
})

export default router
