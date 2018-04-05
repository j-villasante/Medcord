<template>
  <div>
    <div class="row"><b>{{title}}</b></div>
    <div v-if="isEditMode" class="row mb-2">
      <input type="text" class="form-control col-10 my-2" v-model="newValue">
      <img class="col-2" src="../assets/icons/ic_save_black_24px.svg" v-on:click="onSaveClick">
    </div>
    <div v-else class="row mb-2">
      <div>{{value}}</div>
      <img class="col-2" src="../assets/icons/ic_mode_edit_black_24px.svg" v-on:click="onEditClick">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    document: {
      required: true
    }
  },
  data: () => ({
    isEditMode: false,
    newValue: ''
  }),
  methods: {
    onEditClick () {
      this.isEditMode = true
    },
    onSaveClick () {
      let obj = {}
      obj[this.name] = this.newValue
      this.document.update(obj)
      this.isEditMode = false
    }
  },
  mounted () {
    this.newValue = this.value
  }
}
</script>
<style scoped>
input {
  height: 30px;
}
</style>
