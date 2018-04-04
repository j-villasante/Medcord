<template>
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col-6">
        <h1 class="my-4">Pacientes</h1>
      </div>
      <div class="col-4">
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
      <div v-for="p in patients" class="col-4 patient">
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
            <h5 class="card-title"><small>{{p.documentType}}</small> {{p.document}}</h5>
            <div class="card-text"><b>Telf.:</b> {{p.phone}}</div>
            <div class="card-text"><b>Nac.:</b> {{p.birthday}}</div>
            <div class="card-text"><b>Est. C..:</b> {{p.civilStatus}}</div>
            <div class="card-text"><b>Dir.:</b> {{p.address}}</div>
            <div class="card-text"><b>Res.:</b> {{p.residence}}</div>
            <div class="card-text"><b>Nac.:</b> {{p.nacionality}}</div>
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
    'motherSurname'
  ]
}

let fuse = null
let bk = null

export default {
  data: () => ({
    patients: [],
    searchValue: ''
  }),
  watch: {
    searchValue (val) {
      if (val === '') {
        this.patients = bk
      } else {
        this.patients = fuse.search(val)        
      }
    }
  },
  mounted () {
    let patientsRef = db.collection('patients')
    let acumulator = (list = []) => {
      return (snap) => {
        snap.forEach(doc => {
          let data = doc.data()
          data.id = doc.id
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
