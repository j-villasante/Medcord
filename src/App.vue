<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Santa rosa</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style="">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{active: this.$root.currentPath === '/'}">
            <vue-link class="nav-link" href="/">Busqueda</vue-link>
          </li>
          <li class="nav-item" :class="{active: this.$root.currentPath === '/new'}">
            <vue-link class="nav-link" href="/new">Nuevo paciente</vue-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/" v-on:click="logout">Salir</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <component :is="ViewComponent"></component>
    </div>
  </div>
</template>

<script>
import VueLink from './components/VueLink.vue'
import firebase from 'firebase/app'

export default {
  methods: {
    logout (e) {
      event.preventDefault()
      firebase.auth().signOut()
    }
  },
  computed: {
    ViewComponent () {
      return this.$root.currentView
    }
  },
  components: {
    VueLink
  }
}
</script>
