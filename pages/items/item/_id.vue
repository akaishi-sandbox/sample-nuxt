<template lang="pug">
  v-layout
    v-flex
      item(:item="item" :isDetail="true")
      <!-- おすすめコンテンツ -->
      recommend(:item="item")
      <!-- パンくず -->
      breadcrumb(:item="item")
      <!-- ロゴ部分 -->
      .home_img
        .home_img_ct.flex
          h2 unisize
          p 自分好みの快適な服探し
</template>
<script>
import axios from 'axios';
import item from '@/components/item.vue';
import recommend from '@/components/recommend.vue';
import breadcrumb from '@/components/breadcrumb.vue';

export default {
  components: {
    item: item,
    recommend: recommend,
    breadcrumb: breadcrumb
  },
  computed: {
  },
  async asyncData ({ params }) {
    const { data } = await axios.get(`https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/search-items?item_id=${params.id}`);
    if (data.total == 0) {
      // throw new Error("todo")
    }
    const shops = [];
    let imageUrls = [];
    const detailUrls = {};
    const contents = {};
    const lowestPrice = {
      shop: "",
      price: 99999999
    };
    for (const item of data.items) {
      const shop = item._source.shop;
      shops.push(shop);
      detailUrls[shop] = item._source.detail_url;
      contents[shop] = item._source.description;
      if (lowestPrice.price > item._source.lowest_price) {
          lowestPrice.shop = shop;
          lowestPrice.price = item._source.lowest_price;
      }
      if (item._source.image_urls == undefined) {
        for (let i = 1; i <= item._source.image_num; i++) {
          imageUrls.push(`https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/main${i}.jpg`);
        }
      } else {
        imageUrls = item._source.image_urls;
      }
    }
    const sizeTable = {
      headers: [],
      items: []
    };
    if(data.items[0]._source.SKUs) {
      sizeTable.headers.push({
        text: "サイズ",
        sortable: false,
        value: "size"
      });
      for (let i = 0; i < data.items[0]._source.SKUs.length; i++) {
        const sku = data.items[0]._source.SKUs[i];
        if (i === 0) {
          for (const part of sku.parts) {
            sizeTable.headers.push({
              text: part.part,
              sortable: false,
              value: part.part
            });
          }
        }
        const sizeInfo = {
          size: sku.size
        };
        for (const part of sku.parts) {
          sizeInfo[part.part] = part.scale;
        }
        sizeTable.items.push(sizeInfo);
      }
    }
    return {
      item: {
        title: data.items[0]._source.title,
        brand: data.items[0]._source.brand,
        category: data.items[0]._source.category,
        shops: shops,
        gender: data.items[0]._source.gender,
        itemId: data.items[0]._source.item_id,
        clientId: "todo",
        imageUrl: imageUrls[0],
        detailUrls: detailUrls,
        contents: contents,
        lowestPrice: lowestPrice,
        isSized: data.items[0]._source.is_sized,
        sizeTable: sizeTable,
        skus: data.items[0]._source.SKUs,
        color: data.items[0]._source.color
      }
    };
  }
}
</script>
