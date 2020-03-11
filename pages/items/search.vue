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
        <genderTabs />
      </div>
      <ul class="itemfeed_list flex">
        <v-text-field
          v-model="keyword"
          append-icon="mdi-magnify"
          label="検索"
          sigle-line
          @keyup.enter="search"
        />
        <sortBox />
        <item v-for="item in items" :item="item" :isDetail="false" />
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import item from '@/components/item.vue';
import genderTabs from '@/components/genderTabs.vue';
import sortBox from '@/components/sortBox.vue';

export default {
  components: {
    genderTabs,
    sortBox,
    item
  },
  data() {
    return {
      keyword: ""
    };
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
