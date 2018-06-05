<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/">SR</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style="">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{active: this.$root.currentPath === '/'}">
            <vue-link class="nav-link" href="/">Historias</vue-link>
          </li>
          <li class="nav-item" :class="{active: this.$root.currentPath === '/visitors'}">
            <vue-link class="nav-link" href="/visitors">Visitantes</vue-link>
          </li>
          <li class="nav-item" :class="{active: this.$root.currentPath === '/new'}">
            <vue-link class="nav-link" href="/new">Nuevo paciente</vue-link>
          </li>
          <li class="nav-item" :class="{active: this.$root.currentPath === '/new-visitor'}">
            <vue-link class="nav-link" href="/new-visitor">Nuevo visitante</vue-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle clickable" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Exportar
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item clickable" v-on:click="exportAll">Todo</a>
              <a class="dropdown-item clickable" v-on:click="exportVisitors">Visitantes</a>
              <a class="dropdown-item clickable" v-on:click="exportPatients">Pacientes</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/" v-on:click="logout">Salir</a>
          </li>
        </ul>
      </div>
    </nav>
    <component :is="ViewComponent"></component>
  </div>
</template>

<script>
import VueLink from './components/VueLink.vue'
import firebase from 'firebase/app'
import {exportPatients, exportVisitors, exportAll} from './exporter.js'

export default {
  methods: {
    logout (e) {
      event.preventDefault()
      firebase.auth().signOut()
    },
    exportPatients,
    exportVisitors,
    exportAll
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
<style>
.clickable {
  cursor: pointer;
}

.dropdown-item.clickable:hover {
  color: white !important;
}
</style>
