<template>
  <div id="app">
    <!-- 头部 -->
    <Header :headerTitle="headerTitle" :backBtn="back"></Header>
    <!-- https://cn.vuejs.org/v2/api/#keep-alive keepalive缓存策略-->
    <keep-alive include="movie,cinema">
      <!-- 路由渲染 -->
      <router-view/>
    </keep-alive>
    <!-- 底部标签栏 -->
    <!-- <nav-footer></nav-footer> -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import NavFooter from '@/components/NavFooter.vue'
export default {
  components: {
    Header,
    NavFooter
  },
  computed: {
    headerTitle() {
      return this.$store.state.headerTitle
    },
    back() {

    },
    cityTitle() {
      return this.$store.state.cityTitle
    }
  },
  methods: {
    toCity() {

    },
    toSearch() {

    }
  }
}
</script>

<style lang="scss">

</style>
