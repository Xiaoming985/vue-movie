<template>
  <div class="fix">
    <van-nav-bar
      :title="headerTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
  </div>
</template>

<script>
import { NavBar } from 'vant';
export default {
  props: [
    'headerTitle'
  ],
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1) // 返回上一个路由
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/App.scss';
.fix{
  height: 46px;
}
.van-nav-bar .van-nav-bar__title {
  line-height: 46px;
  font-size: 18px;
}
.van-nav-bar__text:active {
  background-color: #e54847;
}
</style>
