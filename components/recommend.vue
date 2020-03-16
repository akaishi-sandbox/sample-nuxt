<template lang="pug">
  v-card
    div
      h2
        | おすすめアイテム
      itemList(:items="items")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
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
  @Prop()
  item!: any

  async created () {
    if (this.item.itemId) {
      await this.$store.dispatch('item/recommend', {
        itemId: this.item.itemId,
        brand: this.item.brand
      })
    }
  }
}
</script>
