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

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import item from '@/components/item.vue'
import recommend from '@/components/recommend.vue'
import breadcrumb from '@/components/breadcrumb.vue'

@Component({
  components: {
    item,
    recommend,
    breadcrumb
  },
  computed: {
    item () {
      return this.$store.state.item.data
    }
  }
})
export default class extends Vue {
  async fetch ({ store, params }: Context) {
    await store.dispatch('item/get', params.id)
  }
}
</script>
