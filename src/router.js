import Vue from 'vue'
import Router from 'vue-router'
import Dicer from '@/views/Dicer'
import Stats from '@/views/Stats'
import Login from '@/views/Login'
import Register from '@/views/Register'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Dicer
        },
        {
            path: '/stats',
            component: Stats
        },
        {
            path: '/signin',
            component: Login
        },
        {
            path: '/signup',
            component: Register
        },
        {
            path: "*",
            component: NotFound
        }
    ]
})
