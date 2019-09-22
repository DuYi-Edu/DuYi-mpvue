<template>
  <div>
   <div>自定义表单组件</div>
    <myInput fromLabTitle="用户年龄" formInputPh="请输入用户年龄" @getInputVal="inputVal">
    </myInput>
     <myInput fromLabTitle="用户姓名" formInputPh="请输入用户姓名" >
     </myInput>
  </div>
</template>

<script>
import myInput from "@/components/myinput.vue"

export default {
    data(){
      return{
      title:"username",
      value:"tom"
      }
     
    },
    methods:{
      inputVal(e){
        console.log(e)
      }
    },
    components:{
      myInput
    }
   
}
</script>

<style>

</style>