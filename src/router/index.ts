import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Money from  '../views/Money.vue'
import Label from  '../views/Label.vue'
import Statistics from '../views/Statistics.vue'
import NotFind from '../views/NotFind.vue'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path:'/',
      redirect:'/Money'
    },
    {
      path:'/money',
      component:Money
    },
    {
      path:'/label',
      component:Label
    },
    {
      path:'/statistics',
      component:Statistics
    },
    {
      path:'*',
      component:NotFind
    }
]

const router = new VueRouter({
  routes
})

export default router