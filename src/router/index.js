import Vue from 'vue'
import Router from 'vue-router'
import Converter from '../views/Converter'
import Dashboard from '../views/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Converter',
      component: Converter
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
