<template>
  <div class="select-nav">
    <div class="tab">
      <div :class="['tab-item',itemNum === 1?'select-item':'']" @click="selectItemNum(1)">
        <span class="title">{{ itemName1 }}</span>
        <span class="drop"></span>
      </div>
      <div :class="['tab-item',itemNum === 2?'select-item':'']" @click="selectItemNum(2)" id="brand">
        <span class="title">{{ itemName2 }}</span>
        <span class="drop"></span>
      </div>
      <div :class="['tab-item',itemNum === 3?'select-item':'']" @click="selectItemNum(3)">
        <span class="title">{{ itemName3 }}</span>
        <span class="drop"></span>
      </div>
    </div>

    <div class="nav-content">
      <!-- 地区列表 -->
      <div class="nav-content-item region" v-show="itemNum===1">
        <div class="tab">
          <div :class="['tab-item',selectRegion.item === 0?'active':'']" 
            @click="selectRegionItem(0)">商区</div>
          <div :class="['tab-item',selectRegion.item === 1?'active':'']" 
            @click="selectRegionItem(1)">地铁站</div>
        </div>
        <div class="region-list">
          <div class="region-sidenav">
            <div v-for="item in selectRegion.sideLsit"
              :key="item.id"
              :class="['side-item',selectRegion.item===0?
              (item.id===selectRegion.selectDistrictId?'active':''):
              (item.id===selectRegion.selectLineId?'active':'')]"
              @click="regionSideClick(item)"
            >
              {{ item.name }}{{ item.count }}
            </div>
          </div>
          <div class="region-list-item">
            <div v-for="item in selectRegion.list"
              :key="item.id"
              :class="['item',selectRegion.item===0?
              (item.id===selectRegion.selectAreaId?'red':''):
              (item.id===selectRegion.selectStationId?'red':'')]"
              @click="regionListClick(item)"
            >
              <div>
                <span class="iconfont icon-hook"
                  :style="{'visibility':selectRegion.item===0?
                  (item.id===selectRegion.selectAreaId?'':'hidden'):
                  (item.id===selectRegion.selectStationId?'':'hidden')}"
                ></span>
                {{item.name}}
              </div>
              <div>{{item.count}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="mask" @click.stop="cancal" v-show="itemNum !== -1"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cityCinemaInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      itemNum: -1,
      itemName1: "全城",
      itemName2: "品牌",
      itemName3: "特色",
      selectRegion: {
        item: 0,
        sideList: [], //侧边导航的list
        list: [], //详情list
        selectDistrictId: -1, //选择的大区ID
        selectAreaId: -1, //选择的小区ID
        selectLineId: -1, //选择的地铁线ID
        selectStationId: -1 //选择的地铁站ID
      }
    }
  },
  methods: {
    selectItemNum(index) {
      if(this.itemNum === index) {
        this.itemNum = -1;
      } else {
        this.itemNum = index;
      }
      if(index === 1) {
        this.selectRegionItem(0); // 默认选择"商区"
      }
    },
    selectRegionItem(index) {
      const cityCinemaInfo = this.cityCinemaInfo;
      let obj = {...this.selectRegion}; // 区别obj = this.selectRegion,这样obj与selectRegion指向同一个堆地址(引用数据类型)
      if(index === 0){
        obj.item = 0;
      } else {
        obj.item = 1;
      }
      this.selectRegion = obj;
    },
    regionSideClick(item) {

    },
    regionListClick(item) {
      
    },
    cancal() {
      this.itemNum = -1; // 点击遮罩层的地方,弹出层隐藏,遮罩层隐藏
    }
  }
}
</script>

<style scoped lang="scss">
.tab {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #f0f0f0;
  /* position: fixed; */
  width: 100vw;
  background-color: #fff;
}
.tab-item {
  margin: 10px 0;
  /* padding: 0 40px; */
  text-align: center;
  width: 33.3%;
}
#brand {
  border: 1px solid transparent;
  border-left-color: #f0f0f0;
  border-right-color: #f0f0f0;
}
.drop {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-top-color: #b0b0b0;
}
.select-item {
  color: #e54847;
  .drop {
    border: 4px solid transparent;
    border-bottom-color: #e54847;
    transform: translateY(-4px);
  }
}
.nav-content {
  .nav-content-item {
    z-index: 999;
    // position: relative;
    width: 100vw;
    height: calc(100vh*0.6);
    background: #fff;
  }
}
.region {
  .tab {
    border: none;
  }
  .tab-item {
    width: 50vw;
    margin: 0;
    height: 38px;
    line-height: 40px;
  }
  .active {
    color: #e54847;
    border-bottom: 2px solid #e54847;
  }
  .region-list {
    display: flex;
    width: 100%;
    height: calc(100%-40px);
    .region-sidenav {
      white-space: nowrap;
      width: calc(100vw*0.4);
      height: 100%;
      overflow: scroll; /* 内容会被剪裁,浏览器会显示滚动条 */
      .side-item {
        height: 40px;
        line-height: 40px;
        padding-left: 30px;
      }
      .active {
        color: #dd403b;
        background: #f5f5f5;
      }
    }
    .region-list-item {
      white-space: nowrap;
      flex-grow: 1;
      overflow: scroll;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 30px;
        padding-right: 50px;
        height: 40px;
      }
    }
  }
}

.mask {
  position: fixed;
  z-index: -1;
  bottom: 0;
  left: 0;
  height: 50%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3)
}
</style>
