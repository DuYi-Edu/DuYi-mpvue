<template>
  <div class="row" @click="gotoTVChannel" :data-cindex="channelindex">
    <img :src="'/static/images/'+channelimg" alt="image" />
    <span>{{channelname}}</span>
    <span class="sign">></span>
  </div>
</template>

<script>
export default {
    props:["channelimg","channelname","channelindex"],
    data(){
        return{
        }
    },
    methods:{
        gotoTVChannel(e){
           console.log(e.currentTarget.dataset.cindex)
           //带参跳转
           mpvue.navigateTo({
               url:`/pages/channelDetail/main?id=${e.currentTarget.dataset.cindex}`
           })
        }
    }
};
</script>

<style>
.row{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 4rpx solid rgb(223,211,211);
    height: 100rpx;
    position: relative;
}
.row img{
    width: 80rpx;
    height: 80rpx;
    margin: 10rpx;
}
.sign{
    position: absolute;
    right: 15rpx;
    color:gray;
}
</style>