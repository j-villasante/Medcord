<template>
  <div v-if="loaded" class="container">
    <print :patient="patient"/>
    <div class="d-print-none">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-10">
          <h5 class="mt-2"><small>NRO. -</small>{{patient.code}}</h5>
          <h3 class="mt-4">{{patient.fatherSurname}} {{patient.motherSurname}} <small>{{patient.name}}</small></h3>
        </div>
        <div class="col-md-2 text-right">
          <img src="../assets/icons/ic_print_black_24px.svg" class="clickable" v-on:click="print"/>
        </div>
      </div>
      <div class="text-right text-muted"><small>Creado el {{patient.createdAtFormatted}}</small></div>
      <div class="text-right text-muted" v-if="patient.updatedAtFormatted"><small>Modificado el {{patient.updatedAtFormatted}}</small></div>
      <div class="row">
        <div class="col-md-3">
          <div class="col-12">
            <h4 class="text-center">Antecedentes</h4>
            <div class="row"><b>Alergías</b></div>
            <div class="row mb-2">{{patient.alergies ? 'Si' : 'No'}}</div>
            <field-edit title="Patológicos" :value="patient.pathological" name="pathological" :document="dbDocument" :isTextArea="true" />
            <field-edit title="Quirúrgicos" :value="patient.surgical" name="surgical" :document="dbDocument" :isTextArea="true" />

            <div class="line-util"></div>

            <div class="row"><b>Sexo</b></div>
            <div class="row mb-2">{{patient.sex}}</div>
            <div class="row"><b>Fecha de nacimiento</b></div>
            <div class="row mb-2">{{patient.birthday}} ({{patient.age}} años)</div>
            <div class="row mb-2">
              <div><b>{{patient.documentType}}</b> {{patient.document}}</div>
            </div>
            <field-edit title="Dirección" :value="patient.address" name="address" :document="dbDocument" />
            <field-edit title="Referencia" :value="patient.addressReference" name="addressReference" :document="dbDocument" />
            <div class="row"><b>Estado civil</b></div>
            <div class="row mb-2">{{patient.civilStatus}}</div>
            <field-edit title="Lugar de nacimiento" :value="patient.nacionality" name="nacionality" :document="dbDocument" />
            <field-edit title="Telefono" :value="patient.phone" name="phone" :document="dbDocument" />
            <field-edit title="Procedencia" :value="patient.residence" name="residence" :document="dbDocument" />
            <field-edit title="Grado de instrucción" :value="patient.degree" name="degree" :document="dbDocument" />
            <field-edit title="Ocupación" :value="patient.occupation" name="occupation" :document="dbDocument" />

          </div>
          <div class="col-12">
            <div class="row justify-content-center my-4">
              <button type="button" class="btn btn-danger" v-on:click="deleteOne">Eliminar</button>              
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row mb-4">
            <div class="col-12">
              <div class="form-group">
                <h4>Nuevo registro</h4>
                <textarea v-model="newEntry" class="form-control" rows="3"></textarea>
              </div>
              <button v-on:click="addEntry" type="button" class="btn btn-primary float-right">Guardar</button>
            </div>
          </div>
          <table class="table table-hover">
            <col width="25%">
            <col width="75%">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Apuntes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in entries">
                <th style="white-space: pre-line;" scope="row">{{e.time}}</th>
                <td style="white-space: pre-line;"><edit :value="e.entry" :document="e.document" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <v-dialog/>
  </div>
</template>
<script>
import fire from '../fire.js'

import FieldEdit from '../components/FieldEdit.vue'
import Edit from '../components/Edit.vue'
import Print from './Print.vue'
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
      if (this.newEntry === '' || !this.newEntry) return
      db.collection('patients').doc(id).collection('entries').add({
        time: new Date(),
        entry: this.newEntry
      })
        .then(() => {
          db.collection('patients').doc(id).update({updatedAt: new Date()})
          this.newEntry = ''
        })
    },
    print () {
      window.print()
    },
    deleteOne () {
      this.$modal.show('dialog', {
        title: 'Alerta!',
        text: '¿Estás seguro que quieres borrar el paciente?',
        buttons: [
          {
            title: 'Sí, quiero borrarlo',
            handler: () => {
              this.$modal.hide('dialog')
              db.runTransaction(transaction => {
                const masterRef = db.collection('patients').doc('master')
                const patientRef = db.collection('patients').doc(id)

                let p1 = transaction.get(masterRef).then(master => {
                  let count = master.data().count - 1
                  return transaction.update(masterRef, {count})
                })
                let p2 = transaction.delete(patientRef)
                return Promise.all([p1, p2])
              })
                .then(() => {
                  this.$root.setRoute('/')
                })
                .catch(() => {
                  alert('Error al borrar.')
                })
              // db.collection('patients').doc(id).delete().catch(() => {
              //   alert('Error al borrar.')
              // })
            }
          },
          {
            title: 'Cerrar'
          }
        ]
      })
    },
    formatDate (fireStoreDate) {
      if (fireStoreDate) {
        return format(new Date(fireStoreDate.seconds * 1000), 'D [de] MMMM [de] YYYY [a las] h:mm a', { locale: eslocale })
      } else {
        return undefined
      }
    }
  },
  mounted () {
    id = location.pathname.split('/')[2]
    let patientDoc = db.collection('patients').doc(id)
    patientDoc.onSnapshot(doc => {
      let data = doc.data()
      if (data) {
        const birthday = new Date(data.birthday.seconds * 1000)
        this.patient = data
        this.patient.age = differenceInYears(new Date(), birthday)
        this.patient.birthday = `${birthday.getDate()}/${birthday.getMonth() + 1}/${birthday.getFullYear()}`
        this.patient.createdAtFormatted = this.formatDate(this.patient.createdAt)
        this.patient.updatedAtFormatted = this.formatDate(this.patient.updatedAt)
        this.loaded = true
      }
    })

    patientDoc.collection('entries').orderBy('time', 'desc').onSnapshot(entriesSnap => {
      this.entries = []
      entriesSnap.forEach(doc => {
        let data = doc.data()
        this.entries.push({
          time: format(new Date(data.time.seconds), 'D MMM YY [\n] hh:mm a', { locale: eslocale }),
          entry: data.entry,
          document: doc.ref
        })
      })
    })
    this.dbDocument = patientDoc
  },
  components: {
    FieldEdit, Print, Edit
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
