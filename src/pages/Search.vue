<template>
  <div class="container">
    <div class="row align-items-center justify-content-between mb-4">
      <div class="col-md-6">
        <h1 class="my-4">Pacientes</h1>
      </div>
      <div class="col-md-4">
        <div class="input-group">
          <input v-model="searchValue" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Apellidos" v-on:keyup.enter="search">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" v-on:click="search">
              <img src="../assets/icons/ic_search_black_24px.svg">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="p in patients" class="col-md-4 patient">
        <div class="card bg-light mb-4">
          <div class="card-header">
            <b>{{p.fatherSurname}} {{p.motherSurname}} </b>{{p.name}}
            <div class="float-right">
              <vue-link :href="`/record/${p.id}`">
                <img src="../assets/icons/ic_assignment_black_24px.svg">
              </vue-link>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text row">
              <div class="col-6">
                <span v-if="p.sex === 'masculino'">Hombre</span>
                <span v-else>Mujer</span>
                <span>de {{p.age}} años</span>
              </div>
              <div class="col-6">
                <h5 class="text-right"><small>{{p.documentType}}</small> {{p.document}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueLink from '../components/VueLink.vue'
import fire from '../fire.js'
import { differenceInYears } from 'date-fns'

const db = fire.firestore()
let bk = null

export default {
  data: () => ({
    patients: [],
    searchValue: ''
  }),
  methods: {
    resultAdapter (doc) {
      let data = doc.data()
      data.id = doc.id
      data.age = differenceInYears(new Date(), new Date(data.birthday.seconds * 1000))
      this.patients.push(data)
    },
    search () {
      if (this.searchValue === '') {
        this.patients = bk
      } else {
        const [ father, mother ] = this.searchValue.trim().split(' ')
        let query = db.collection('patients')
          .where('fatherSurname', '==', father)
        if (mother) {
          query = query.where('motherSurname', '==', mother)
        }
        query
          .limit(20)
          .get()
          .then((snap) => {
            this.patients = []
            snap.forEach(this.resultAdapter)
          })
      }
    }
  },
  mounted () {
    db.collection('patients')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()
      .then((snap) => {
        snap.forEach(this.resultAdapter)
        bk = [ ...this.patients ]
      })
  },
  components: {
    VueLink
  }
}
</script>
<style>
.patient .card {
  -webkit-box-shadow: 0px 0px 2px 1px rgba(107,107,107,0.2);
  -moz-box-shadow: 0px 0px 2px 1px rgba(107,107,107,0.2);
  box-shadow: 0px 0px 2px 1px rgba(107,107,107,0.2);
}
</style>
