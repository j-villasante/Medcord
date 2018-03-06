import './assets/css/bootstrap-theme.css'
import 'bootstrap'

import firebase from 'firebase/app'
import 'firebase/auth'

import Vue from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import routes from './routes'

import config from './fire-config.json'

firebase.initializeApp(config)

const app = new Vue({
  el: '#app',
  data: {
    currentView: routes(window.location.pathname).view,
    currentPath: window.location.pathname,
    logged: firebase.currentUser !== null
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

firebase.auth().onAuthStateChanged(user => {
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
