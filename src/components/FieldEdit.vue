<template>
  <div class="row">
    <div><b>{{title}}</b></div>
    <div v-if="isEditMode" class="mb-2 full-width">
      <div class="row">
        <div class="col-10">
          <textarea v-if="isTextArea" class="form-control my-2" v-model="newValue"></textarea>
          <input v-else type="text" class="form-control my-2" v-model="newValue">          
        </div>
        <img class="col-2" src="../assets/icons/ic_save_black_24px.svg" v-on:click="onSaveClick">
      </div>
    </div>
    <div v-else class="mb-2 full-width">
      <div class="row">
        <div class="col-10">{{value}}</div>
        <div class="col-2">
          <img src="../assets/icons/ic_mode_edit_black_24px.svg" v-on:click="onEditClick">
        </div>
      </div>
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
    },
    isTextArea: {
      type: Boolean
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
      if (this.newValue) this.document.update(obj)
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

.full-width {
  width: 100%;  
}
</style>
