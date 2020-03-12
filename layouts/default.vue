<template lang="pug">
  v-app
    v-navigation-drawer(v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app)
      v-list
        v-subheader.font-weight-bold.logo
          | unisize
        v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
          v-list-item-action
            v-icon
              | {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
    v-app-bar(:clipped-left="clipped" fixed app :extension-height="appBarHeight")
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-spacer
      v-toolbar-title
        router-link.logo.toolbar-title(to="/")
          | unisize
          i β版
      v-spacer
      v-btn(icon href="/items/search")
        v-icon
          | mdi-magnify
      template(v-slot:extension v-if="tabs.gender || tabs.categories || tabs.subCategories || tabs.keywords")
        v-card(flat width="100%")
          v-tabs(v-if="tabs.gender && genders.length > 0" grow v-model="gender")
            v-tab(v-for="gender in genders" v-bind:key="gender.key" :data-gender="gender.key" v-on:click="gender_switch(gender.key)")
              | {{ gender.name }}
          v-tabs(v-if="tabs.category && categories.length > 0" show-arrows v-model="category")
            v-tab(v-for="category in categories" v-bind:key="category" v-on:click="category_switch(category)")
              | {{ category }}
          v-btn-toggle(v-if="tabs.category && subCategories.length > 0" tile color="deep-red accent-3" group)
            v-btn(v-for="subCategory in subCategories" v-bind:key="subCategory" :value="subCategory" v-on:click="sub_category_switch(subCategory)")
              | {{ subCategory }}
          v-text-field.mt-4(v-if="tabs.keyword" v-model="keyword" append-icon="mdi-magnify" label="検索" sigle-line @keyup.enter="search")
    v-content
      v-container(fluid)
        nuxt
    v-footer(:fixed="fixed" app dark padless)
      v-card.flex
        v-card-title
          strong.logo unisize
          i β版
          v-spacer
          a.my-2(v-for="(item, i) in items" :key="i" :to="item.to" :href="item.to" target="_blank")
            | {{ item.title }}
</template>

<style lang="stylus" scoped>
.logo
  font-family Montserrat
.toolbar-title
  color inherit
  text-decoration inherit
</style>

<script>
export default {
  computed: {
    tabs() {
      return this.$store.state.item.tabs;
    },
    genders() {
      return this.$store.state.item.genders;
    },
    categories() {
      return this.$store.state.item.categories;
    },
    subCategories() {
      return this.$store.state.item.subCategories;
    },
    appBarHeight() {
      return this.$store.state.item.appBarHeight;
    }
  },
  methods: {
    async gender_switch(gender) {
      this.category = "";
      await this.$store.dispatch("item/search", {
        gender: gender,
        category: "",
        subCategory: ""
      });
      await this.$store.dispatch("item/category");
      await this.$store.dispatch("item/subCategory");
    },
    async category_switch(category) {
      await this.$store.dispatch("item/search", {
        category: category
      });
      await this.$store.dispatch("item/subCategory");
    },
    async sub_category_switch(subCategory) {
      await this.$store.dispatch("item/search", {
        subCategory: subCategory
      });
    },
    async search(event) {
      console.log("keyword", this.keyword);
      await this.$store.dispatch("item/search", {
        keyword: this.keyword
      });
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      keyword: "",
      gender: this.$store.state.item.parameter.gender,
      category: this.$store.state.item.parameter.category,
      items: [
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
      title: 'unisize'
    }
  }
}
</script>
