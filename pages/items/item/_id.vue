<template lang="pug">
  v-layout
    v-flex
      item(:item="item")
      //- おすすめコンテンツ
      recommend(:item="item")
      //- パンくず
      breadcrumb(:item="item")
      //- ロゴ部分
      div.home_img
        div.home_img_ct.flex
          h2 unisize
          p 自分好みの快適な服探し
</template>
<script>
import item from '@/components/item.vue'
import recommend from '@/components/recommend.vue'
import breadcrumb from '@/components/breadcrumb.vue'

export default {
  components: {
    item,
    recommend,
    breadcrumb
  },
  async fetch ({ store, params }) {
    await store.dispatch('item/get', params.id)
  },
  computed: {
    item () {
      return this.$store.state.item.data
    }
  }
}
</script>
