<template>
  <div>
    <div>
      <router-link to="" class="cinema-section">
        <div class="name-price">
          <span>{{ cinema.nm }}</span>
          <span class="price-block" v-if="cinema.sellPrice">
            <span class="price">{{ cinema.sellPrice }}</span>
            <span class="q">元起</span>
          </span>
        </div>
        <div class="address">
          <div>{{ cinema.addr }}</div>
          <div>{{ cinema.distance }}</div>
        </div>
        <div class="label-block">
          <span class="endorse" v-if="cinema.endorse || cinema.tag&&cinema.tag.endorse">退</span>
          <span class="allowRefund" v-if="cinema.allowRefund || cinema.tag&&cinema.tag.allowRefund">改签</span>
          <span class="hallType" v-for="item in cinema.hallType || cinema.tag&&cinema.tag.hallType" :key="item">{{item}}</span>
          <span class="snack" v-if="cinema.snack || cinema.tag&&cinema.tag.snack">小吃</span>
          <span
            class="vipTag"
            v-if="cinema.vipDesc || cinema.tag&&cinema.tag.vipTag"
          >
            {{cinema.vipDesc || cinema.tag&&cinema.tag.vipTag}}
          </span>
        </div>
        <div class="card-discount" v-if="!!cinema.promotion&&cinema.promotion.cardPromotionTag">
          <span class="card"></span>
          <span class="discount-label-text">
            <!-- {{ cinema.promotion && cinema.promotion.cardPromotionTag }} -->
            {{ cinema.promotion.cardPromotionTag }}
          </span>
        </div>
        <div class="showTimes" v-if="cinema.showTimes">
          近期场次: {{ cinema.showTimes }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cinema"]
}
</script>

<style scoped>
.cinema-section {
  /* border: 1px solid red; */
  display: inline-block;
  width: 94%;
  margin: 5px 10px 0;
  padding: 10px 0 15px;
  border-bottom: 1px solid #f0f0f0;
}
.name-price {
  font-size: 15px;
  color: #000;
}
.price-block {
  color: #f03d37;
  margin-left: 10px;
}
.price {
  font-size: 18px;
}
.q {
  font-size: 11px;
}
.address {
  color: #666;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.label-block {
  font-size: 10px;
  margin-top: 5px;
}
.label-block .snack,
.label-block .vipTag {
  color: #f90;
  border: 1px solid #f90;
  margin-right: 5px;
  padding: 0 2px;
}
.label-block .endorse,
.label-block .allowRefund,
.label-block .hallType {
  color: #589daf;
  border: 1px solid #589daf;
  margin-right: 5px;
  padding: 0 2px;
}
.card-discount{
  display: flex;
  justify-content: baseline;
  margin-top: 5px;
}
.card {
  display: inline-block;
  width: 15px;
  height: 14px;
  background-image: url("../../assets/images/card.png");
  background-size: contain; /* css3属性,contain把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
  /* cover把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中。 */
  background-repeat: no-repeat;
  margin-right: 5px;
}
.discount-label-text {
  font-size: 11px;
  color: #999;
  display: inline-block;
}
.showTimes {
  font-size: 12px;
  color: #999;
}
</style>
