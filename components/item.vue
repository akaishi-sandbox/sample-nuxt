<template>
  <div v-if="isDetail">
      <!-- 画像 -->
      <img
        :src="item.imageUrl"
        :alt="item.brand"
        class="mb-5"
      >
      <!-- ブランド名・タイトル -->
      <div class="single_container flex">
        <div class="single_info" :data-item_id="item.itemId" :data-brand="item.brand">
            <h1>{{ item.brand }} {{ item.title }}</h1>
        </div>
      </div>
      <!-- 金額・ショップリンク -->
      <div class="single_container flex">
          <span>{{ item.lowestPrice.price }} -</span>
          <a v-for="detailUrl in item.detailUrls" :href="detailUrl" rel="nofollow" target="_blank" class="to_shop_btn">
            ショップへ行く
          </a>
      </div>
      <!-- コンテンツ -->
      <div class="single_container">
          <div class="flex" id="toggle_dtl">
              <h2>商品の説明</h2>
              <i class="fa fa-angle-down"></i>
          </div>
          <div class="single_content">
              <div v-for="content in item.contents">
                <h3>{{ item.shop }}</h3>
                <div v-html="desc">{{ content }}</div>
              </div>
              <!-- unisize v3 start -->
              <div id="unisize_tag" :data-cid="item.clientId" data-cuid="" :data-itm="item.itemId"></div>
              <script type="text/javascript" src="https://bnr.cl.unisize.makip.co.jp/tag/unisize.js"></script>
              <!-- unisize v3 start -->
          </div>
      </div>
  </div>
  <v-col v-else>
      <v-card :click="`/items/item/${item.itemId}`">
          <v-img :src="item.imageUrl.pc" :srcset="`${item.imageUrl.sp} 414w, ${item.imageUrl.retina} 1080w,${item.imageUrl.pc} 1920w`" :alt="`${item.brand} ${item.title}`">
            <v-card-title v-text="item.brand"></v-card-title>
          </v-img>
      </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["item", "isDetail"]
}
</script>
