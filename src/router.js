import Vue from 'vue'
import firebase from 'firebase/app'
import Router from 'vue-router'
import Dicer from '@/views/Dicer'
import Stats from '@/views/Stats'
import Login from '@/views/Login'
import Register from '@/views/Register'
import NotFound from '@/views/NotFound'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dicer',
            meta: {auth: true},
            component: Dicer
        },
        {
            path: '/stats',
            name: 'Статистика',
            meta: {auth: true},
            component: Stats
        },
        {
            path: '/signin',
            name: 'Вход',
            component: Login
        },
        {
            path: '/signup',
            name: 'Регистрация',
            component: Register
        },
        {
            path: "*",
            name: '404',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)

    if(requireAuth && !currentUser) {
        next('/signin?message=login')
    } else {
        next()
    }
})

export default router
