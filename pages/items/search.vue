<template lang="pug">
  v-layout(column justify-center)
    v-flex(xs12 sm8 md6)
      sortBox
      v-row(no-gutters)
        item(v-for="item in items" :item="item" v-bind:key="item.id" :isDetail="false")
</template>

<script>
import item from '@/components/item.vue';
import sortBox from '@/components/sortBox.vue';

export default {
  components: {
    sortBox,
    item
  },
  data() {
    return {
      keyword: ""
    };
  },
  created() {
    this.$store.dispatch("item/init", {
      gender: true,
      keyword: true
    });
  },
  computed: {
    items() {
      return this.$store.state.item.list;
    }
  },
  methods: {
    async search(event) {
      console.log("keyword", this.keyword);
      await this.$store.dispatch("item/search", {
        keyword: this.keyword
      });
    }
  }
}
</script>
