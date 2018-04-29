import './assets/css/bootstrap-theme.css'
import 'bootstrap'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'

import App from './App.vue'
import Login from './Login.vue'
import routes from './routes'
import fire from './fire.js'

Vue.use(VModal, { dialog: true })
Vue.use(Vuelidate)

let app = null
let options = {
  el: '#app',
  data: {
    currentPath: window.location.pathname
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
}

fire.auth().onAuthStateChanged(user => {
  if (app == null) {
    options.data.logged = Boolean(user)
    options.data.currentView = user ? routes(window.location.pathname).view : null
    app = new Vue(options)
  } else {
    app.currentView = routes(window.location.pathname).view
    app.logged = Boolean(user)
  }
})

window.addEventListener('popstate', () => {
  app.currentView = routes(window.location.pathname).view
  app.currentPath = window.location.pathname
})
