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
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
})
export default class extends Vue {
  @Prop()
  error!: { statusCode: number }

  head () {
    const title =
      this.error.statusCode === 404 ? this.$data.pageNotFound : this.$data.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
