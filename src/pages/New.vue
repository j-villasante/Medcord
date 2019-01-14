<template>
  <div class="container">
    <h1 class="mb-4 mt-4">Nuevo paciente</h1>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="row">
          <div class="col-md-6 col-12 form-group">
            <label>Apellido Paterno</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.fatherSurname" 
              v-on:blur="$v.patient.fatherSurname.$touch()"
              :class="{ 'is-invalid': $v.patient.fatherSurname.$error }">
            <div v-if="$v.patient.fatherSurname.$error">
              <small class="text-danger" v-if="!$v.patient.fatherSurname.required">Ingrese su apellido paterno.</small>
              <small class="text-danger" v-if="!$v.patient.fatherSurname.minLength">El apellido paterno debe tener al menos {{$v.patient.fatherSurname.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
          <div class="col-md-6 col-12 form-group">
            <label>Apellido Materno</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.motherSurname" 
              v-on:blur="$v.patient.motherSurname.$touch()"
              :class="{ 'is-invalid': $v.patient.motherSurname.$error }">
            <div v-if="$v.patient.motherSurname.$error">
              <small class="text-danger" v-if="!$v.patient.motherSurname.required">Ingrese su apellido paterno.</small>
              <small class="text-danger" v-if="!$v.patient.motherSurname.minLength">El apellido paterno debe tener al menos {{$v.patient.fatherSurname.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-12 form-group">
            <label>Nombres</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese" 
              v-model.trim="patient.name" 
              v-on:blur="$v.patient.name.$touch()"
              :class="{ 'is-invalid': $v.patient.name.$error }">
            <div v-if="$v.patient.name.$error">
              <small class="text-danger" v-if="!$v.patient.name.required">Ingrese un nombre.</small>
              <small class="text-danger" v-if="!$v.patient.name.minLength">El nombre debe tener al menos {{$v.patient.name.$params.minLength.min}} caractéres.</small>
            </div>
          </div>
          <div class="col-md-4 col-12 form-group">
            <label>Telefono/Celular</label>
            <input type="number" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.phone" 
              v-on:blur="$v.patient.phone.$touch()"
              :class="{ 'is-invalid': $v.patient.phone.$error }">
            <div v-if="$v.patient.phone.$error">
              <small class="text-danger" v-if="!$v.patient.phone.required">Ingrese su telefono.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-12 form-group">
            <label>Sexo</label>
            <select class="form-control"
              v-model.trim="patient.sex" 
              v-on:blur="$v.patient.sex.$touch()"
              :class="{ 'is-invalid': $v.patient.sex.$error }">
              <option selected disabled value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <div v-if="$v.patient.sex.$error">
              <small class="text-danger" v-if="!$v.patient.sex.required">Seleccione un sexo.</small>
            </div>
          </div>
          <div class="col-md-4 col-12 form-group">
            <label>Fecha de nacimiento</label>
            <datepicker 
              input-class='form-control' 
              language='es'
              :disabled="disabled"
              :initialView="'year'"
              v-model.trim="patient.birthday" 
              v-on:blur="$v.patient.birthday.$touch()"
              :class="{ 'is-invalid': $v.patient.birthday.$error }" />
            <div v-if="$v.patient.birthday.$error">
              <small class="text-danger" v-if="!$v.patient.birthday.required">Ingrese su fecha de nacimiento.</small>
            </div>
          </div>
          <div class="col-md-4 col-12 form-group">
            <label>Estado civil</label>
            <select class="form-control"
              v-model.trim="patient.civilStatus" 
              v-on:blur="$v.patient.civilStatus.$touch()"
              :class="{ 'is-invalid': $v.patient.civilStatus.$error }">
              <option selected disabled value="">Seleccione</option>
              <option value="Soltera">Soltera</option>
              <option value="Casada">Casada</option>
              <option value="Vuida">Vuida</option>
              <option value="Divorciada">Divorciada</option>
            </select>
            <div v-if="$v.patient.civilStatus.$error">
              <small class="text-danger" v-if="!$v.patient.civilStatus.required">Seleccione su estado civil.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-12 form-group">
            <label>Tipo de documento</label>
            <select class="form-control"
              v-model.trim="patient.documentType" 
              v-on:blur="$v.patient.documentType.$touch()"
              :class="{ 'is-invalid': $v.patient.documentType.$error }">
              <option selected disabled value="">Seleccione</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Ext.</option>
              <option value="PASS">Pasaporte</option>
            </select>
            <div v-if="$v.patient.documentType.$error">
              <small class="text-danger" v-if="!$v.patient.documentType.required">Seleccione su tipo de documento.</small>
            </div>
          </div>
          <div class="col-md-8 col-12 form-group">
            <label>Numero de documento</label>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.document" 
              v-on:blur="$v.patient.document.$touch()"
              :class="{ 'is-invalid': $v.patient.document.$error }">
            <div v-if="$v.patient.document.$error">
              <small class="text-danger" v-if="!$v.patient.document.required">Ingrese su documento.</small>
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
              v-model.trim="patient.address" 
              v-on:blur="$v.patient.address.$touch()"
              :class="{ 'is-invalid': $v.patient.address.$error }">
            <div v-if="$v.patient.address.$error">
              <small class="text-danger" v-if="!$v.patient.address.required">Ingrese su dirección.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <label>Referencia</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.addressReference" >
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12 form-group">
            <label>Procedencia</label>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.residence" 
              v-on:blur="$v.patient.residence.$touch()"
              :class="{ 'is-invalid': $v.patient.residence.$error }">
            <div v-if="$v.patient.residence.$error">
              <small class="text-danger" v-if="!$v.patient.residence.required">Ingrese su país de procedencia.</small>
            </div>
          </div>
          <div class="col-md-6 col-12 form-group">
            <label>Lugar de nacimiento</label>
            <input type="text" 
              class="form-control" 
              placeholder="Ingrese"v-model.trim="patient.nacionality" 
              v-on:blur="$v.patient.nacionality.$touch()"
              :class="{ 'is-invalid': $v.patient.nacionality.$error }">
            <div v-if="$v.patient.nacionality.$error">
              <small class="text-danger" v-if="!$v.patient.nacionality.required">Ingrese su lugar de nacimiento.</small>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12 form-group">
            <label>Ocupación</label>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Ingrese"
              v-model.trim="patient.occupation" 
              v-on:blur="$v.patient.occupation.$touch()"
              :class="{ 'is-invalid': $v.patient.occupation.$error }">
            <div v-if="$v.patient.occupation.$error">
              <small class="text-danger" v-if="!$v.patient.occupation.required">Ingrese su ocupación.</small>
            </div>
          </div>
          <div class="col-md-6 col-12 form-group">
            <label>Grado de instrucción</label>
            <select class="form-control"
              v-model.trim="patient.degree" 
              v-on:blur="$v.patient.degree.$touch()"
              :class="{ 'is-invalid': $v.patient.degree.$error }">
              <option selected disabled value="">Seleccione</option>
              <option value="Ninguno">Ninguno</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Superior">Superior</option>
            </select>
            <div v-if="$v.patient.degree.$error">
              <small class="text-danger" v-if="!$v.patient.degree.required">Ingrese su grado de instrucción.</small>
            </div>
          </div>
        </div>
        <h4 class="mt-3">Antecedentes personales</h4>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Patológicos</label>
              <textarea v-model="patient.pathological" class="form-control" rows="2"></textarea>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Quirúrgicos</label>
              <textarea v-model="patient.surgical" class="form-control" rows="2"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <label>Alergías</label>
          </div>
          <div class="col-10">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="alergies-yes" v-model="patient.alergies" :value="true">
              <label class="form-check-label" for="alergies-yes">Sí</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="alergies-no" v-model="patient.alergies" :value="false">
              <label class="form-check-label" for="alergies-no">No</label>
            </div>
            <div v-if="$v.patient.alergies.$error">
              <small class="text-danger" v-if="!$v.patient.alergies.required">Seleccione si tiene alergias.</small>
            </div>
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
import { required, minLength, numeric } from 'vuelidate/lib/validators'
import fire from '../fire.js'

const db = fire.firestore()
const patientsRef = db.collection('patients')
const masterRef = patientsRef.doc('master')

export default {
  methods: {
    submit () {
      this.$v.patient.$touch()
      if (!this.$v.patient.$invalid) {
        this.saveBut.message = '•••'
        this.saveBut.disabled = true
        this.patient.createdAt = new Date()
        db.runTransaction(transaction => {
          return transaction.get(masterRef).then(masterDoc => {
            if (!masterDoc.exists) {
              throw Error('document does not exist!')
            }
            let newCount = masterDoc.data().count + 1
            this.patient.code = newCount
            transaction.update(masterRef, {count: newCount})
          })
        })
          .then(() => db.collection('patients').add(this.patient))
          .then(() => {
            this.$root.setRoute('/')
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
    patient: {
      motherSurname: '',
      fatherSurname: '',
      name: '',
      phone: '',
      birthday: '',
      civilStatus: '',
      documentType: '',
      document: '',
      address: '',
      residence: '',
      nacionality: '',
      sex: '',
      pathological: '',
      surgical: '',
      occupation: '',
      degree: '',
      addressReference: '',
      alergies: null
    }
  }),
  components: {
    Datepicker
  },
  validations: {
    patient: {
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
      civilStatus: { required },
      documentType: { required },
      document: { required },
      address: { required },
      residence: { required },
      nacionality: { required },
      sex: { required },
      occupation: { required },
      degree: { required },
      alergies: {
        check (value) {
          return (value === true || value === false)
        }
      }
    }
  }
}
</script>
