<template>
  <div>
      <label class="labelTag">{{fromLabTitle}}</label>
      <input type="text" v-model="inputval" placeholder-class="font-red" :placeholder="formInputPh" @change="getInputVal"/>
  </div>
</template>

<script>
export default {
    props:['fromLabTitle','formInputPh'],
    data(){
        return{
            inputval:''
        }
    },
    methods:{
        getInputVal(){
            //触发
            this.$emit("getInputVal",this.inputval)
        }
    }
}
</script>

<style>
input{
    color: green;
}

.font-red{
    color:red;
}

</style>