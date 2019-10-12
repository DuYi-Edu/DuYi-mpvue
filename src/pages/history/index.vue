<template>
  <div class="content">
      <block v-for="item in logs" :key="index">
          <div class="item">log</div>
      </block>
  </div>
</template>

<script>
export default {
    onLoad(){
    },
    data(){
        return{
            logs:this.globalData.calclogs.logs
        }
    },
    methods:{

    }
}
</script>

<style>
.content{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 5rpx;
}
.item{
    width:95%;
    line-height: 100rpx;
    margin-top: 5rpx;
    margin-bottom: 3rpx;
    border-radius: 3rpx;
    padding-left: 3rpx;
    color:#fef4e9;
    border: 2rpx solid #da7c0c;
    background: #f78d1d;
}
</style>