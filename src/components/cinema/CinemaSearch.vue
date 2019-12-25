<template>
  <div class="cinema-search">
    <city-entry class="city-entry"></city-entry>
    <div class="search-entry">
      <van-icon name="search"></van-icon>
      <span>搜影院</span>
    </div>
  </div>
</template>

<script>
import CityEntry from '@/components/CityEntry.vue'
import { Icon } from 'vant'
export default {
  components: {
    CityEntry,
    [Icon.name]: Icon
  }
}
</script>

<style scoped>
.cinema-search {
  display: flex;
  background-color: #f5f5f5;
  padding: 10px 0;
  height: 20px;
  margin: 0;
}
.city-entry {
  width: 25%;
  text-align: center;
}
.search-entry {
  width: 70%;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 13px;
  color: #b2b2b2;
  padding: 2px 0;
}
</style>