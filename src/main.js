import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Loader from '@/components/Loader'
import VueMeta from 'vue-meta'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: "upwin-6ad20.firebaseapp.com",
    databaseURL: "https://upwin-6ad20.firebaseio.com",
    projectId: "upwin-6ad20",
    storageBucket: "upwin-6ad20.appspot.com",
    messagingSenderId: "1054627483087",
    appId: "1:1054627483087:web:1005cc72a3db35081796ba",
    measurementId: "G-L40PHPBJLF"
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
