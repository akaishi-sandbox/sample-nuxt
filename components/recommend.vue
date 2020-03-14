<template lang="pug">
  v-card
    div
      h2
        | おすすめアイテム
      v-row(no-gutters)
        item(v-for="item in items" v-bind:key="item.id" :item="item" :isDetail="false")
</template>
<script>
import item from '@/components/item.vue'

export default {
  components: {
    item
  },
  props: {
    item: {
      type: Object,
      default: null
    }
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
