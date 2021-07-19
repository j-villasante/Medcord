<template>
  <div class="container">
    <h1 class="mb-4 mt-4">Nueva visita</h1>
    <div class="row">
      <div class="col-md-6 col-12">
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
          <div class="col">
            <button type="submit" class="btn btn-primary" v-on:click="submit" :disabled="saveBut.disabled">{{saveBut.message}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { required, minLength, numeric, email } from 'vuelidate/lib/validators'
import fire from '../fire.js'

const db = fire.firestore()
const visitorRef = db.collection('visitors')
const masterRef = visitorRef.doc('master')

export default {
  methods: {
    submit () {
      this.$v.visitor.$touch()
      if (!this.$v.visitor.$invalid) {
        this.saveBut.message = '•••'
        this.saveBut.disabled = true
        this.visitor.createdAt = new Date()
        db.runTransaction(transaction => {
          return transaction.get(masterRef).then(masterDoc => {
            if (!masterDoc.exists) {
              throw Error('document does not exist!')
            }
            let newCount = masterDoc.data().count + 1
            this.visitor.code = newCount
            transaction.update(masterRef, {count: newCount})
          })
        })
          .then(() => visitorRef.add(this.visitor))
          .then(() => {
            location.reload()
          })
          .catch(error => {
            this.saveBut.message = 'Guardar'
            this.saveBut.disabled = false
            console.log(error)
          })
      }
    }
  },
  data: () => ({
    disabled: {
      from: new Date()
    },
    saveBut: {
      message: 'Guardar',
      disabled: false
    },
    visitor: {
      motherSurname: '',
      fatherSurname: '',
      name: '',
      phone: '',
      birthday: '',
      address: '',
      addressReference: ''
    }
  }),
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
