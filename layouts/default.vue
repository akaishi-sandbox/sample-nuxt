<template lang="pug">
  v-app
    v-navigation-drawer(v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app)
      v-list
        v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
          v-list-item-action
            v-icon
              | {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
    v-app-bar(:clipped-left="clipped" fixed app)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-spacer
      v-toolbar-title
        router-link(to="/" class="toolbar-title")
          | {{ title }}
      v-spacer
      v-btn(icon href="/items/search")
        v-icon
          | mdi-magnify
    v-content
      v-container
        nuxt
    v-footer(:fixed="fixed" app)
        p.logo
          | unisize
          i
            |β版
        ul.footer_nav
          li
            a(href="https://makip.co.jp/#contact_us_area" target="_blank")
              | お問い合わせ
          li
            a(href="https://makip.co.jp/#company" target="_blank")
              | 会社概要
          li
            a(href="https://makip.co.jp/unisize-terms.html" target="_blank")
              | 利用規約
          li
            a(href="https://makip.co.jp/privacy-policy.html" target="_blank")
             | プライバシーポリシー
</template>

<style lang="stylus" scoped>
.toolbar-title
  color inherit
  text-decoration inherit
</style>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'unisize',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'お問い合わせ',
          to: 'https://makip.co.jp/#contact_us_area'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '会社概要',
          to: 'https://makip.co.jp/#company'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '利用規約',
          to: 'https://makip.co.jp/unisize-terms.html'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'プライバシーポリシー',
          to: 'https://makip.co.jp/privacy-policy.html'
        }
      ],
      miniVariant: false,
      title: 'unisizeβ版'
    }
  }
}
</script>
