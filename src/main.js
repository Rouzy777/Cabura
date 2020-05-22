import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Loader from '@/components/Loader'
import VueMeta from 'vue-meta'
import titlePlugin from '@/utils/title.plugin'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader', Loader)

firebase.initializeApp({
    data 
})

let app;

firebase.auth().onAuthStateChanged(() => {
    if(!app) {
        app = new Vue({
          store,
          router,
          render: h => h(App),
        }).$mount('#app')
    }
})
