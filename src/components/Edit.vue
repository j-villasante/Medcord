<template>
  <div class="row align-items-center">
    <div class="col-11">
      <textarea v-if="editing" class="form-control" v-model="newValue"></textarea>
      <div v-if="!editing">{{value}}</div>
    </div>
    <div class="col-1">
      <img class="clickable" v-if="editing" src="../assets/icons/ic_save_black_24px.svg" v-on:click="onSaveClick">
      <img class="clickable" v-if="editing" src="../assets/icons/ic_close_black_24px.svg" v-on:click="onCancelClick">
      <img class="clickable" v-if="!editing" src="../assets/icons/ic_mode_edit_black_24px.svg" v-on:click="onEditClick">      
    </div>
  </div>
</template>
<script>
export default {
  props: {
    document: {
      required: true
    },
    value: {
      required: true,
      type: String
    }
  },
  data: () => ({
    editing: false,
    newValue: ''
  }),
  methods: {
    onEditClick () {
      this.newValue = this.value
      this.editing = !this.editing
    },
    onSaveClick () {
      this.document.update({
        entry: this.newValue
      })
      this.editing = !this.editing
    },
    onCancelClick () {
      this.editing = !this.editing
    }
  }
}
</script>
