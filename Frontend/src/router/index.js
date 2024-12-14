import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AddPostView from '@/views/AddPostView.vue'
import SignupView from '@/views/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPageView.vue')
  
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/new-post',
    name: 'AddPost',
    component: AddPostView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router