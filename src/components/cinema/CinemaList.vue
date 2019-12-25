<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in cinemas" :key="index">
        <CinemaSection :cinema="item"></CinemaSection>
      </div>
    </van-list>
  </div>
</template>

<script>
import CinemaSection from '@/components/cinema/CinemaSection.vue'
import { List } from 'vant'
export default {
  props: ["cinemaList"], // 通过props接收来自父组件的数据
  data() {
    return {
      loading: false,
      finished: false,
      cinemas: []
    }
  },
  components: {
    CinemaSection,
    [List.name]: List
  },
  created() {
    this.initPage()
  },
  mounted() {

  },
  methods: {
    initPage() {
      this.cinemas = this.$parent.cinemaList;
    },
    onLoad() {
      
    }
  }
}
</script>

<style scoped>
/* .van-list {
  padding-top: 35px;
} */
</style>
