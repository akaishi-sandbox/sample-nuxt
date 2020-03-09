<template>
    <nav id="breadcrumb">
        <ol class="flex" itemscope itemtype="http://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" href="/"><span itemprop="name">ホーム</span></a>
                <meta itemprop="position" content="1">
            </li>
            <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" :href="`/?brand=${item.brand}&amp;offset=0`"><span itemprop="name"> {{ item.brand }}</span></a>
                <meta itemprop="position" content="2">
            </li>
            <li if="item.category" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" :href="`/?category=${item.category}&amp;brand=${item.brand}&amp;offset=0`"><span itemprop="title">{{ item.category }}</span></a>
                <meta itemprop="position" content="3">
            </li>
        </ol>
    </nav>
</template>
<script>
export default {
  props: ["item"]
}
</script>
