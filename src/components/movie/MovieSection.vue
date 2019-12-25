<template>
  <div>
    <router-link class="movie-section" :to="url">
      <img :src="movie.img" alt="" class="movie-img">
      <div class="movie-info">
        <div class="movie-name">
          {{ movie.nm }}
          <span class="['version',movie.version]"></span>
        </div>
        <div class="movie-score">
          <div v-if="movie.globalReleased">
            <span v-if="movie.sc">
              观众评
              <span class="grade">{{ movie.sc }}</span>
            </span>
            <span v-else>暂无评分</span>
          </div>
          <div v-else>
            <span class="grade">{{ movie.wish }}</span>人想看
          </div>
          <div class="movie-star">主演：{{ movie.star }}</div>
          <div v-if="movie.rt">{{ movie.rt }}上映</div>
          <div v-else class="movie-showInfo">{{ movie.showInfo }}</div>
        </div>
      </div>
      <div class="buy-tickets">
        <van-button type="danger" v-if="movie.showst===3">购票</van-button>
        <van-button type="warning" v-if="movie.showst===1">想看</van-button>
        <van-button type="info" v-if="movie.showst===4">预售</van-button>
			</div>
    </router-link>
  </div>
</template>

<script>
import { Button } from 'vant';
export default {
  props: ["movie"],
  computed: {
    url() {
      return '/movie/movie-detail?movieId=' + this.movie.id
    }
  },components: {
    [Button.name]: Button
  }
}
</script>

<style scoped lang="scss">
.movie-section {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  padding: 0 15px;
  &::after {
    position: absolute;
    content: "";
    height: 0;
    width: calc(100% - 125px); // 125px =movie-section.padding + movie-img.width + movie-info.margin-left*2
    right: 15px;
    bottom: 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .movie-img {
    width: 90px;
    height: 130px;
  }
  .movie-info {
    margin: 0 5px;
    font-size: 15px;
    color: #666;
    width: 45%;
    div {
      margin-bottom: 6px;
    }
    .movie-name {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      padding-right: 10px;
      .version{
        display: inline-block;
        height: 28px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
    .movie-star {
      overflow: hidden;
      white-space: nowrap; // 不换行
      text-overflow: ellipsis; // 移除部分用省略号表示
    }
  }
}
.grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
</style>