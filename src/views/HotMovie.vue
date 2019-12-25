<template>
  <div>
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
import { List,Toast } from 'vant';
import MovieSection from '@/components/movie/MovieSection';
import { handleUrl } from '@/mixin/handleUrl';
export default {
  mixins:[handleUrl],
  data() {
    return {
      movieList: [],
      movieIds: [],
      offset: 200, // 滚动条与底部距离小于 offset 时触发load事件
      loading: false, // 是否处于加载状态,加载过程中不触发load事件
      finished: false, //是否加载完成,加载完成后不再触发load事件
      check: false, // 检查当前滚筒位置,若已滚动至底部,则会触发load事件
      loadComplete: false, // '正在热映'数据是否加载到最后一条
      mostExpectedList: []
    }
  },
  components: {
    [List.name]: List,
    [Toast.name]: Toast,
    MovieSection
  },
  created() {
    this.getHotList()
    this.$store.commit("changeTitle","猫眼电影")
  },
  watch: {
    // movieIds: "onload"
  },
  activated() {

  },
  methods: {
    // 获取热映列表,"封装前"
    // getHotList() {
    //   this.$http.get('/movie/movieOnInfoList').then(res => { // 正在热映
    //     this.movieList = this.formatImgUrl(res.data.data.movieList);
    //     // formatImgUrl是handleUrl里的方法,写在mixins里会在导入时将导入的js文件里的方法合并到这里
    //     this.movieIds = res.data.data.movieIds;
    //     if (res.data.data.movieList.length >= res.data.data.movieIds.length) {
    //       this.loadComplete = true;
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // "封装后" , formatImgUrl是handleUrl里的方法,写在mixins里会在导入时将导入的js文件里的方法合并到这里
    async getHotList(){
      const res = await this.$http.get('/movie/movieOnInfoList');
      this.movieList = this.formatImgUrl(res.data.movieList);
      this.movieIds = res.data.movieIds;
      if(res.data.movieList.length >= res.data.movieIds.length){
        this.loadComplete = true;
      }
    },
    // 上拉触底刷新的加载函数
    async reachBottom(list, ids, complete) {
      if (complete) {
        return;
      }
      const length = list.length;
      if (length + 10 >= ids.length) { // 加载10条数据之后是否加载了所有数据
        this.loadComplete = true;
      }
      let query = ids.slice(length, length+10).join("%2C");
      // slice(start,end),start必选,end可选,即从start下标开始取数组(字符串)元素,到end结束,没有end参数,则取start及后面所有
      // join()方法将数组中的所有元素以特定分割符分割，放入到一个字符串中。返回一个字符串，不会改变原数组。
      // %2C,ASCll字符,即逗号

      // 这里token为空,更多热映
      const res = await this.$http.get(
        `/movie/moreComingList?token=&movieIds=${query}`
      );
      const arr = this.formatImgUrl(res.data.coming);
      this.movieList = [...list, ...arr];
    },
    // 无限滚动
    onLoad() {
      if (this.movieIds.length) {
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
      }
    },
    loadBottom() {
      // console.log(this);
      const { movieList, movieIds, loadComplete } = this; // ES6解构赋值?
      this.reachBottom(movieList, movieIds, loadComplete);
    }
  }
}
</script>

<style scoped>

</style>