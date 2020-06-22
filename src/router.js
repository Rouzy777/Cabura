import Vue from 'vue'
import firebase from 'firebase/app'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Dicer',
            meta: {auth: true},
            component: () => import('@/views/Dicer')
        },
        {
            path: '/stats',
            name: 'Статистика',
            meta: {auth: true},
            component: () => import('@/views/Stats')
        },
        {
            path: '/signin',
            name: 'Вход',
            component: () => import('@/views/Login')
        },
        {
            path: '/signup',
            name: 'Регистрация',
            component: () => import('@/views/Register')
        },
        {
            path: "*",
            name: '404',
            component: () => import('@/views/404')
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
