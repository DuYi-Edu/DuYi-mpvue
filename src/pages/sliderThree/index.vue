<template>
  <div class="page">
    <!-- 侧滑菜单 -->
    <slideBar />
    <!-- 右边页面 -->
    <div
      @touchstart="tap_start"
      @touchmove="tap_drag"
      @touchend="tap_end"
      :class="{'page-top':true,'c-state1':open}"
    >
      <img class="top-img" src="/static/images/btn.png" @click="tap_ch" alt="image" />
      <div class="text">第三个菜单页（拖动）</div>

      <!-- 页面 -->
      <div class="item" v-for="item in dataList" :key="index">
        <img :src="item.img" alt="image" class="item-img" />
        <div class="item-text">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import requestData from "../../utils/request";
import slideBar from "@/components/slideBar";
export default {
  data() {
    return {
      open: false,
      mark: 0,
      newmark: 0,
      istoright: true,
      dataList: requestData.fenjing
    };
  },
  components: {
    slideBar
  },
  methods: {
    // 拖动点击开始获取X坐标
    tap_start(e) {
      console.log(e.touches[0].pageX);
      this.mark = this.newmark + e.touches[0].pageX;
    },
    // 拖动过程中的X坐标
    tap_drag(e) {
      //console.log(e.touches[0].pageX)
      this.newmark = e.touches[0].pageX;
      if (this.mark < this.newmark) {
        // 从左往右拖动
        this.istoright = true;
      }
      if (this.mark > this.newmark) {
        // 往左拖动
        this.istoright = false;
      }
      this.mark = this.newmark;
    },
    tap_end(e) {
      this.mark = 0;
      this.remark = 0;
      if (this.istoright) {
        this.open = true;
      } else {
        this.open = false;
      }
    }
  }
};
</script>

<style>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10rpx 0;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid white;
}
.item .item-img {
  width: 90%;
  height: 300rpx;
}

.item .item-text {
  color: white;
  margin-top: 10rpx;
}
</style>