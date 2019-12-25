<template>
  <div class="commentSection">
    <div>
      <img :src="comment.avatarurl" class="avatar">
    </div>
    <div class="left">
      <div class="nickName">
        <span>{{ comment.nick || comment.nickName }}</span>
        <!-- <span v-if="comment.purchase" class="buy">购<span> -->
      </div>
      <div class="stars">
        <img class="movie-star"
          v-for="(item,index) in comment.stars" 
          :key="index" 
          :src="item"
        >
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="comment-footer">
        <div class="comment-time">{{ comment.calcTime }}</div>
        <div class="approve">
          <span class="icon-zan1"><van-icon name="good-job-o" /></span>
          <span>{{ comment.approve ? comment.approve : '赞' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  props: {
    comment: {
      type: Object
    }
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="scss">
.commentSection {
  display: flex;
  padding: 10px 0 0 10px;
  color: #555;
  .stars {
    margin-top: 10px;
    line-height: 12px;
    .movie-star {
      width: 22px;
      height: 22px;
      margin-right: 3px;
    }
    &:last-child .left {
      border: none;
    }
  }
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.left {
  flex-grow: 1;
  margin-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 5px;
}

.nickName {
  font-size: 15px;
  color: #444;
}

.buy {
  display: inline-block;
  border-radius: 2px;
  color: #fff;
  background: #f90;
  font-size: 15px;
  margin-left: 5px;
  padding: 1px 2px;
}

.content {
  font-size: 15px;
  margin: 5px 0;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.approve {
  .icon-zan1 {
    font-size: 15px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
