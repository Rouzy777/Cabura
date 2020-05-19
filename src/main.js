import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Loader from '@/components/Loader'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: "AIzaSyA7lLQOhGjkOV3PnTN26hIkqWyDN6s7zm0",
    authDomain: "cabura-1e48d.firebaseapp.com",
    databaseURL: "https://cabura-1e48d.firebaseio.com",
    projectId: "cabura-1e48d",
    storageBucket: "cabura-1e48d.appspot.com",
    messagingSenderId: "350588603394",
    appId: "1:350588603394:web:2ad02178cddd2960566b1b",
    measurementId: "G-9S2C70J5LW"
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
