import { calcTime } from '../utils/util.js'

export const handleCmt = {
  methods: {
    // 处理数据
    formatData(arr) {
      let list = [];
      if (arr.length) {
        list = arr.map(item => {
          let temp = {...item};
          temp.avatarurl = temp.avatarurl || '../assets/images/avatar.png';
          temp.perchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id===4));
          // temp.stars = this.formatStar(temp.score);
          temp.calcTime = calcTime(temp.startTime);
          return temp;
        })
      }
      return list;
    },
    // 处理评分星星
    // formatStar(sc) {

    // }
  }
}