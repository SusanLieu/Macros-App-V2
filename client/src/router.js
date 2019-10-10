import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import Diary from './views/Diary.vue'
import Diet from './views/Diet.vue'
import Accounts from './views/Accounts.vue'
import ShowAccount from './views/ShowAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
      // props: true
    },
    {
      path: '/diary',
      name: 'diary',
      component: Diary
    },
    {
      path: '/diet',
      name: 'diet',
      component: Diet
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
    {
      path: '/showaccount',
      name: 'showAccount',
      component: ShowAccount
    }
  ]
})
