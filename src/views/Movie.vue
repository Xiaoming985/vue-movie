<template>
  <div>
    <div class="topBar">
      <!-- 城市选择 -->
      <CityEntry class="city-entry"></CityEntry>
      <!-- 热映/即将上映导航栏 -->
      <div class="switch-hot"
        v-for="(item,index) in tabList"
        :key="index"
        :class="['hot-item',{ 'active':item.title == $route.name}]"
        @click="selectItem(item)"
      >
        {{ item.title }}
      </div>

      <!-- 搜索按钮 -->
      <router-link class="search-entry" to="">
        <van-icon name="search" size="25" />
      </router-link>
    </div>

    <!-- 热映/即将上映路由切换响应区 -->
    <div class="switch-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Icon } from 'vant';
import CityEntry from '@/components/CityEntry.vue';
export default {
  data() {
    return {
      tabList: [
        {
          title: "正在热映",
          url: "/movie/hot"
        },
        {
          title: "即将上映",
          url: "/movie/expected"
        }
      ]
    }
  },
  components: {
    CityEntry,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon
  },
  computed: {
    city() {
      if (!this.$store.state.selectCity) {
        return "正在定位";
      } else {
        // console.log(this);
        // return this.$store.state.selectCity || this.city_name;
        return this.$store.state.selectCity;
      }
    }
  },
  methods: {
    selectItem(item) {
      if (this.$route.path === item.url) { //为什么这里有this?而上面active类的绑定不需要this?
        return;
      }
      // this.title = item.title;
      this.$router.push(item.url);
    }
  }
}
</script>

<style scoped>
.topBar{
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-around;
  border-bottom: 1px solid #e6e6e6;
  z-index: 9999;
  position: fixed;
  width: 100%;
  background-color: #fff;
}
.topBar .city-entry,
.topBar .switch-hot,
.topBar .search-entry {
  /* width: 25%; */
  text-align: center;
  overflow: hidden;
}
.switch-hot {
  height: 50px;
  line-height: 50px;
  /* position: relative; */
} 
.hot-item {
  color: #666;
  text-align: center;
  font-weight: 700;
}
.active {
  color: #ef4238;
  border-bottom: 2px solid #ef4238;
}
.search-entry i {
  color: #ef4238;
  vertical-align: middle;
  font-weight: bold;
}
.switch-content {
  padding-top:50px;
  padding-bottom: 50px;
}
</style>
