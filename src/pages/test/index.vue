<template>
  <div>
      <!-- 模板语法 -->

      <!-- 文本格式 Mustache -->
      <span v-once>Study Class:{{className}}</span>
      <!-- v-once 只能保持vue对象的二次修改，不能对事件修改做限制 -->
      <button @click="btnClick1">change</button>
      <!-- 原始html -->
      <span v-html="fontRedValue"></span>
      <!-- 特性 -->
      <p :class="fontStyle">{{className}}</p>
      <!-- 使用javascript表达式 -->
      <p>{{number+1}}</p>
      <p>{{ok?"yes":"no"}}</p>
      <!-- 都值函数不可以使用 -->
      <!-- <p>{{message.split('').reverse().......}}</p> -->

      <!-- Mastache语法不可以去做表达式逻辑计算 -->
      <!-- 比如定义变量或者逻辑判断 -->

      <!-- 指令 -->
      <!-- v-if -->
      <p v-if="seen">我出来了</p>
      <!-- 参数 v-bind强制html属性的绑定操作，v-on html事件的触发 -->
    
      <!-- vue.js动态参数,在vue.js中可以实行，但mpvue不行 -->
      <!-- <a :[attr]="link">跳转</a> -->

      <!-- 修饰符 .prevent .stop -->
  </div>
</template>

<script>

export default {
    data(){
        return{
            attr:"href",
            link:'www.baidu.com',
            seen:false,
            ok:-12,
            number:10,
            fontStyle:'green',
            className:'mpvue学习',
            fontRedValue:'<p style="color:red">mpvue学士</p>'
        }
    },

    methods:{
        btnClick1(){
            this.className="aaaa"
        }
    }
} 
</script>

<style>
.green{
    color:green;
}
</style>