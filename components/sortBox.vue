<template lang="pug">
  div
    p
      span
        | {{ total }}件
      div
        v-btn(@click="sort")
          span
            | 人気順
        v-btn(@click.stop="rightDrawer = !rightDrawer")
          | 絞り込み
        ul
          li
            | 人気順
          li(data-order="new")
            | 新しい順
          li(data-order="min-max")
            | 価格の安い順
          li(data-order="max-min")
            | 価格の高い順
    v-navigation-drawer(v-model="rightDrawer" :right="right" temporary fixed)
      v-list
        v-list-item(v-for="(item, i) in items" v-bind:key="item.id")
          v-list-item-action
            v-icon
              | {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
</template>

<script>
export default {
  data() {
    return {
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
    total() {
      return this.$store.state.item.total;
    }
  },
  methods: {
    sort() {
      console.log("sort");
    }
  }
}
</script>
