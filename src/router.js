import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home.vue'
import aboutPage from './views/about.vue'
import loginPage from './views/login.vue'
import registerPage from './views/register.vue'
import resetPasswordPage from './views/resetPassword.vue'
import dropPluginPage from './views/dropPlugin.vue'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/plugins',
            name: 'plugins',
            component: dropPluginPage
        },
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
            path: '/resetPsd',
            name: 'resetPsd',
            component: resetPasswordPage
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})