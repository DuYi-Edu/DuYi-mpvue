<template>
<span class="item-text-title">{{itemdata}}</span>
</template>

<script>
export default {
    props:["itemdata"],
    data(){
        return{

        }
    },
    methods:{
        
    }
}
</script>

<style>
.item-text-title{
  color:#999;
  font-size:30rpx;
  padding-left:20rpx;
}
.item-type1{
  width: 100%;
  height: 45rpx;
  background: #f6f6f6;
}
</style>