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
      <genderTabs />
      <categoryTabs />
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <item v-for="item in items" :item="item" :isDetail="false" />
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import item from '@/components/item.vue';
import genderTabs from '@/components/genderTabs.vue';
import categoryTabs from '@/components/categoryTabs.vue';

export default {
  components: {
    genderTabs,
    categoryTabs,
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
