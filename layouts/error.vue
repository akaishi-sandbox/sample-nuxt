<template lang="pug">
  v-app(dark)
    h1(v-if="error.statusCode === 404")
      | {{ pageNotFound }}
    h1(v-else)
      | {{ otherError }}
    nuxtLink(to="/")
      Home(page)
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    } as PropOptions<any>
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title:string =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
