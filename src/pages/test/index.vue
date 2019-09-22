<template>
  <div>
     class支持结构
     <!-- 为了节约性能考虑，我们将class和style通过表达式的形式硬编码到wxml -->
     <!-- 对象单数据形式 -->
     <p :class="{active:isActive}">对象单数据形式</p>
     <!-- 对象多数据形式 -->
     <p class="bgColor" :class="{active:isActive,fontSize:isFont}">对象多数据形式</p>
     <!-- 数组形式(针对于data变量) -->
     <p class="bgColor" :class="[activeClass,fontSizeClass]">数组形式</p>
     <!-- 数据三元运算符形式 -->
     <p class="bgColor" v-bind:class="[isActive?activeClass:'',fontSizeClass]">数据三元运算符形式</p>
     <!-- 数据对象形式 -->
     <p class="bgColor" v-bind:class="[{active:isActive},fontSizeClass]">数据对象形式</p>

     <div>style</div>
     <!-- 对象形式 -->
     <p :style="{color:activeColor,fontSize:fontSize +'rpx'}">对象形式</p>
     <!-- 数据形式 -->
     <p :style="[{color:activeColor,fontSize:fontSize+'rpx'}]">数据形式</p>

    <div>计算属性</div>
     <div class="container" :class="computedClassStr">计算属性</div>

     <!-- vue支持，mpvue不支持  (对象形式不支持) -->
     <div class="container" :class="computedClassObject">mpvue不支持对象属性</div>
  </div>
</template>

<script>

export default {
    data(){
        return{
           isActive:true,
           isFont:true,
           activeClass:"active",
           fontSizeClass:"fontSize",
           activeColor:"yellow",
           fontSize:"40",
        }
    },

    methods:{
        
    },

    computed:{
        computedClassStr(){
            return this.isActive ? 'active' : ''
        },
        computedClassObject(){
            return {active: this.isActive}
        }

    }
} 




</script>

<style>
.active{
    color: red;
}
.fontSize{
    font-size: 60rpx;
}

.bgColor{
    background-color: aqua;
    margin: 10rpx 0;    
}
</style>