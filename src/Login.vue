<template>
  <div id="login-body" class="text-center">
    <div class="form-signin">
      <img class="mb-4" src="./assets/Roundel_of_the_Red_Cross.svg" alt="" width="100" height="100">
      <h1 class="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
      <label for="inputEmail" class="sr-only">Correo electrónico</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Correo electrónico" ref="email" v-on:keyup.13="login" required autofocus>
      <label for="inputPassword" class="sr-only">Contraseña</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Contraseña" ref="password" v-on:keyup.13="login" required>
      <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="login">{{loginBut}}</button>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'

export default {
  data: () => ({
    error: false,
    loginBut: 'Ingresar'
  }),
  methods: {
    login () {
      this.loginBut = '•••'
      firebase.auth().signInWithEmailAndPassword(this.$refs.email.value, this.$refs.password.value).catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.error = 'Formato de correo incorrecto'
            break
          case 'auth/user-disabled':
            this.error = 'El usuario esta inhabilitado'
            break
          case 'auth/user-not-found':
            this.error = 'Usuario o contraseña incorrectos'
            break
          case 'auth/wrong-password':
            this.error = 'Usuario o contraseña incorrectos'
            break
          default:
            this.error = error.message
        }
        this.loginBut = 'Ingresar'
      })
    }
  }
}
</script>
<style type="text/css">
.login-body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>