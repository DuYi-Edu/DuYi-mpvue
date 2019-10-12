<template>
 <div>
  <img :src="imgsrc" alt="image" @click="tapClick"/>
 </div>
</template>

<script>
export default {
    props:["imgsrc"],
    data(){
        return{

        }
    },
    methods:{
      tapClick(){
        //映射外部属性
        this.$emit("tapclick")
      }
    }
}
</script>

<style>
.jklb div {
  float: left;
  width: 375rpx;
}
.jklb div img{ vertical-align: top; width: 375rpx;}
</style>