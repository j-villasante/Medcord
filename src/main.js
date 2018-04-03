import './assets/css/bootstrap-theme.css'
import 'bootstrap'

import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import Login from './Login.vue'
import routes from './routes'
import fire from './fire.js'
import 'moment/locale/es'

Vue.use(Vuelidate)
const app = new Vue({
  el: '#app',
  data: {
    currentView: routes(window.location.pathname).view,
    currentPath: window.location.pathname,
    logged: fire.currentUser !== null
  },
  render (h) {
    if (this.logged) {
      return h(App)
    } else {
      return h(Login)
    }
  },
  methods: {
    setRoute (route) {
      window.history.pushState(
        null,
        routes(route).name,
        route
      )
      this.currentView = routes(window.location.pathname).view
      this.currentPath = window.location.pathname
    }
  }
})

fire.auth().onAuthStateChanged(user => {
  if (user) {
    app.logged = true
  } else {
    app.logged = false
  }
})

window.addEventListener('popstate', () => {
  app.currentView = routes(window.location.pathname).view
  app.currentPath = window.location.pathname
})
