<template>
  <div>
    <!-- 城市选择 -->
    <router-link class="city-entry" to="">
      <span class="city-name">{{ city }}</span>
      <span class="city-entry-arrow"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    city() {
      if (!this.$store.state.selectCity) {
        return "正在定位";
      } else {
        // console.log(this);
        // return this.$store.state.selectCity || this.city_name;
        return this.$store.state.selectCity;
      }
    }
  }
}
</script>

<style scoped>
.city-entry {
  color: #333;
}
.city-entry-arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-top-color: #b0b0b0;
}
</style>
