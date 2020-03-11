<template>
  <div>
    <nav id="category_switches" class="header_nav">
      <v-tabs show-arrows>
          <v-tab v-for="category in categories" class="category_switch" v-on:click="category_switch(category)">
              {{ category }}
          </v-tab>
      </v-tabs>
    </nav>
    <nav id="sub_category_switches" class="home_cat_nav">
      <v-tabs fixed-tabs>
          <v-tab v-for="subCategory in subCategories" class="h_c_nav_item sub_category_switch" v-on:click="sub_category_switch(subCategory)">
              {{ subCategory }}
          </v-tab>
      </v-tabs>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.item.categories;
    },
    subCategories() {
      return this.$store.state.item.subCategories;
    }
  },
  async created() {
    await this.$store.dispatch("item/category");
  },
  methods: {
    async category_switch(category) {
      await this.$store.dispatch("item/search", {
        category: category
      });
      await this.$store.dispatch("item/subCategories", category);
    },
    async sub_category_switch(subCategory) {
      await this.$store.dispatch("item/search", {
        subCategory: subCategory
      });
    }
  }
}
</script>
