<template>
  <div class="container">
    <div class="row align-items-center justify-content-between mb-4">
      <div class="col-md-6">
        <h1 class="my-4">Visitantes</h1>
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
      <div v-for="v in visitors" class="col-md-4 patient">
        <div class="card bg-light mb-4">
          <div class="card-header">
            <b>{{v.fatherSurname}} {{v.motherSurname}} </b>{{v.name}}
            <div class="float-right clickable" v-on:click="editVisitor(v)">
              <img src="../assets/icons/ic_assignment_black_24px.svg">
            </div>
          </div>
          <div class="card-body">
            <div class="card-text row">
              <div class="col-5">
                <span v-if="v.sex === 'masculino'">Hombre</span>
                <span v-else>Mujer</span>
                <span>: {{v.age}} años</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="edit-visitor" height="auto" style="{overflow: 'visible'}">
      <div class="container">
        <h4 class="mt-3">Visitante</h4>
        <div class="row">
          <div class="col-md-6 col-12 form-group">
            <label>Apellido Paterno</label>
            <input type="text"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.fatherSurname"
              v-on:blur="$v.visitor.fatherSurname.$touch()"
              :class="{ 'is-invalid': $v.visitor.fatherSurname.$error }">
            <div v-if="$v.visitor.fatherSurname.$error">
              <small class="text-danger" v-if="!$v.visitor.fatherSurname.required">Ingrese su apellido paterno.</small>
              <small class="text-danger" v-if="!$v.visitor.fatherSurname.minLength">El apellido paterno debe tener al menos {{$v.visitor.fatherSurname.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
          <div class="col-md-6 col-12 form-group">
            <label>Apellido Materno</label>
            <input type="text"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.motherSurname"
              v-on:blur="$v.visitor.motherSurname.$touch()"
              :class="{ 'is-invalid': $v.visitor.motherSurname.$error }">
            <div v-if="$v.visitor.motherSurname.$error">
              <small class="text-danger" v-if="!$v.visitor.motherSurname.required">Ingrese su apellido paterno.</small>
              <small class="text-danger" v-if="!$v.visitor.motherSurname.minLength">El apellido paterno debe tener al menos {{$v.visitor.fatherSurname.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-12 form-group">
            <label>Nombres</label>
            <input type="text"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.name"
              v-on:blur="$v.visitor.name.$touch()"
              :class="{ 'is-invalid': $v.visitor.name.$error }">
            <div v-if="$v.visitor.name.$error">
              <small class="text-danger" v-if="!$v.visitor.name.required">Ingrese un nombre.</small>
              <small class="text-danger" v-if="!$v.visitor.name.minLength">El nombre debe tener al menos {{$v.visitor.name.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
          <div class="col-md-4 col-12 form-group">
            <label>Fecha de nacimiento</label>
            <datepicker
              input-class='form-control'
              language='es'
              :disabled="disabled"
              :initialView="'year'"
              v-model.trim="visitor.birthday"
              v-on:blur="$v.visitor.birthday.$touch()"
              :class="{ 'is-invalid': $v.visitor.birthday.$error }" />
            <div v-if="$v.visitor.birthday.$error">
              <small class="text-danger" v-if="!$v.visitor.birthday.required">Ingrese su fecha de nacimiento.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-12 form-group">
            <label>Telefono/Celular</label>
            <input type="number"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.phone"
              v-on:blur="$v.visitor.phone.$touch()"
              :class="{ 'is-invalid': $v.visitor.phone.$error }">
            <div v-if="$v.visitor.phone.$error">
              <small class="text-danger" v-if="!$v.visitor.phone.required">Ingrese su telefono.</small>
            </div>
          </div>
          <div class="col-md-8 col-12 form-group">
            <label>Domicilio</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.address"
              v-on:blur="$v.visitor.address.$touch()"
              :class="{ 'is-invalid': $v.visitor.address.$error }">
            <div v-if="$v.visitor.address.$error">
              <small class="text-danger" v-if="!$v.visitor.address.required">Ingrese su dirección.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <label>Referencia</label>
            <input type="text"
              class="form-control"
              placeholder="Ingrese"
              v-model.trim="visitor.addressReference" >
          </div>
        </div>
        <div class="row my-3">
          <div class="col text-center">
            <button type="button" class="btn btn-danger float-left" v-on:click="deleteVisitor" :disabled="deleteBut.disabled">{{deleteBut.message}}</button>
            <button type="button" class="btn btn-primary" v-on:click="update" :disabled="updateBut.disabled">{{updateBut.message}}</button>
            <button type="button" class="btn btn-secondary float-right" v-on:click="$modal.hide('edit-visitor')">Cerrar</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import fire from '../fire.js'
import { required, minLength, numeric } from 'vuelidate/lib/validators'
import { differenceInYears } from 'date-fns'

const db = fire.firestore()
let bk = null

export default {
  data: () => ({
    visitors: [],
    searchValue: '',
    currentEditingId: null,
    visitor: {
      motherSurname: '',
      fatherSurname: '',
      name: '',
      phone: '',
      birthday: '',
      address: '',
      addressReference: ''
    },
    disabled: {
      from: new Date()
    },
    updateBut: {
      disabled: false,
      message: 'Actualizar'
    },
    deleteBut: {
      disabled: false,
      message: 'Eliminar'
    }
  }),
  methods: {
    search () {
      if (this.searchValue === '') {
        this.visitors = bk
      } else {
        const [ father, mother ] = this.searchValue.trim().split(' ')
        let query = db.collection('visitors')
          .where('fatherSurname', '==', father)
        if (mother) {
          query = query.where('motherSurname', '==', mother)
        }
        query
          .limit(20)
          .get()
          .then((snap) => {
            this.visitors = []
            snap.forEach(this.resultAdapter)
          })
      }
    },
    editVisitor (visitor) {
      this.currentEditingId = visitor.id
      this.visitor.motherSurname = visitor.motherSurname
      this.visitor.fatherSurname = visitor.fatherSurname
      this.visitor.name = visitor.name
      this.visitor.phone = visitor.phone
      this.visitor.birthday = new Date(visitor.birthday.seconds * 1000)
      this.visitor.address = visitor.address
      this.visitor.addressReference = visitor.addressReference
      this.$modal.show('edit-visitor')
    },
    deleteVisitor () {
      this.setOnLoading()
      db.collection('visitors').doc(this.currentEditingId).delete().then(() => {
        this.$modal.hide('edit-visitor')
        this.setOffLoading()
        this.updateData()
      })
    },
    update () {
      this.setOnLoading()
      db.collection('visitors').doc(this.currentEditingId).update(this.visitor).then(() => {
        this.$modal.hide('edit-visitor')
        this.setOffLoading()
        this.updateData()
      })
    },
    setOnLoading () {
      this.updateBut.disabled = true
      this.updateBut.message = '•••'
      this.deleteBut.disabled = true
      this.deleteBut.message = '•••'
    },
    setOffLoading () {
      this.updateBut.disabled = false
      this.updateBut.message = 'Actualizar'
      this.deleteBut.disabled = false
      this.deleteBut.message = 'Eliminar'
    },
    resultAdapter (doc) {
      let data = doc.data()
      data.id = doc.id
      data.age = differenceInYears(new Date(), new Date(data.birthday.seconds * 1000))
      this.visitors.push(data)
    },
    updateData () {
      this.visitors = []
      this.searchValue = ''
      db.collection('visitors')
        .orderBy('createdAt', 'desc')
        .limit(20).get()
        .then(snap => {
          snap.forEach(this.resultAdapter)
          bk = [ ...this.visitors ]
        })
    }
  },
  mounted () {
    this.updateData()
  },
  components: {
    Datepicker
  },
  validations: {
    visitor: {
      motherSurname: {
        required,
        minLength: minLength(3)
      },
      fatherSurname: {
        required,
        minLength: minLength(3)
      },
      name: {
        required,
        minLength: minLength(3)
      },
      phone: { required, numeric },
      birthday: { required },
      address: { required }
    }
  }
}
</script>
<style>
.vdp-datepicker__calendar {
  left: -129px;
}
</style>
