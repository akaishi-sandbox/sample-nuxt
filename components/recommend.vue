<template lang="pug">
  v-card
    div
      h2
        | おすすめアイテム
      itemList(:items="items")
</template>
<script>
import itemList from '@/components/itemList.vue'

export default {
  components: {
    itemList
  },
  computed: {
    items () {
      return this.$store.state.item.list
    }
  },
  async created () {
    console.log('recommend:', this.item)
    if (this.item.itemId) {
      await this.$store.dispatch('item/recommend', {
        itemId: this.item.itemId,
        brand: this.item.brand
      })
    }
  }
}
</script>
