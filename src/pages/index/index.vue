<template>
  <div class="container-out">
   
    <!-- 外部霓虹灯 -->
    <div class="circle" v-for="item in circleList" 
      :key="index"
      :style="'top:'+item.topCircle+'rpx;left:'+item.leftCircle+'rpx;background-color:'+[index%2==0?colorCircleFirst:colorCircleSecond]"
      >
    </div>
    <!-- 内容输出 -->
    <div class="container-in">
      <div class="content-out" v-for="item in awardList" :key="index"
        :style="'top:'+item.topAward+'rpx;left:'+item.leftAward+'rpx;background-color:'+[index==indexSelect?colorAwardSelect:colorAwardDefult]"
      >
        <img class="award-image" alt="image" :src="item.imageAward">
      </div>
       <!-- :style='[val?'':'']' :style="'color'+val" -->
        <div class="start-btn" @click="startGame" :style="'background-color:'+[isRunning?'#e7930a':'#ffe400']">START</div>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRunning:false,
      circleList:[],//圆点数组,
      colorCircleFirst:"#FFDF2F",//圆点颜色1
      colorCircleSecond:"#FE4D32",//圆点颜色2
      colorAwardSelect:"#FFE400",//奖品选择颜色
      colorAwardDefault:"#F5F0FC",//奖品默认颜色
      indexSelect:0,//被选中的奖品index
      awardList:[],//奖品方块数组
      //礼包图片数组
      imageAward:[
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082140698,3275161441&fm=26&gp=0.jpg"
      ]
    };
  },

  components: {},

  methods: {
     startGame(){
    let that = this
    //判断下现在是否已经在抽奖
    if(this.isRunning) return
    this.isRunning = true
    let indexSelect = 0 //现在选中的item 索引
    let i = 0;

    let random = Math.ceil(Math.random()*1000)
    //设置每次操作的item显示时间，并取得句柄之后可以停止操作
    var timer =setInterval(()=>{
      indexSelect++;
      //这里只是用y=30*200函数处理下，可以根据业务改变
      i+=30;
      if(i>random){
        //去除循环
        clearInterval(timer)
        //获得抽奖成功提示
        wx.showModal({
          title:"恭喜您",
          content:"您获得了第"+(this.indexSelect +1)+"个优惠券",
          showCancel:false,//去掉取消按钮
          success:function(res){
            if(res.confirm){
              that.isRunning = false
            }
          }
        })
      }
      this.indexSelect =indexSelect % 8
    },(200+i))
  }
  },
 
  //生命周期
  created() {
    let leftCircle = 7.5;
    let topCircle = 7.5
    let circleList = [];
    //左上角开始，顺时针画点，找到关键角点坐标0,6,12,18
    for(let i=0;i<24;i++){
      if(i == 0){
        topCircle = 15
        leftCircle = 15
      }else if(i<6){
        topCircle = 15
        leftCircle += 102.5
      }else if(i == 6){
        topCircle = 15
        leftCircle = 620
      }else if(i < 12){
        topCircle += 94
        leftCircle = 620
      }else if(i == 12){
        topCircle = 565
        leftCircle = 620
      }else if(i < 18){
        topCircle = 570
        leftCircle -= 102.5
      }else if(i == 18){
        topCircle = 565
        leftCircle = 15
      }else if(i < 24){
        topCircle -= 94
        leftCircle = 7.5
      }else{
        return
      }
      //把当前每个点的坐标加入到数组中
      circleList.push(
        {topCircle:topCircle,leftCircle:leftCircle}
      )
    }
    this.circleList = circleList
    console.log(this.circleList)
    //圆点闪烁
    setInterval(()=>{
      if(this.colorCircleFirst == "#FFDF2F"){
        this.colorCircleFirst = "#FE4D32"
        this.colorCircleSecond = "#FFDF2F"
      }else{
        this.colorCircleFirst = "#FFDF2F"
        this.colorCircleSecond = "#FE4D32"
      }
    },500)

    //奖品item设置
    let awardList = []
    //间距格式设置
    let topAward = 0
    let leftAward = 0
    let _topAward = 15
    let _leftAward = 15
    //循环8个item
    for(let j=0;j<8;j++){
      if(j == 0){
        topAward = 25;
        leftAward = 25;
      }else if(j<3){
        topAward = topAward
        leftAward = leftAward + 166 + _leftAward
      }else if(j<5){
        leftAward = leftAward
        topAward = topAward + 150 + _topAward
      }else if(j<7){
        leftAward = leftAward - 166 - _leftAward
        topAward = topAward
      }else if(j<8){
        leftAward = leftAward
        topAward = topAward - 150 -_topAward;
      }
      //放入奖品图片
      let imageAward = this.imageAward[j]
      //把对象完整的放入数组
      awardList.push(
        {topAward:topAward,leftAward:leftAward,imageAward:imageAward}
      )
    }
    //把压完的8个元素数组加入到data
    this.awardList = awardList
    console.log(this.awardList)
  }
};
</script>

<style scoped>
.container-out{
  height:600rpx;
  width:650rpx;
  background-color: #b136b9;
  margin: 100rpx auto;
  border-radius: 40rpx;
  box-shadow: 0 20rpx 0 #971a8e;
  position: relative;
}
.container-in{
  width: 580rpx;
  height: 530rpx;
  background-color: #871a8e;
  border-radius: 40rpx;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.circle{
  position: absolute;
  display: block;
  border-radius: 50%;
  height: 20rpx;
  width: 20rpx;
}
.content-out{
  position: absolute;
  height: 150rpx;
  width: 167rpx;
  background-color: #f5f0fc;
  border-radius: 15rpx;
  box-shadow: 0 10rpx 0 #d87fde;
}

.start-btn{
  position: absolute;
  margin: auto;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 15rpx;
  height: 150rpx;
  width: 166rpx;
  background-color: #ffe400;
  box-shadow: 0 10rpx 0 #e7930a;
  color:#f6251e;
  text-align: center;
  font-size:50rpx;
  font-weight: bold;
  line-height: 150rpx;
}
.award-image{
  position: absolute;
  margin: auto;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  height: 100rpx;
  width: 100rpx;
}

</style>
