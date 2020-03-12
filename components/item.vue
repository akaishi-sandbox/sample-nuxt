<template lang="pug">
  v-card(v-if="isDetail")
      <!-- 画像 -->
      v-img(:src="item.imageUrl" :alt="item.brand")
      <!-- ブランド名・タイトル -->
      v-card-title(:data-item_id="item.itemId" :data-brand="item.brand")
        h1
          | {{ item.brand }} {{ item.title }}
      <!-- 金額・ショップリンク -->
      v-list
        v-list-item
          v-list-item-title {{ item.lowestPrice.price }} -
          v-list-item-action
            v-btn(v-for="detailUrl in item.detailUrls" v-bind:key="detailUrl.id" :href="detailUrl" rel="nofollow" target="_blank")
              | ショップへ行く
      <!-- コンテンツ -->
      v-expansion-panels
        v-expansion-panel
          v-expansion-panel-header 商品の説明
          v-expansion-panel-content
            h3 {{ item.shop }}
            | {{ content }}
            div(id="unisize_tag" :data-cid="item.clientId" data-cuid="" :data-itm="item.itemId")
            script(type="text/javascript" src="https://bnr.cl.unisize.makip.co.jp/tag/unisize.js")
  v-col(v-else)
      v-card(:href="`/items/item/${item.itemId}`")
          v-img(:src="item.imageUrl.pc" :srcset="`${item.imageUrl.sp} 414w, ${item.imageUrl.retina} 1080w,${item.imageUrl.pc} 1920w`" :alt="`${item.brand} ${item.title}`")
            v-card-title(v-text="item.brand")
</template>

<script>
export default {
  props: ["item", "isDetail"]
}
</script>
