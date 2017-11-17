import Vue from 'vue'
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
            path: '/',
            redirect: '/plugins'
        }
    ]
})