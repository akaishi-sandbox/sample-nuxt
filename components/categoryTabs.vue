<template lang="pug">
  div
    v-tabs(show-arrows)
      v-tab(v-for="category in categories" v-bind:key="category.id" v-on:click="category_switch(category)")
        | {{ category }}
    v-tabs(fixed-tabs)
      v-tab(v-for="subCategory in subCategories" v-bind:key="subCategory.id" v-on:click="sub_category_switch(subCategory)")
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
