<template>
  <div v-if="loaded" class="container">
    <div class="row justify-content-between align-items-center">
      <div class="col-md-10">
        <h3 class="mt-4">{{patient.fatherSurname}} {{patient.motherSurname}} <small>{{patient.name}}</small></h3>
      </div>
      <div class="col-md-2 text-right d-print-none">
        <img src="../assets/icons/ic_print_black_24px.svg" style="cursor: pointer" v-on:click="print"/>
      </div>
    </div>
    <div class="text-right text-muted"><small>Creado el {{createdAt}}</small></div>
    <div class="row">
      <div class="col-md-3">
        <div class="col-12">
          <h4 class="text-center">Antecedentes</h4>
          <div class="row"><b>Alergías</b></div>
          <div class="row mb-2">{{patient.alergies ? 'Si' : 'No'}}</div>
          <field-edit title="Patológicos" :value="patient.pathological" name="pathological" :document="dbDocument" :isTextArea="true" />
          <field-edit title="Cirúrgicos" :value="patient.surgical" name="surgical" :document="dbDocument" :isTextArea="true" />

          <div class="line-util"></div>

          <div class="row"><b>Sexo</b></div>
          <div class="row mb-2">{{patient.sex}}</div>
          <div class="row"><b>Fecha de nacimiento</b></div>
          <div class="row mb-2">{{patient.birthday}} ({{patient.age}} años)</div>
          <div class="row mb-2">
            <div><b>{{patient.documentType}}</b> {{patient.document}}</div>
          </div>
          <field-edit title="Dirección" :value="patient.address" name="address" :document="dbDocument" />
          <field-edit title="Referencia" :value="patient.addressReference" name="email" :document="dbDocument" />
          <div class="row"><b>Estado civil</b></div>
          <div class="row mb-2">{{patient.civilStatus}}</div>
          <field-edit title="Nacionalidad" :value="patient.nacionality" name="nacionality" :document="dbDocument" />
          <field-edit title="Telefono" :value="patient.phone" name="phone" :document="dbDocument" />
          <field-edit title="Residencia" :value="patient.residence" name="residence" :document="dbDocument" />
          <field-edit title="Email" :value="patient.email" name="email" :document="dbDocument" />
          <field-edit title="Grado de instrucción" :value="patient.degree" name="degree" :document="dbDocument" />
          <field-edit title="Ocupación" :value="patient.occupation" name="occupation" :document="dbDocument" />
          <field-edit title="Facebook" :value="patient.facebook" name="facebook" :document="dbDocument" />

        </div>
      </div>
      <div class="col-md-9">
        <div class="row mb-4 d-print-none">
          <div class="col-12">
            <div class="form-group">
              <h4>Nuevo registro</h4>
              <textarea v-model="newEntry" class="form-control" rows="3"></textarea>
            </div>
            <button v-on:click="addEntry" type="button" class="btn btn-primary float-right">Guardar</button>
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
      </div>
    </div>
  </div>
</template>
<script>
import fire from '../fire.js'
import FieldEdit from '../components/FieldEdit.vue'
import { differenceInYears, format } from 'date-fns'
import eslocale from 'date-fns/locale/es'

const db = fire.firestore()
let id = null

export default {
  data: () => ({
    patient: {},
    loaded: false,
    newEntry: '',
    entries: [],
    dbDocument: null
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
    },
    print () {
      window.print()
    }
  },
  mounted () {
    id = location.pathname.split('/')[2]
    let patientDoc = db.collection('patients').doc(id)
    patientDoc.onSnapshot(doc => {
      this.patient = doc.data()
      this.patient.age = differenceInYears(this.patient.birthday, new Date())
      this.patient.birthday = `${this.patient.birthday.getDate()}/${this.patient.birthday.getMonth() + 1}/${this.patient.birthday.getFullYear()}`
      this.loaded = true
    })

    patientDoc.collection('entries').orderBy('time', 'desc').onSnapshot(entriesSnap => {
      this.entries = []
      entriesSnap.forEach(doc => {
        let data = doc.data()
        this.entries.push({
          time: format(data.time, 'D MMM YY [\n] hh:mm a', { locale: eslocale }),
          entry: data.entry
        })
      })
    })
    this.dbDocument = patientDoc
  },
  computed: {
    createdAt () {
      return format(this.patient.createdAt, 'D MMMM [de] YYYY [a las] h:mm a')
    }
  },
  components: {
    FieldEdit
  }
}
</script>
<style>
.line-util {
  border: 0.1px solid #919191;
  border-radius: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
