import axios from "axios";

export const state = () => ({
         parameter: {
           gender: "WOMEN",
           category: "",
           keywords: ""
         },
         genders: [
           {
             key: "WOMEN",
             name: "レディース"
           },
           {
             key: "MEN",
             name: "メンズ"
           }
         ],
         categories: [],
         subCategories: [],
         list: []
       });

export const actions = {
         async category({ commit }) {
           const { data } = await axios.get(
             `https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/classification-info`,
             {
               params: {
                 index: "categories",
                 gender: this.state.item.parameter.gender
               }
             }
           );

           let categories = ["ALL"];
           categories = categories.concat(
             data.hits.map(hit => hit._source.title)
           );
           commit("SET_CATEGORY", categories);
         },
        async subCategories({ commit }, payload) {
           commit("TOGGLE_CATEGORY", payload );
           const { data } = await axios.get(
             `https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/classification-info`,
             {
               params: {
                 index: "categories",
                 gender: this.state.item.parameter.gender,
                 title: this.state.item.parameter.category
               }
             }
           );

           let categories = [];
           if (data.total > 0) {
             categories = ["ALL"];
             categories = categories.concat(
               data.hits[0]._source.sub_categories.map(
                 category => category.title
               )
             );
           }
           commit("SET_SUBCATEGORY", categories);
         },
  async search({ commit }, payload) {
           commit("SET_PARAMETER", payload);
           const { data } = await axios.get(
             `https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/search-items`,
             {
               params: this.state.item.parameter
             }
           );
           const items = data.items.map(item => {
             const lowestPrice = {
               shop: "",
               price: 99999999
             };
             if (lowestPrice.price > item._source.lowest_price) {
               lowestPrice.shop = item._source.shop;
               lowestPrice.price = item._source.lowest_price;
             }
             const imageUrls = [];
             if (item._source.image_urls == undefined) {
               for (let i = 1; i <= item._source.image_num; i++) {
                 imageUrls.push(
                   `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/main${i}.jpg`
                 );
               }
             }
             return {
               clientId: "todo",
               itemId: item._source.item_id,
               title: item._source.title,
               brand: item._source.brand,
               gender: item._source.gender,
               category: item._source.category,
               imageUrl: {
                 retina: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/retina/thumbnail.jpg`,
                 pc: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/pc/thumbnail.jpg`,
                 sp: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/sp/thumbnail.jpg`
               },
               imageUrls: imageUrls,
               detailUrls: [item._source.detail_url],
               contents: [item._source.description],
               lowestPrice: lowestPrice
             };
           });
           commit("SET_RESULT", items);
         }
       };

export const mutations = {
         SET_PARAMETER(state, data) {
           if (data != undefined) {
             if (data.gender != undefined) {
               state.parameter.gender = data.gender;
             }
             if (data.category != undefined && data.category != "ALL") {
               state.parameter.category = data.category;
             }
             if (data.subCategory != undefined && data.subCategory != "ALL") {
               state.parameter.keywords = data.subCategory;
             }
           }
         },
         SET_RESULT(state, data) {
           state.list = data;
         },
         SET_CATEGORY(state, data) {
           state.categories = data;
         },
         SET_SUBCATEGORY(state, data) {
           state.subCategories = data;
         },
         TOGGLE_GENDER(state, gender) {
           state.parameter.gender = gender;
         },
         TOGGLE_CATEGORY(state, category) {
           state.parameter.category = category;
         },
         TOGGLE_SUBCATEGORY(state, subCategory) {
           state.parameter.subCategory = subCategory;
         }
       };
