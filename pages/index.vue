<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      itemList(:items="items")
</template>

<script>
import itemList from '@/components/itemList.vue'

export default {
  components: {
    itemList
  },
  async fetch ({ store }) {
    await store.dispatch('item/search')
  },
  computed: {
    items () {
      return this.$store.state.item.list
    }
  },
  async created () {
    this.$store.dispatch('item/init', {
      gender: true,
      category: true
    })
    await this.$store.dispatch('item/category')
  }
}
</script>
