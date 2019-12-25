<template>
  <!-- 电影详情 -->
  <div class="movie-detail">
    <div class="movie-header">
      <div class="movie-bg" :style="detailMovieImg"></div>
      <div class="movie-mask"></div>
      <div class="msg">
        <div class="movie-poster" :style="detailMovieImg"></div>
        <div class="movie-info">
          <div class="movie-name">{{ detailMovie.nm }}</div>
          <div class="movie-ename">{{ detailMovie.enm }}</div>
          <div class="movie-score" v-if="detailMovie.globalReleased">
            <div v-if="detailMovie.sc">
              {{ detailMovie.sc }}
              <div class="movie-data">({{detailMovie.snum}}万人评分)</div>
            </div>
            <div v-else class="no-score">暂无评分</div>
          </div>
          <div v-else class="movie-score">{{detailMovie.wish}}人想看</div>
          <div class="movie-data">{{ detailMovie.cat }}</div>
          <div class="movie-data">{{ detailMovie.src }}/{{ detailMovie.dur }}分钟</div>
          <div class="movie-data">{{ detailMovie.pubDesc }}</div>
        </div>
        <div class="arrow">></div>
      </div>
    </div>
    <!-- offset-top吸顶时与顶部的距离，单位px -->
    <!-- <Sticky :offset-top="46">
      <DaySwitch></DaySwitch>
      <CinemaFilterNav></CinemaFilterNav>
    </Sticky> -->
    <!-- 影院列表 -->
    <!-- <CinemaList></CinemaList> -->

    <!-- 评论模块 -->
    <div class="section" v-if="comments.total && comments.hcmts.length">
      <div class="section-title comment">观众评论</div>
      <div v-for="(comment,index) in comments.hcmts" :key="index">
        <comment-section :comment="comment"></comment-section>
      </div>
      <router-link v-if="comments.total" class="total" to="">查看全部{{comments.total}}条短评</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { handleUrl } from '@/mixin/handleUrl'
import { handleCmt } from '@/mixin/handleCmt'
// import DaySwitch from '@/components/DaySwitch.vue'
// import CinemaFilterNav from '@/components/cinema/CinemaFilterNav.vue'
// import CinemaList from '@/components/cinema/CinemaList.vue'
import CommentSection from '@/components/movie/CommentSection.vue'
import { Sticky } from 'vant'
export default {
  mixins: [handleUrl, handleCmt],
  data() {
    return{
      detailMovie: {}, // 电影详情,请求到的是对象形式
      comments: {}
    }
  },
  components:{
    // DaySwitch,
    // CinemaFilterNav,
    // CinemaList,
    CommentSection,
    Sticky // 为什么vant的Sticky粘性布局组件(滑至顶部自动吸顶)不适用[Sticky.anme]: Sticky注册?
  },
  created() {
    const movieId = this.$route.query.movieId; 
    // 当前路由对象下的query对象,包含请求参数
    // query会在地址栏显示请求参数,params在地址栏中不显示请求参数
    // console.log(this.$route);
    this.getInfo(movieId);
    this.getComment(movieId);
    this.$store.commit("changeTitle", "电影详情");
  },
  computed: {
    detailMovieImg() {
      if (this.detailMovie) {
        // let imgurl = this.detailMovie.img.replace("w.h","120.170");
        // console.log(imgurl);
        this.$store.commit("changeTitle", this.detailMovie.nm);
        return `background-image: url(${this.detailMovie.img})`;
      }
    }
  },
  methods: {
    async getInfo(movieId) {
      const res = await this.$http.get(
        `/movie/detailmovie?movieId=${movieId}`
      );
      // this.detailMovie = res.data.detailMovie
      // this.handleData(this.detailMovie) // 如果写成这两句的形式,handleData()方法可以不返回一个obj
      this.detailMovie = this.handleData(res.data.detailMovie) //写成这种形式,handle()需要一个返回值
    },
    // 处理数据
    handleData(data) {
      let obj = data; // obj和data都指向同一个对象(detailMovie),所以不论是对obj还是data做处理,都会改变detailMovie的值
      obj.img = obj.img.replace("w.h","120.170"); // 处理图片

      // 将评分人数单位由"个"转化为"万"
      obj.snum = obj.snum / 10000;
      obj.snum = obj.snum.toFixed(1);
      return obj;
    },
    // 获取观众评论
    async getComment(movieId) {
      const res = await this.$http.get(
        `/movie/comments?movieId=${movieId}`
      );
      console.log(res);
      // let comments = res.data;
      let comments = {...res.data};
      if (comments.total) {
        const arr = comments.hcmts.length?comments.hcmts:comments.cmts;
        comments.hcmts = this.formatData(arr.slice(0, 3));
      }
      this.comments = comments;
    }
  }
}
</script>

<style scoped lang="scss">
.movie-bg {
  position: absolute;
  width: 100%;
  height: 170px;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(30px);
  z-index: -1;
}
.msg {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 20px;
  color: #fff;
}
.movie-poster {
  width: 120px;
  height: 170px;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 1px #f0f2f3;
  /* margin: 0 10px; */
}
.movie-info {
  margin: 0 40px 0 20px;
}
.movie-name {
  font-size: 20px;
  font-weight: 700;
}
.movie-ename {
  font-size: 12px;
  margin-top: 5px;
}
.movie-score {
  color: #fc0;
  font-size: 18px;
  font-weight: 700;
  margin-top: 5px;
  .movie-data {
    display: inline-block;
  }
}
.movie-data {
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
}
.arrow {
  font-size: 25px;
}


.section {
  padding-bottom: 20px;
  border-bottom: 20px solid #f5f5f5;
  color: #555;
}
.section-title {
  padding: 20px 20px 10px;
  font-size: 16px;
  color: #444;
}
.total {
  height: 60px;
  line-height: 40px;
  font-size: 15px;
  color: #f63;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: block;
}
</style>
