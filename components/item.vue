<template lang="pug">
  v-card
      //- 画像
      v-img(:src="item.imageUrl" :alt="item.brand")
      //- ブランド名・タイトル
      v-card-title(:data-item_id="item.itemId" :data-brand="item.brand")
        h1
          | {{ item.brand }} {{ item.title }}
      v-list
        //- 金額・ショップリンク
        v-list-item
          v-list-item-title {{ item.lowestPrice.price }} -
          v-list-item-action
            v-btn(v-for="detailUrl in item.detailUrls" v-bind:key="detailUrl.id" :href="detailUrl" rel="nofollow" target="_blank")
              | ショップへ行く
        //- カラー
        v-list-item
          v-list-item-content
            v-list-item-title {{ item.color }}
            v-list-item-subtitle
              v-chip(v-for="sku in item.skus" v-bind:key="sku.id" :class="sku.stock > 0 ? 'sale': 'sold-out'")
                | {{ sku.size }}
      v-expansion-panels
        //- コンテンツ
        v-expansion-panel
          v-expansion-panel-header
            | 商品の説明
          v-expansion-panel-content
            div(v-for="(content, shop) of item.contents" v-bind:key="shop")
              h3 {{ shop }}
              p {{ content }}
            div(id="unisize_tag" :data-cid="item.clientId" data-cuid="" :data-itm="item.itemId")
            script(type="text/javascript" src="https://bnr.cl.unisize.makip.co.jp/tag/unisize.js")
        //- サイズ詳細
        v-expansion-panel(v-if="item.isSized")
          v-expansion-panel-header
            | サイズ詳細
          v-expansion-panel-content
            v-data-table(hide-default-footer :headers="item.sizeTable.headers" :items="item.sizeTable.items")
</template>

<style lang="stylus" scoped>
.scle
  color green
.sale::after
  content '○'
.sole-out
  color yellow
.sold-out::after
  content '×'
</style>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
