<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      v-row(no-gutters)
        item(v-for="item in items" v-bind:key="item.id" :item="item" :isDetail="false")
</template>

<script>
import item from '@/components/item.vue';

export default {
  components: {
    item
  },
  computed: {
    items() {
      return this.$store.state.item.list;
    }
  },
  async created() {
    this.$store.dispatch("item/init", {
      gender: true,
      category: true
    });
    await this.$store.dispatch("item/category");
  },
  async fetch ({ store, params }) {
    await store.dispatch("item/search");
  }
}
</script>
