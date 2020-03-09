<template>
  <v-layout>
    <v-flex class="text-center">
    <item :item="item" :isDetail="true" />
    <!-- おすすめコンテンツ -->
    <recommend :item="item" />
    <!-- パンくず -->
    <breadcrumb :item="item" />
    <!-- ロゴ部分 -->
    <div class="home_img">
        <div class="home_img_ct flex">
            <div>
                <h2>unisize</h2>
                <p>自分好みの快適な服探し</p>
            </div>
        </div>
    </div>
    </v-flex>
  </v-layout>
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
    const imageUrls = [];
    const detailUrls = [];
    const contents = [];
    const lowestPrice = {
      shop: "",
      price: 99999999
    };
    for (const item of data.items) {
      console.log("item", item);
      detailUrls.push(item._source.detail_url);
      contents.push(item._source.description);
      if (lowestPrice.price > item._source.lowest_price) {
          lowestPrice.shop = item._source.shop;
          lowestPrice.price = item._source.lowest_price;
      }
      if (item._source.image_urls == undefined) {
        for (let i = 1; i <= item._source.image_num; i++) {
          imageUrls.push(`https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/main${i}.jpg`);
        }
      }
    }
    console.log("imageUrls", imageUrls);
    return {
      item: {
        clientId: "todo",
        itemId: data.items[0]._source.item_id,
        title: data.items[0]._source.title,
        brand: data.items[0]._source.brand,
        gender: data.items[0]._source.gender,
        category: data.items[0]._source.category,
        imageUrl: imageUrls[0],
        detailUrls: detailUrls,
        contents: contents,
        lowestPrice: lowestPrice
      }
    };
  }
}
</script>
