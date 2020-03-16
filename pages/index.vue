<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      itemList(:items="items")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import itemList from '@/components/itemList.vue'

@Component({
  components: {
    itemList
  },
  computed: {
    items () {
      return this.$store.state.item.list
    }
  }
})
export default class extends Vue {
  async fetch ({ store }: Context) {
    await store.dispatch('item/search')
  }

  async created () {
    this.$store.dispatch('item/init', {
      gender: true,
      category: true
    })
    await this.$store.dispatch('item/category')
  }
}
</script>
