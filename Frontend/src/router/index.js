import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AddPostView from '@/views/AddPostView.vue'
import SignupView from '@/views/SignupView.vue'
import EditPostView from '@/views/EditPostView.vue'
import auth from '@/auth'

const routes = [
  {
    path: '/about',
    name: 'about',
    
    component: HomeView
  },
  {
    path: '/',
    name: 'home',
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
  },
  {
    path: '/edit-post/:postId',
    name: 'EditPost',
    component: EditPostView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/' || to.path === '/login' || to.path === '/signup') {
    return next();
  }

  const isAuthenticated = await auth.authenticated();

  if (isAuthenticated) {
    next(); 
  } else {
    next('/login');
  }
})

export default router
