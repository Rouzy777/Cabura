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
            meta: {auth: true},
            component: Dicer
        },
        {
            path: '/stats',
            meta: {auth: true},
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
