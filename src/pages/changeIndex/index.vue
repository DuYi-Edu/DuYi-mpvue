<template>
  <div class="container">
    <!-- 头信息 -->
    <div class="pageHead" @click="bindAddCur">
      <!-- 用户信息 -->
      <div class="userinfo">
        <img :src="userInfo.avatarUrl" alt="image" class="userinfo-avatar" />
        <span class="userinfo-nickname">{{userInfo.nickName}}，欢饮您！</span>
      </div>
      <!-- 添加+号 -->
      <div class="addCur" @click="bindAddCur">
        <span>+</span>
      </div>
    </div>
    <!-- 主页面 -->
    <div class="cur_main">
      <div>
        <img :src="mainCur" alt="image" class="cur_logo" />
      </div>
      <div class="middle">
        <div class="top">
          <div>
            <span>CNY 人民币</span>
          </div>
          <div class="datetimeTxt">
            <span>2019-09-01 16:23</span>
          </div>
        </div>
        <!-- 输入货币区域 -->
        <div class="amountInput">
          <input type="digit" placeholder="100" maxlength="180" @input="bindKeyInput" />
        </div>
      </div>
    </div>
    <!-- 显示转换的货币 -->
    <div>
      <scroll-view scroll-y style="height: 400px;" v-if="mySelectCurs">
        <block v-for="item in mySelectCurs" :key="index">
          <div class="item" @longtap="longtapFormSet" :data-text="item.cn" :data-id="item.name">
            <div>
              <img :src="'/static/id128/'+item.name+'.png'" class="cur_logo" />
            </div>
            <div class="middle">
              <div>
                <span>{{item.name}} {{item.cn}}</span>
              </div>
              <div class="rateTxt">
                <span>{{item.amount}}</span>
              </div>
            </div>

            <div class="right">
              <span>1 {{myMainCur.name}}＝{{item.rate}} {{item.name}}</span>
            </div>
          </div>
        </block>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getUserInfoData();
    this.globalData.selectCur = [];
    this.globalData.myMainCur = this.myMainCur;
  },
  onShow() {
    console.log("onShow")
    this.mySelectCurs = this.globalData.selectCur;
    console.log("this.mySelectCurs", this.mySelectCurs);
  },
  data() {
    return {
      userInfo: {
        avatarUrl: "",
        nickName: "11"
      },
      //初始货币
      myMainCur: {
        name: "CNY",
        amount: 100,
        country:"中国",
        rate:0.0,
        en:"RMB",
        cn:"人民币"
      },
      mySelectCurs: {}
    };
  },
  computed: {
    mainCur() {
      //模板属性的字符串和变量的拼接，可以使用计算属性完成
      return "/static/id128/" + this.myMainCur.name + ".png";
    }
  },
  methods: {
    longtapFormSet(e){
      let that = this
      let text = e.currentTarget.dataset.text
      let id = e.currentTarget.dataset.id
      //制作底部弹出框,微信的控件生成
      wx.showActionSheet({
        itemList:[
          '设 '+ text + " 为主货币",
          '删除' + text +"?"
        ],
        success:function(res){
          if(res.tapIndex == 0){
            //设为主货币
            let temppp = that.myMainCur
            const length = that.mySelectCurs.length
            for(let i=0;i<length;i++){
              if(id==that.mySelectCurs[i].name){
                that.myMainCur = that.mySelectCurs[i]
                that.myMainCur.amount = temppp.amount
                that.mySelectCurs[i] = temppp//把主货币和当前选择的货币交换
              }
            }
            //存回全局变量
            that.globalData.myMainCur = that.myMainCur
            that.globalData.selectCur = that.mySelectCurs

          }else if(res.tapIndex == 1){
            //删除收藏操作
            wx.showModal({
              title:"系统提示",
              content:"确定要删除："+text + "?",
              success:(res)=>{
                if(res.confirm){
                  //删除
                  that.removeByValue(that.mySelectCurs,id)
                }
              }
            })
          }
        }
      })
    },

    //删除数组中的一个值
    removeByValue(arr,name){
      for(var i=0;i<arr.length;i++){
        if(arr[i].name == name){
          arr.splice(i,1)
          break
        }
      }
    },

    //添加新货币
    bindAddCur() {
      //页面的跳转
      mpvue.navigateTo({
        url: "/pages/addCur/main"
      });
    },
    bindKeyInput(e) {
      this.myMainCur.amount = e.target.value;
      //存储主货币
      this.globalData.myMainCur = this.myMainCur;

      //汇率转换
      this.rateCount(this.myMainCur);
    },

    rateCount(e) {
      console.log(e)
      if(this.mySelectCurs){
        const length = this.mySelectCurs.length
        if(length>0){
          var toss =  this.mySelectCurs[0].name
          for(let i=1;i<length;i++){
            toss = toss + "," + this.mySelectCurs[i].name
          }
          //远程数据获取
          this.$fly.request({
            method:"get",
            url:"https://wapp.talk-easy.cn/currency/getcurrencyrates",
            body:{
              "from":this.myMainCur.name,
              "tos":toss,
              "amount":e.amount
            }
          }).then(res=>{
            console.log(res.data)
            //呈现数据
            for(let i=0;i<length;i++){
              for(let j=0;j<res.data.length;j++){
                if(res.data[j].name == this.mySelectCurs[i].name){
                  //替换
                  this.mySelectCurs[i].rate = res.data[j].rate
                  this.mySelectCurs[i].amount = res.data[j].amount
                } 
              }
            }
          })
        }
      }
    },
    //注意funciton和=>符的this指向问题
    getUserInfoData() {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              //console.log(res);
              this.userInfo.avatarUrl = res.userInfo.avatarUrl;
              this.userInfo.nickName = res.userInfo.nickName;
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.scroll-height {
  height: 800rpx;
}
.pageHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.addCur {
  font-family: "serif";
  font-size: 28pt;
  color: blue;
  margin-top: -24rpx;
  margin-right: 24rpx;
  overflow: hidden;
}
.datetimeTxt {
  margin-top: -10rpx;
}
.addImage {
  margin-right: 30rpx;
}
.cur_main {
  display: flex;
  flex-direction: row;
  padding: 24rpx;
  margin-top: 28rpx;
  background-color: #f3f3f3;
  border-top: 1rpx solid #d0d0d0;
  border-bottom: 1rpx solid #d0d0d0;
}

.cur_logo {
  width: 108rpx;
  height: 78rpx;
}
.amountInput {
  padding-left: 10rpx;
  margin-top: 6rpx;
  margin-right: 60rpx;
  border: 1rpx solid #888;
  font-size: 14pt;
}
.rateTxt {
  margin-top: 1rpx;
  font-size: 16pt;
}
.middle {
  flex: 1;
  margin-left: 20rpx;
}
.right {
  font-size: 9pt;
  margin-top: 50rpx;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item {
  display: flex;
  padding: 24rpx;
  margin-left: 8rpx;
  margin-right: 8rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #d0d0d0;
}
</style>