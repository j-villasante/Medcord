<template>
  <div id="record-to-print" class="d-print-block d-none">
    <br><br>
    <h3 class="text-center">CENTRO MEDICO ESPECIALIZADO "SANTA ROSA"</h3>
    <br><br>
    <h3 class="text-center">HISTORIA CLÍNICA</h3>
    <br><br>
    <div>NRO: {{patient.code}}</div>
    <br>
    <div>FECHA: {{createdAt}}</div>
    <br>
    <div>DATOS GENERALES</div>
    <br>
    <ul>
      <li>
        <div class="row">
          <div class="col-4">NOMBRES Y APELLIDOS:</div>
          <div class="col-8">{{patient.name}} {{patient.fatherSurname}} {{patient.motherSurname}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">{{patient.documentType}}:</div>
          <div class="col-8">{{patient.document}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">SEXO:</div>
          <div class="col-8">{{patient.sex}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">EDAD:</div>
          <div class="col-8">{{patient.age}} AÑOS</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">ESTADO CIVIL:</div>
          <div class="col-8">{{patient.civilStatus}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">FECHA DE NACIMIENTO:</div>
          <div class="col-8">{{patient.birthday}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">LUGAR DE NACIMIENTO:</div>
          <div class="col-8">{{patient.nacionality}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">PROCEDENCIA:</div>
          <div class="col-8">{{patient.residence}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">DOMICILIO:</div>
          <div class="col-8">{{patient.address}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">GRADO DE INSTRUCCIÓN:</div>
          <div class="col-8">{{patient.degree}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">OCUPACIÓN:</div>
          <div class="col-8">{{patient.occupation}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">REFERENCIA:</div>
          <div class="col-8">{{patient.addressReference}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">TELEFONO:</div>
          <div class="col-8">{{patient.phone}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">CORREO:</div>
          <div class="col-8">{{patient.email}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">FACEBOOK:</div>
          <div class="col-8">{{patient.facebook}}</div>
        </div>
      </li>
    </ul>
    <br>
    <h4>ANTECEDENTES PERSONALES</h4>
    <ul>
      <li>
        <div class="row">
          <div class="col-4">PATOLOGICOS:</div>
          <div class="col-8">{{patient.pathological}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">QUIRURGICOS:</div>
          <div class="col-8">{{patient.surgical}}</div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-4">ALERGIAS:</div>
          <div class="col-8">{{patient.alergies ? 'Sí' : 'No'}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { format } from 'date-fns'
export default {
  props: {
    patient: {
      required: true,
      type: Object
    }
  },
  computed: {
    createdAt () {
      return format(this.patient.createdAt, 'DD/MM/YYYY')
    }
  }
}
</script>
<style>
#record-to-print div {
  font-size: 20px;
  margin-bottom: 1px;
  margin-top: 1px;
}
</style>
