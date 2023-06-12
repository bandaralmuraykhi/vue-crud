import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import AddView from '../views/AddView.vue'
import AboutView from '../views/AboutView.vue'
import EditView from '../views/EditView.vue'
import SigninView from '../views/SigninView.vue'
import LayoutView from '../views/LayoutView.vue'
import { useUserStore } from '@/stores/user'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'layout', 
      component: LayoutView, 
    
      children : [
        { path: '/', name: 'home', component: HomeView },
        { path: '/about', name: 'about', component: AboutView },
        { path: '/list', name: 'list', component: ListView },
        { path: '/add', name: 'add', component: AddView },
        { path: '/edit/:id', name: 'edit', component: EditView , props: true },
      ]
    },
    { path: '/sign-in', name: 'sign-in', component: SigninView },
  ]
})

router.beforeEach(async (to, from) => {
  const user = useUserStore()
  if (
    // make sure the user is authenticated
    !user.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'sign-in'
  ) {
    // redirect the user to the login page
    return { name: 'sign-in' }
  }
})


export default router
