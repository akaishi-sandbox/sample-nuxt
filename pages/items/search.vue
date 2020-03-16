<template lang="pug">
  v-layout(column justify-center)
    v-flex(xs12 sm8 md6)
      sortBox
      itemList(:items="items")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import itemList from '@/components/itemList.vue'
import sortBox from '@/components/sortBox.vue'

@Component({
  components: {
    itemList,
    sortBox
  },
  computed: {
    items () {
      return this.$store.state.item.list
    }
  },
  methods: {
    async search () {
      await this.$store.dispatch('item/search', {
        keyword: this.$data.keyword
      })
    }
  }
})
export default class extends Vue {
  data () {
    return {
      keyword: ''
    }
  }

  created () {
    this.$store.dispatch('item/init', {
      gender: true,
      keyword: true
    })
  }
}
</script>
