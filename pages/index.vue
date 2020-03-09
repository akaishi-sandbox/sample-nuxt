<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <tabs />
      </div>
      <ul class="itemfeed_list flex">
        <item v-for="item in items" :item="item"  :isDetail="false" />
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import item from '@/components/item.vue';
import tabs from '@/components/tabs.vue';

export default {
  components: {
    tabs,
    item
  },
  computed: {
    items() {
      return this.$store.state.item.list;
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch("item/search");
  }
}
</script>
