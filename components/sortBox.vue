<template lang="pug">
  v-card
    v-card.d-flex.mb-6(flat tile)
      v-card.mr-auto.pa-2(flat tile outlined)
        | {{ total }}件
      v-card.pa-2(flat tile outlined)
        v-btn(@click="sort" x-small)
          v-icon(left)
            | mdi-sort
          | 人気順
        v-btn(@click.stop="rightDrawer = !rightDrawer" x-small)
          v-icon(left)
            | mdi-segment
          | 絞り込み
    v-list
      v-list-item-group
        v-list-item(v-for="(sort, i) in sorts" v-bind:key="sort.id")
          v-list-item-content
            v-list-item-title(v-text="sort.title")
          v-list-item-action
            v-icon mdi-chart-bubble
    v-navigation-drawer(v-model="rightDrawer" :right="right" temporary fixed)
      v-list
        v-list-item(v-for="(item, i) in items" v-bind:key="item.id")
          v-list-item-action
            v-icon
              | {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  data () {
    return {
      sorts: [
        {
          title: '人気順',
          id: 'fav'
        },
        {
          title: '新しい順',
          id: 'new'
        },
        {
          title: '価格の安い順',
          id: 'min-max'
        },
        {
          title: '価格の高い順',
          id: 'max-min'
        }
      ],
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'セール',
          to: 'https://makip.co.jp/#contact_us_area'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'カテゴリー',
          to: 'https://makip.co.jp/#company'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ブランド',
          to: 'https://makip.co.jp/unisize-terms.html'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '金額',
          to: 'https://makip.co.jp/privacy-policy.html'
        }
      ],
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    total () {
      return this.$store.state.item.total
    }
  },
  methods: {
    sort () {
      console.log('sort')
    }
  }
})
export default class extends Vue {

}
</script>
