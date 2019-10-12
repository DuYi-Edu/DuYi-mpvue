<template>
  <div>
    <div class="searchLetter touchClass">
      <!-- 右侧的a-z -->
      <div v-for="item in searchLetter" 
        @touchstart.stop="searchStart"
        :data-letterindex ="index"
        :style="'height:'+itemH+'px'" 
        :key="index">
            {{item.name}}
      </div>
    </div>
      <!-- 右侧点击后的弹出字母 -->
      <block v-if="isShowLetter">
        <div class="showSelectedLetter">{{showLetter}}</div>
      </block>
      <!-- 左侧显示城市 -->
      <div>当前选择城市：{{city}}</div>
      <scroll-view scroll-y
        :style="'height:'+winHeight+'px'"
        :scroll-top="scrollTop"
      >
      <!-- 循环所有字母列表 -->
        <div class="selection" v-for="(item,index1) in cityList" :key="index">
            <!-- 显示字母 -->
            <div class="item_letter">{{item.initial}}</div>
            <div @click="cityShow" :data-cityname="ct.city"  class="item_city" v-for="(ct,index2) in item.cityInfo" :key="index">
                {{ct.city}}
            </div>
        </div>
      
      </scroll-view>
    
  </div>
</template>

<script>
import cityData from "@/utils/city";
export default {
  //生命周期函数（钩子函数）
  onLoad() {
    //获取字母列表
    this.searchLetter = cityData.searchLetter;
    //获取所有城市选项
    this.cityObj = cityData.cityObj;

    //获取分组列表
    let cityList = this.cityLists();
    //获取系统信息(非用户信息)
    let sysInfo = wx.getSystemInfoSync();
    //获取屏幕可用高度
    let winHeight = sysInfo.windowHeight;
    //计算：每个字母的相对应高度
    //公式：总高度/总数量=每个数值的单高度
    let itemH = winHeight / this.searchLetter.length;

    let tempObj = [];
    for (let i = 0; i < this.searchLetter.length; i++) {
      let temp = {};
      temp.name = this.searchLetter[i];
      //当前字母对应的topHight和bottomHeight
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp);
    }
    //当前可用区域的高度
    this.winHeight = winHeight;
    //每一个单元值的高度
    this.itemH = itemH.toFixed(2);
    //迭代新的含有高度的searchLetter
    this.searchLetter = tempObj;
    //分组后的城市列表
    this.cityList = cityList;
  },
  data() {
    return {
      searchLetter: [],
      showLetter: "A",
      isShowLetter: false,
      cityObj: [],
      cityList: [],
      winHeight: 0,
      itemH: 0,
      scrollTop:0,
      city:''
    };
  },
  methods: {
    //选择当前城市
    cityShow(e){
        this.city = e.currentTarget.dataset.cityname
    },
    //点击右侧字母后的事件
    searchStart(e){
        //获取点击的字母对象
        var showLetter = this.searchLetter[e.currentTarget.dataset.letterindex]
        //设置滚动操作
        this.setScrollTop(this,showLetter)
        //根据showLetter的当前数值，修改赋值语句
        this.showLetter = showLetter.name;
        //弹出点击选项
        this.isShowLetter = true
        setTimeout(()=>{
            this.isShowLetter = false
        },1000)
    },
    //设置左侧城市列表的滚动
    setScrollTop(that,showLetter){
        let scrollTop = 0
        let cityList = that.cityList
        let cityCount = 0
        let initialCount = 0
        for(let i=0;i<cityList.length;i++){
            if(showLetter.name == cityList[i].initial){
                scrollTop = initialCount * 30 + cityCount * 41;
                break
            }else{
                initialCount++;
                cityCount += cityList[i].cityInfo.length
            }
        }
        that.scrollTop = scrollTop
    },
    //获取分组列表
    cityLists() {
      var tempObj = [];
      for (let i = 0; i < this.searchLetter.length; i++) {
        //单字母
        let initial = this.searchLetter[i];
        //汇总城市分组信息
        let cityInfo = [];
        //新建临时当前元素
        let tempArr = {};
        //添加当前字母
        tempArr.initial = initial;
        //对所有城市数组循环
        for (var j = 0; j < this.cityObj.length; j++) {
          //比较当前选择的和整个数组中的每一项比对
          if (initial == this.cityObj[j].initial) {
            //找到后插入临时数组cityInfo
            cityInfo.push(this.cityObj[j]);
          }
        }
        tempArr.cityInfo = cityInfo;
        tempObj.push(tempArr);
      }
      return tempObj;
    }
  }
};
</script>

<style>
.searchLetter {
  position: fixed;
  right: 0;
  width: 80rpx;
  height: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #666;
  z-index: 1;
}
.searchLetter div {
  height: 70rpx;
}
.touchClass {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.showSelectedLetter {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100rpx;
  width: 200rpx;
  height: 200rpx;
  line-height: 200rpx;
  border-radius: 20rpx;
  font-size: 52rpx;
  z-index: 1;
}
.selection{
    display: flex;
    width:100%;
    flex-direction: column;
}
.item_letter{
    display: flex;
    flex-direction: row;
    background-color: #f8f8f8;
    height: 60rpx;
    padding-left: 20rpx;
    align-items: center;
}
.item_city{
    display: flex;
    background-color: #fff;
    height: 80rpx;
    padding-left: 20rpx;
    align-items: center;
    border-bottom: 2rpx solid #f8f8f8
}
</style>