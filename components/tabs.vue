<template>
  <div>
    <ul id="gender_switches" class="gender_select flex scrollable">
      <li v-for="gender in genders" class="gender_switch" :data-gender="gender.key" v-on:click="gender_switch(gender.key)">
          <a href="javascript:void(0)" class="imgLoad">{{ gender.name }}</a>
      </li>
    </ul>
    <nav id="category_switches" class="header_nav">
      <ul class="flex">
          <li v-for="category in categories" class="category_switch" v-on:click="category_switch(category)">
              <a href="javascript:void(0)" class="pcat imgLoad" data-category="category">{{ category }}</a>
          </li>
      </ul>
    </nav>
    <nav id="sub_category_switches" class="home_cat_nav">
      <ul class="flex">
          <li v-for="subCategory in subCategories" class="h_c_nav_item sub_category_switch" v-on:click="sub_category_switch(subCategory)">
              <a href="javascript:void(0)" class="imgLoad subcat" data-sub_category="subCategory">{{ subCategory }}</a>
          </li>
      </ul>
    </nav>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    search() {
      return this.$store.state.item.search;
    },
    genders() {
      return this.$store.state.item.genders;
    },
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
    async gender_switch(gender) {
      await this.$store.dispatch("item/search", {
        gender: gender,
        category: "",
        subCategory: ""
      });
      await this.$store.dispatch("item/category");
      await this.$store.dispatch("item/subCategories");
    },
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
