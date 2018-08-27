import Vue from 'vue'
import Router from 'vue-router'
import Page from './../components/Page.vue'
import ErrorPage from '../components/ErrorPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
    }
  ]
})
