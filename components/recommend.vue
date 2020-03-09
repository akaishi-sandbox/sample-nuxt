<template>
  <div>
    <div class="recommend_title">
        <h2>おすすめアイテム</h2>
    </div>
    <div class="recommend_content">
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  async asyncData ({ params }) {
    console.log("recommend:", params);
  }
}
</script>
