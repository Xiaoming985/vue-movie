<template>
  <van-index-bar>
    <van-index-anchor index="A" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="B" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />

  </van-index-bar>
</template>

<script>
import { IndexBar, IndexAnchor } from 'vant';
export default {
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor
  }
}
</script>

<style scoped>

</style>