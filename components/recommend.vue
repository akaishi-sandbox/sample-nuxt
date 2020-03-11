<template lang="pug">
  div
    div
      h2
        | おすすめアイテム
    div
</template>
<script>
import axios from 'axios';

export default {
  async asyncData ({ params }) {
    console.log("recommend:", params);
  }
}
</script>
