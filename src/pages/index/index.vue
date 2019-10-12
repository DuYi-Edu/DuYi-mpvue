<template>
  <div class="content">
    <!-- 显示当天的天气信息 -->
    <div class="info">
      <!-- 城市名称、当前日期 -->
      <div class="city">{{city}}({{today}})</div>
      <!-- 当天温度 -->
      <div class="temp">{{weather.wendu}}℃</div>
      <!-- 感冒描述 -->
      <div class="weather">{{weather.ganmao}}</div>
    </div>

    <!-- 昨天天气信息 -->
    <div class="yesterday">
      <div class="detail">
        <span class="yesterday-title">昨天 {{weather.yesterday.date}}</span>
      </div>
      <div class="detail">
        <!-- 天气类型，如阴，晴天 -->
        {{weather.yesterday.type}}
        <!-- 风向 -->
        {{weather.yesterday.fx}}
        <!-- 风力 -->
        {{weather.yesterday.fl}}
        <!-- 最低温度 -->
        {{weather.yesterday.low}}
        <!-- 最高温度 -->
        {{weather.yesterday.high}}
      </div>
    </div>

    <!-- 最近五天的天气信息 -->
    <div class="forecast">
      <div class="next-day" v-for="item in weather.forecast" :key="index">
          <!-- 日期 -->
          <div class="detail date">{{item.date}}</div>
          <!-- 天气类型 -->
          <div class="detail">{{item.type}}</div>
          <!-- 最高温度 -->
          <div class="detail">{{item.high}}</div>
          <!-- 最低温度 -->
          <div class="detail">{{item.low}}</div>
          <!-- 风向 -->
          <div class="detail">{{item.fengxiang}}</div>
          <!-- 风力 -->
          <div class="detail">{{item.fengli}}</div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-area">
      <input type="text" @input="inputing" placeholder="输入城市名称" :value="inputCity">
      <button type="primary" size="mini" @click="bindSearch">查询</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputCity:'',
      city: "上海",
      today: 29,
      weather: {},
        forecast:[]
    };
  },

  components: {},

  methods: {
    // 查找用户的指定城市的天气
    bindSearch(){
      this.searchWeather(this.inputCity)
    },
    // 获取用户输入的城市
    inputing(e){
      this.inputCity = e.target.value 
    },
    //查询指定城市的天气信息
    searchWeather(cityName){
      let that = this
      let _url = "http://wthrcdn.etouch.cn/weather_mini?city="+cityName
      wx.request({
        url:_url,
        data:{},
        header:{
          'Content-type':'application/json'
        },
        success:(res)=>{
          if(res.data.status == 1002){
            //无此城市
            wx.showModal({
              title:'提示',
              content:'查找的城市不存在或信息有误',
              showCancel:false,
              success:(res)=>{
                that.inputCity=''
              }
            })
          }else{
            //有数据
            let weather = res.data.data;//获取天气数据
            
            for(let i=0;i<weather.forecast.length;i++){
              let d = weather.forecast[i].date
              let _fengli = weather.forecast[i].fengli
              //处理日期信息，添加空格
              weather.forecast[i].date = ' '+d.replace('星期',' ')
              weather.forecast[i].fengli = _fengli.substr(10,2)
            }
            this.city = cityName//更新显示城市名称
            this.weather = weather, //更新天气信息
            this.inputCity = '' //情况查询输入框
          }
        }
      })

    },
    //设定指定格式的日期时间
    formatTime(date){
      const year = date.getFullYear()
      const month = date.getMonth()+1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year,month,day].map( (n)=>{
        n = n.toString()
      return n[1]?n:'0'+n
    }).join('/')+' '+[hour,minute,second].map( (n)=>{
        n = n.toString()
      return n[1]?n:'0'+n
    }).join(':')
    },
    
  },

  created() {
    this.today =this.formatTime(new Date())
    //获取当前的坐标值,微信写法
    wx.getLocation({
      type:'wgs84',
      success:(res)=>{
        let latitude = res.latitude
        let longitude = res.longitude
        //接口的获取
        wx.request({
          url:"http://api.map.baidu.com/geocoder/v2/?ak=ASAT5N3tnHIa4APW0SNPeXN5&location="+latitude+","+longitude+"&output=json&pois=0",
          data:{},
          header:{
            'Content-Type':'application/json'
          },
          success:(res)=>{
            //城市名称
            let city = res.data.result.addressComponent.city.replace('市','')
            //查询指定城市的天气信息
            this.searchWeather(city)
          }
        })
      }
    })
  }
};
</script>

<style scoped>
.content{
  height: 100%;
  width:100%;
  display:flex;
  flex-direction:column;
  font-family: 微软雅黑;
  box-sizing:border-box;
  padding:20rpx 10rpx;
  color: #252525;
  font-size:16px;
  background-color:#F2F2F8;
}

/*当天天气信息*/
.info{
  margin-top:50rpx;
  width:100%;
  height:160px;
}

/*城市名称*/
.city{
  margin: 20rpx;
  border-bottom:1px solid #043567;
}

/*当天温度*/
.temp{
  font-size: 120rpx;
  line-height: 130rpx;
  text-align: center;
  padding-top:20rpx;
  color:#043567;
}

/*感冒描述*/
.weather{
  line-height: 22px;
  margin: 10px 0;
  padding: 0 10px;
}

/*昨天天气信息*/
.yesterday{
  width:93%;
  padding:20rpx;
  margin-top:50rpx;
  border-radius:10rpx;
  border:1px solid #043567;
}

/*昨天的*/
.yesterday-title{
  color:red;
}

/* 最近五天的天气信息 */
.forecast{
  width: 100%;
  display: flex;
  margin-top:50rpx;
  align-self:flex-end;
}
/* 每一天的天气信息 */
.next-day{
  width:20%;
  height:450rpx;
  text-align: center;
  line-height: 60rpx;
  font-size:28rpx;
  margin: 0 3rpx;
  border:2rpx solid #043567;
  border-radius: 10rpx;
}

.detail{
  width: 100%;
}
/* 搜索区域 */
.search-area{
  display: flex;
  background:#f4f4f4;
  padding:1rem 0.5rem;
}
/* 搜索区域的输入框 */
.search-area input{
  width:70%;
  height: 76rpx;
  line-height: 76rpx;
  border:2rpx solid #ccc;
  color:#000;
  background-color: #F2F2F8;
  border-radius: 10rpx;
}
/* 搜索区域按钮 */
.search-area button{
  width:30%;
  height: 80rpx;
  line-height: 80rpx;
  margin-left: 10rpx;
}
</style>
