<template>
  <div class="container">
    <div class="row align-items-center justify-content-between mb-4">
      <div class="col-md-6">
        <h1 class="my-4">Pacientes</h1>
      </div>
      <div class="col-md-4">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <img src="../assets/icons/ic_search_black_24px.svg">
            </div>
          </div>
          <input v-model="searchValue" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Documento">
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
import Fuse from 'fuse.js'
import { differenceInYears } from 'date-fns'

const db = fire.firestore()
const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'fatherSurname',
    'motherSurname',
    'document'
  ]
}

let fuse = null
let bk = null
let timeout = null

export default {
  data: () => ({
    patients: [],
    searchValue: ''
  }),
  watch: {
    searchValue (val) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (val === '') {
          this.patients = bk
        } else {
          this.patients = fuse.search(val)
        }
      }, 1000)
    }
  },
  mounted () {
    let patientsRef = db.collection('patients')
    let acumulator = (list = []) => {
      return (snap) => {
        snap.forEach(doc => {
          let data = doc.data()
          data.id = doc.id

          data.age = differenceInYears(new Date(), data.birthday)
          list.push(data)
        })
        return list
      }
    }
    patientsRef.orderBy('createdAt', 'desc').limit(20).get()
      .then(acumulator(this.patients))
      .then(list => {
        bk = list
      })

    db.collection('patients').get()
      .then(acumulator())
      .then(list => {
        fuse = new Fuse(list, fuseOptions)
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
