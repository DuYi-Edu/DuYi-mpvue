<template>
  <div>
    <button @click="updateAllData">多数据的修改-云函数</button>
    <button @click="getData">获取所有个人的数据</button>
    <block v-for="item in datalist" :key="index">
      <div>姓名：{{item.name}}</div>
      <div>年龄：{{item.age}}</div>
    </block>
  </div>
</template>

<script>

const db = wx.cloud.database({
  env:"test-jj55w"
})

export default {
  data () {
    return {
      myOpenid:"",
      datalist:[]
    }
  },

  //调用云函数
  onLoad(){
    let that = this
    wx.cloud.callFunction({name:"usreinfo",data:{name:'tom'}})
    .then(res=>{
      console.log(res)
      that.myOpenid = res.result.openid
    })
  },
  methods: {
    //多数据的修改
    updateAllData(){
      wx.cloud.callFunction({name:"usreinfo",data:{name:'jack'}})
    .then(res=>{
      console.log(res)
    })
    },
    getData(){
      db
        .collection("shujuku3")
        .where({
          _openid:this.myOpenid
        })
        .get()
        .then(res=>{
          console.log(res)
        })
    }
  },
  
}
</script>

<style>

</style>
