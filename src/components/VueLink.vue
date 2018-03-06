<template>
  <a :href="href"
    v-on:click="go" >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    go (event) {
      event.preventDefault()
      this.$root.setRoute(this.href)
    }
  }
}
</script>
