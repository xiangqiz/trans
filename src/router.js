import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import aboutPage from './views/about.vue'
import loginPage from './views/login.vue'
import registerPage from './views/register.vue'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: homePage
        },
        {
            path: '/about',
            name: 'about',
            component: aboutPage
        },
        {
            path: '/register',
            name: 'register',
            component: registerPage
        },
         {
            path: '/login',
            name: 'login',
            component: loginPage
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})