<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h3 class="my-4">{{patient.fatherSurname}} {{patient.motherSurname}} <small>{{patient.name}}</small></h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div v-if="loaded" class="col-12">
          <div class="row"><b>Dirección</b></div>
          <div class="row mb-2">{{patient.address}}</div>
          <div class="row"><b>Fecha de nacimiento</b></div>
          <div class="row mb-2">{{patient.birthday}}</div>
          <div class="row"><b>Estado civil</b></div>
          <div class="row mb-2">{{patient.civilStatus}}</div>
          <div class="row mb-2">
            <div><b>{{patient.documentType}}</b> {{patient.document}}</div>
          </div>
          <div class="row"><b>Nacionalidad</b></div>
          <div class="row mb-2">{{patient.nacionality}}</div>
          <div class="row"><b>Telefono</b></div>
          <div class="row mb-2">{{patient.phone}}</div>
          <div class="row"><b>Residencia</b></div>
          <div class="row mb-2">{{patient.residence}}</div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row mb-4">
          <div class="col-12">
            <div class="form-group">
              <label>Nuevo registro</label>
              <textarea v-model="newEntry" class="form-control" rows="3"></textarea>
            </div>
            <button v-on:click="addEntry" type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
        <table class="table table-hover">
          <col width="15%">
          <col width="85%">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Apuntes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in entries">
              <th style="white-space: pre-line;" scope="row">{{e.time}}</th>
              <td style="white-space: pre-line;">{{e.entry}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div v-for="e in entries" class="row">
          <div class="col-9">
            <div style="white-space: pre-line;">{{e.entry}}</div>
          </div>
          <div class="col-3">{{e.time}}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import fire from '../fire.js'
import moment from 'moment'

const db = fire.firestore()
let id = null

export default {
  data: () => ({
    patient: {},
    loaded: false,
    newEntry: '',
    entries: []
  }),
  methods: {
    addEntry () {
      db.collection('patients').doc(id).collection('entries').add({
        time: new Date(),
        entry: this.newEntry
      })
        .then(() => {
          this.newEntry = ''
        })
    }
  },
  mounted () {
    id = location.pathname.split('/')[2]
    let patientDoc = db.collection('patients').doc(id)
    patientDoc.get().then(doc => {
      this.patient = doc.data()
      this.patient.birthday = `${this.patient.birthday.getDate()}/${this.patient.birthday.getMonth() + 1}/${this.patient.birthday.getFullYear()}`
      this.loaded = true
    })

    patientDoc.collection('entries').orderBy('time', 'desc').onSnapshot(entriesSnap => {
      this.entries = []
      entriesSnap.forEach(doc => {
        let data = doc.data()
        this.entries.push({
          time: moment(data.time).format('D MMM YY [\n] h:mm a'),
          entry: data.entry
        })
      })
    })
  }
}
</script>
