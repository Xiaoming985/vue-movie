<template>
  <van-tabs :ellipsis="ellipsis" line-width="88">
    <van-tab v-for="(item,index) in dayList" :title="item.title" :key="index">
      
    </van-tab>
  </van-tabs>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { getToday, formatTime } from '@/utils/util.js'
export default {
  data() {
    return {
      dayList: [],
      ellipsis: false
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  created() {
    
  },
  mounted() {
    // let time = this.getToday()
    let time = getToday();
    this.getWeek(time);
  },
  methods: {
    // 模拟7天时间列表
    getWeek(startTime) {
      const todayTomorrow = ["今天","明天","后天"];
      const week = ["周日","周一","周二","周三","周四","周五","周六"];
      let days =[];
      // 当开始时间大于今天时,日期从大的时间开始算(主要是为了"预售时间")
      let start = getToday();
      if(startTime > start) {
        start = startTime;
      }
      for(let i=0; i<7; i++) {
        let day = new Date(start); // 将时间转化成标准时间
        day.setDate(day.getDate() + i); // 往后推几天
        // 计算相隔几天,相隔三天内前缀用"今/明/后天"表示,三天开外前缀用"周几"表示
        const num = (day - new Date(getToday())) / (1000 * 60 *60 *24);
        this.dayList.push({
          // getDay() 获取周名(0~6)
          // getMonth() 获取月份(0~11)
          title: `${todayTomorrow[num] || week[day.getDay()]}${day.getMonth()+1}月${day.getDate()}日`,
          day: formatTime(day).split(" ")[0]
        });
      }
      // this.$emit("changeDays",days);
    }
  }
}
</script>

<style scoped>

</style>
