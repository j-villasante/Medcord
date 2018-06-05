<template>
  <div class="container">
    <div class="row align-items-center justify-content-between mb-4">
      <div class="col-md-6">
        <h1 class="my-4">Visitantes</h1>
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
              <div class="col-7">
                <h5 class="text-right"><small>{{v.email}}</small></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="edit-visitor" height="auto" :scrollable="true">
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
        </div>
        <div class="row">
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
          <div class="col-md-8 col-12 form-group">
            <label>Correo electrónico</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese" 
              v-model.trim="visitor.email" 
              v-on:blur="$v.visitor.email.$touch()"
              :class="{ 'is-invalid': $v.visitor.email.$error }">
            <div v-if="$v.visitor.email.$error">
              <small class="text-danger" v-if="!$v.visitor.email.required">Ingrese un correo.</small>
              <small class="text-danger" v-if="!$v.visitor.email.email">Ingrese un correo válido.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
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
          <div class="col-md-6 col-12 form-group">
            <label>Referencia</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="visitor.addressReference" >
          </div>
          <div class="col-md-6 col-12 form-group">
            <label>Facebook</label>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="visitor.facebook">
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
import Fuse from 'fuse.js'
import { required, minLength, numeric, email } from 'vuelidate/lib/validators'
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
    'email'
  ]
}

let fuse = null
let bk = null
let timeout = null

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
      email: '',
      addressReference: '',
      facebook: ''
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
  watch: {
    searchValue (val) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (val === '') {
          this.visitors = bk
        } else {
          this.visitors = fuse.search(val)
        }
      }, 1000);
    }
  },
  methods: {
    editVisitor(visitor) {
      this.currentEditingId = visitor.id
      this.visitor.motherSurname = visitor.motherSurname
      this.visitor.fatherSurname = visitor.fatherSurname
      this.visitor.name = visitor.name
      this.visitor.phone = visitor.phone
      this.visitor.birthday = visitor.birthday
      this.visitor.address = visitor.address
      this.visitor.email = visitor.email
      this.visitor.addressReference = visitor.addressReference
      this.visitor.facebook = visitor.facebook
      this.$modal.show('edit-visitor');
    },
    deleteVisitor() {
      this.setOnLoading()
      db.collection('visitors').doc(this.currentEditingId).delete().then(() => {
        this.$modal.hide('edit-visitor')
        this.setOffLoading()
        this.updateData()
      })
    },
    update() {
      this.setOnLoading()
      db.collection('visitors').doc(this.currentEditingId).update(this.visitor).then(() => {
        this.$modal.hide('edit-visitor')
        this.setOffLoading()
        this.updateData()
      })
    },
    setOnLoading() {
      this.updateBut.disabled = true
      this.updateBut.message = '•••'
      this.deleteBut.disabled = true
      this.deleteBut.message = '•••'
    },
    setOffLoading() {
      this.updateBut.disabled = false
      this.updateBut.message = 'Actualizar'
      this.deleteBut.disabled = false
      this.deleteBut.message = 'Eliminar'
    },
    updateData() {
      this.visitors = []
      let visitorsRef = db.collection('visitors')
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
      visitorsRef.orderBy('createdAt', 'desc').limit(20).get()
        .then(acumulator(this.visitors))
        .then(list => {
          bk = list
        })

      db.collection('visitors').get()
        .then(acumulator())
        .then(list => {
          fuse = new Fuse(list, fuseOptions)
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
      address: { required },
      email: { required, email }
    }
  }
}
</script>
