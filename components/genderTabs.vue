<template lang="pug">
  v-tabs(fixed-tabs)
    v-tab(v-for="gender in genders" v-bind:key="gender.id" :data-gender="gender.key" v-on:click="gender_switch(gender.key)")
      | {{ gender.name }}
</template>

<script>
export default {
  computed: {
    genders() {
      return this.$store.state.item.genders;
    }
  },
  methods: {
    async gender_switch(gender) {
      await this.$store.dispatch("item/search", {
        gender: gender,
        category: "",
        subCategory: ""
      });
      await this.$store.dispatch("item/category");
      await this.$store.dispatch("item/subCategories");
    }
  }
}
</script>
