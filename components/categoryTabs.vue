<template lang="pug">
  div
    nav
      v-tabs(show-arrows)
        v-tab(v-for="category in categories" v-on:click="category_switch(category)")
          | {{ category }}
    nav
      v-tabs(fixed-tabs)
        v-tab(v-for="subCategory in subCategories" v-on:click="sub_category_switch(subCategory)")
          | {{ subCategory }}
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
