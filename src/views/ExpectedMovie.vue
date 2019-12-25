<template>
  <div>
    <div class="most-expected" v-if="mostExpectedList.length">
      <div class="title">近期最受期待</div>
      <div class="expected-list">
        <div v-for="(movie, index) in mostExpectedList" :key="index">
          <router-link :to="movie.url" class="expected-item">
            <img :src="movie.img" alt="">
            <div class="expected-name">{{ movie.nm }}</div>
            <div class="expected-data">{{ movie.wish }}人想看</div>
            <div class="expected-data">{{ movie.comingTitle }}</div>
          </router-link>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="check"
      @load="onLoad"
    >
      <div v-for="(item, index) in movieList" :key="index">
        <MovieSection :movie="item"></MovieSection>
      </div>
    </van-list>
  </div>
</template>

<script>
import axios from 'axios';
import { List } from 'vant';
import MovieSection from '@/components/movie/MovieSection.vue';
import { handleUrl } from '@/mixin/handleUrl';
export default {
  mixins: [handleUrl],
  data() {
    return {
      movieList: [],
      movieIds: [],
      offset: 200, // 滚动条与底部距离小于 offset 时触发load事件
      loading: false, 
      finished: false, //是否加载完成,加载完成后不再触发load事件
      check: false, // 检查当前滚筒位置,若已滚动至底部,则会触发load事件爱你
      loadComplete: false, // '正在热映'数据是否加载到最后一条
      mostExpectedList: []
    }
  },
  components: {
    [List.name]: List,
    MovieSection
  },
  created(){
    this.getMostExpectedList()
    this.getComingList()
  },
  methods: {
    // 获取"近期最受期待"的电影列表
    async getMostExpectedList() {
      const res = await this.$http.get('/movie/mostExpected');
      this.mostExpectedList = this.formatImgUrl(res.data.coming, true) 
      // formatImgUrl是handleUrl里的方法,写在mixins里会在导入时将导入的js文件里的方法合并到这里
      this.mostExpectedList.forEach(item => {
        item.url = `/movie/movie-detail?movieId=${item.id}`
      });
    },
    // 获取"即将上映"的电影列表
    async getComingList() {
      const res  = await this.$http.get('/movie/comingList');
      this.movieList = this.formatImgUrl(res.data.coming)
      this.movieIds = res.data.movieIds;
    },
    // 上拉触底刷新的加载函数
    async reachBottom(list, ids, complete) {
      if(complete) {
        return;
      }
      const length = list.length;
      if(length + 10 >= ids.length) { // 加载10条数据之后是否加载了所有的数据
        this.loadComplete = true;
      }
      let query = ids.slice(length, length+10).join("%2C");
      // 这里token为空???更多即将上映
      const res = await this.$http.get(
        `/movie/moreComingList?movieIds=${query}`
      );
      const arr = this.formatImgUrl(res.data.data.coming);
      this.movieList = [...list, ...arr];
    },
    // 无限刷新
    onLoad() {
      if (this.loadComplete) {
        this.finished = true;
        this.loading = false;
      } else {
        this.loading = true;
        this.loadBottom();
        // 要确定数据加载完毕再check长度，否则会多次触发
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    // 上拉触底刷新
    loadBottom() {
      const { movieList, movieIds, loadComplete } = this;
      this.reachBottom(movieList, movieIds, loadComplete);
    }
  }
}
</script>

<style scoped>
.most-expected {
  padding: 0 10px;
  border-bottom: 5px solid #f5f5f5;
  overflow: hidden;
  height: 220px;/* 设置高度和hidden,这样x轴的滚动条就被隐藏了 */
}
.title {
  padding-bottom:5px;
}
.expected-list {
  display: flex;
  /* justify-content: space-between; */
  overflow-x: auto; /* 如果溢出框，提供滚动机制 */
  padding-bottom: 20px; /* 将滚动条的位置往下挪了 */
}
.expected-item {
  display: inline-block;
  /* width: 100px; */
  margin-right: 5px;
  color: #666;
  font-size: 13px; /* 含括子元素的字体大小 */
}
.expected-list img{
  width: 100px;
  height: 130px;
}
.expected-name {
  /* font-size: 13px; */
  margin-bottom: 3px;
  color: #333;
}
/* .expected-data{
  font-size: 13px;
} */
</style>
