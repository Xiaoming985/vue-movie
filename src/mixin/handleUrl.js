// 处理图片url
export const handleUrl = {
  methods: {
    formatImgUrl(arr, cutTitle = false) {
      if (!Array.isArray(arr)) {
        return;
      }
      let newArr = [];
      arr.forEach(item => {
        let title = item.comingTitle;
        if(cutTitle) {
          title = item.comingTitle.split(" ")[0]; 
          /* 
            split(" ")以空格切割字符串,当请求的是"近期最受期待"的电影列表时,
            获取的comingTitile的格式如: 2020年1月25日 周六
            split(" ")即去掉空格后面的内容
          */
        }
        let imgUrl = item.img.replace("w.h","90.130"); // 后面的字符串(即"90.130",这是图片样式的宽高)取代"w.h"
        newArr.push({
          ...item, // 将item中的元素push进来
          comingTitle: title,
          img: imgUrl
        });
      });
      return newArr;
    }
  }
}