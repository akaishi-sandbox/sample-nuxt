<template lang="pug">
  v-row(no-gutters)
    v-col(cols=4 v-for="item in items" v-bind:key="item.id" :item="item")
        v-card(:href="`/items/item/${item.itemId}`")
            v-img.align-end(:src="item.imageUrl.pc" :srcset="`${item.imageUrl.sp} 414w, ${item.imageUrl.retina} 1080w,${item.imageUrl.pc} 1920w`" :alt="`${item.brand} ${item.title}`")
              v-card-title
                v-chip.white--text(v-text="item.brand")
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  }
}
</script>
