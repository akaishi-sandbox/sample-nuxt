<template lang="pug">
    nav
      ol(itemscope itemtype="http://schema.org/BreadcrumbList")
        li(itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem")
          a(itemprop="item" href="/")
            span(itemprop="name")
              | ホーム
              meta(itemprop="position" content="1")
        li(itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem")
          a(itemprop="item" :href="`/?brand=${item.brand}&amp;offset=0`")
            span(itemprop="name")
              | {{ item.brand }}
              meta(itemprop="position" content="2")
        li(if="item.category" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem")
          a(itemprop="item" :href="`/?category=${item.category}&amp;brand=${item.brand}&amp;offset=0`")
            span(itemprop="title")
            | {{ item.category }}
            meta(itemprop="position" content="3")
</template>
<script>
export default {
  props: ["item"]
}
</script>
