import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'

import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'

import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyD9NDck7fPuSnkC-QFyZVUg3n5Sb0KBvmw",
  authDomain: "vue-crm-fb3bf.firebaseapp.com",
  projectId: "vue-crm-fb3bf",
  storageBucket: "vue-crm-fb3bf.appspot.com",
  messagingSenderId: "608407087505",
  appId: "1:608407087505:web:71bd2e5eedd078b4191230",
  measurementId: "G-F43XZXGSF8"
};
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});