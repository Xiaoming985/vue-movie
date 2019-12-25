<template>
  <div>
    <CinemaSearch class="div-search"></CinemaSearch>
    <CinemaFilterNav class="cinema-filter"
      :city-cinema-info="cityCinemaInfo"
      @change="changeCondition"
      @toggleShow="toggleShow"
    >
    </CinemaFilterNav>
    <!-- <CinemaList class="list" ref="list"></CinemaList> -->
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="offset"
      :immediate-check="check"
      finished-text="没有更多了"
      @load="onReachBottom"
    >
      <div v-for="(item, index) in cinemas" :key="index">
        <CinemaSection :cinema="item"></CinemaSection>
      </div>
    </van-list>
    <div v-show="nothing">
      <Empty message="暂无符合条件的影院"></Empty>
    </div>
  </div>
</template>

<script>
import CinemaSearch from '@/components/cinema/CinemaSearch.vue'
import CinemaFilterNav from '@/components/cinema/CinemaFilterNav.vue'
// import CinemaList from '@/components/cinema/CinemaList.vue'
import Empty from '@/components/Empty.vue'
import { getToday } from '@/utils/util.js'
import CinemaSection from '@/components/cinema/CinemaSection.vue'
import { List } from 'vant'
export default {
  data() {
    return {
      params: {
        day: getToday(),
        offset: 0,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item: "",
        updateShowDay: false
      },
      cityCinemaInfo: { // Nav列表
        brand: {
          subItems: ""
        },
        service: {
          subItems: ""
        },
        hallType: {
          subItems: ""
        }
      },
      nothing: false, // 是否找到符合的影院
      cinemas: [], // 影院列表
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 数据是否加载完成
      offset: 200, // 滚动条与底部距离小于 offset 时触发load事件
      check: false // 是否在初始化时立即执行滚动位置检查
    }
  },
  components: {
    CinemaSearch,
    CinemaFilterNav,
    // CinemaList,
    CinemaSection,
    Empty,
    [List.name]: List
  },
  created() {
    this.$store.commit("changeTitle","影院");
    this.initPage();
  },
  methods: {
    async initPage() {
      const filter = await this.getFliterCinemas();
      console.log(filter);
      this.cityCinemaInfo = filter.data;
      const list = await this.getCinemaList(this.params);
      this.cinemas = [...list.data.cinemas];
      this.finished = !list.data.paging.hasMore;
    },
    // 获取影院列表
    getCinemaList(params) {
      return this.$http.get("/cinemas/cinemaList",params);
    },
    getFliterCinemas() {
      return this.$http.get("/cinemas/filterCinemas");
    },
    // 触底加载
    onReachBottom() {
      const params = {...this.params,offset:this.cinemas.length}; // 解构赋值,offset即params里的offset
      if(this.finished) {
        this.loading = false;
      } else {
        this.loading = true;
        this.getCinemaList(params).then(res => {
          this.cinemas = [...this.cinemas,...res.data.cinemas];
          this.finished = !res.data.paging.hasMore;
          // 要确定数据加载完毕再check长度,否则多次触发
          setTimeout(() => {
            this.loading = false;
          },500);
        })
      }
    },
    // 当过滤条件变化时调用的函数
    changeCondition(obj) {
      this.params = {
        ...this.params,
        ...obj
      };
      this.cinemas = [];
      this.nothing = false;
      this.getCinemaList(this.params).then(list => {
        if(!list.data.cinemas.length) {
          this.nothing = true;
        }
        this.cinemas = [...this.cinemas,...list.data.cinemas];
        this.finished = !list.data.paging.hasMore;
      })
    },
    // 导航下拉框状态变化的处理
    toggleShow(e) {
      
    }
  }
}
</script>

<style scoped>
.div-search {
  position: fixed;
  width: 100%;
  /* margin-top: 50px; */
  top: 46px;
}
.cinema-filter {
  position: fixed;
  top: 85px;
}
.list {
  margin-top: 75px;
}
.van-list {
  padding-top: 70px;
} 
</style>
