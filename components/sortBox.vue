<template>
  <div class="refineBox flex">
        <p><span class="total">{{ total }}</span>件</p>
        <div>
            <v-btn @click="sort"><i class="fas fa-sort-alt fa-fw"></i><span class="order">人気順</span></v-btn>
            <v-btn @click.stop="rightDrawer = !rightDrawer"><i class="fa fa-sliders fa-fw"></i>絞り込み</v-btn>
            <ul class="sortBox">
              <li class="selected">人気順</li>
              <li data-order="new">新しい順</li>
              <li data-order="min-max">価格の安い順</li>
              <li data-order="max-min">価格の高い順</li>
            </ul>
        </div>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item v-for="(item, i) in items">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
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
