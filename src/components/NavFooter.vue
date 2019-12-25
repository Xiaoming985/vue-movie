<template>
  <div class="nav-footer">
    <router-link v-for="(item, index) in navlist"
      :key="index"
      :to="item.url" 
      class="nav-item"
      @click="selectItem(item)"
    >
      <van-icon :name="item.img" />
      <div>{{ item.name }}</div>
    </router-link>
    <!-- <router-link to="" class="nav-item">
      <van-icon name="location-o" />
      <div>影院</div>
    </router-link>
    <router-link to="" class="nav-item">
      <van-icon name="user-o" />
      <div>我的</div>
    </router-link> -->
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  data() {
    return {
      navlist: [
        {
          url: '/movie',
          img: 'video-o',
          name: '电影'
        },
        {
          url: '/cinema',
          img: 'location-o',
          name: '影院'
        },
        {
          url: '/user',
          img: 'user-o',
          name: '我的'
        }
      ]
    }
  },
  components:{
    [Icon.name]: Icon
  },
  methods: {
    selectItem(item) {
      if (this.$route.path === item.url) {
        console.log(this.$route.path);
        return;
      }
      this.$router.push(item.url);
    }
  }
}
</script>

<style scoped>
.nav-footer {
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  border-top: 1px solid #d8d8d8;
}
.nav-item {
  width: 100px;
  text-align: center;
  /* line-height: 50px; */
  color: #666;
}
.van-icon {
  font-size: 28px;
}
.router-link-active {
  color: #e54847;
}
</style>