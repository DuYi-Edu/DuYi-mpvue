<template>
  <div>
      <div class="item-movie" v-for="item in movieslist" :key="index">
          <img :src="item.images.large" alt="">
          <div>国家：{{item.countries[0]}}</div>
          <div class="item-title">标题：{{item.title}}</div>
      </div>
  </div>
</template>

<script>
const MOVIE_URL = "http://t.yushu.im/v2/movie/top250"
export default {
    //生命周期（钩子函数）
    mounted(){
        /*
        this.$fly.get(MOVIE_URL)
            .then((response)=>{
                console.log(response.data.subjects)
                this.movieslist = response.data.subjects
            })
            .catch((error)=>{
                console.log(error)
            })
        */
       this.$fly.request(MOVIE_URL,{},{
           method:"get",
           timeout:5000
       })
       .then(d=>{
           console.log('request result:',d)
           this.movieslist = d.data.subjects
           })
        .catch((e)=>console.log("error",e))
    },
    data(){
        return{
            movieslist:[]
        }
    },
    methods:{

    }
}
</script>

<style>
.item-movie{
    width: 100%;
    padding: 10rpx;
    border: 1rpx solid gray;
}
.item-title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.item-movie img{
    width: 160rpx;
    height: 260rpx;
}
</style>