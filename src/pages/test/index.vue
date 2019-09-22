<template>
  <div>
      <div>{{sayHello}}</div>
      <div>{{reversedSayHello}}</div>
      <div>{{showString}}</div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            sayHello:"hello"
        }
    },

    methods:{
        
    },

    computed:{
        //多逻辑操作的属性（普通计算属性）
        reversedSayHello(){
            return this.sayHello.split('').reverse().join('')
        },
        //缓存
       showString(){
           return "showString"
       }

    }
} 




</script>

<style>

</style>