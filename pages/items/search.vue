<template lang="pug">
  v-layout(column justify-center)
    v-flex(xs12 sm8 md6)
      sortBox
      itemList(:items="items")
</template>

<script>
import itemList from '@/components/itemList.vue'
import sortBox from '@/components/sortBox.vue'

export default {
  components: {
    itemList,
    sortBox
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    items () {
      return this.$store.state.item.list
    }
  },
  created () {
    this.$store.dispatch('item/init', {
      gender: true,
      keyword: true
    })
  },
  methods: {
    async search () {
      await this.$store.dispatch('item/search', {
        keyword: this.keyword
      })
    }
  }
}
</script>
