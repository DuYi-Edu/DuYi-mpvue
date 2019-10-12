<template>
  <div>
    <div class="pageHead" @click="bindViewTap">
      <div class="userinfo">
        <img :src="userInfo.avatarUrl" alt="image" class="userinfo-avatar" />
        <span class="userinfo-nickname">{{userInfo.nickname}},请选择您要添加的货币</span>
      </div>
    </div>
    <div class="currencyList">
      <block v-for="(item,index1) in curNameList" :key="index">
        <div class="rowList">
          <div v-for="(row,index2) in rowNum" :key="index">
            <div
              class="itemImage"
              @click="bindlogoTap"
              :data-test="item[row].cn"
              :data-id="item[row].name"
            >
              <!-- ：强解析 只解析非字符串内容 -->
              <img alt="image" class="cur_logo" :src="'/static/id128/'+item[row].name+'.png'" />
            </div>
            <div class="nameTxt">{{item[row].cn}}</div>
          </div>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import curNames from "../../utils/curList";
export default {
  mounted() {
    this.getUserInfoData();
  },
  computed: {
    curFlag() {
      return function(s) {
        console.log(s);
        //return "/static/id128/CNY.png"
      };
    }
  },
  data() {
    return {
      rowNum: [0, 1, 2],
      curNameList: curNames.curNameList,
      userInfo: {
        avatarUrl: "",
        nickName: "11"
      }
    };
  },
  methods: {
    // 点击国旗图标后的计算
    bindlogoTap(event) {
      let currentTagetId = event.currentTarget.dataset.id;
      //this.globalData.selectCur = {name:"cny"}
      //console.log(this.globalData.selectCur.name)
      let oldMySelectCurs = this.globalData.selectCur;

      var selectCru;
      const length = this.curNameList.length;
      for (let i = 0; i < length; i++) {
        let temps = this.curNameList[i];
        for (let j = 0; j < 3; j++) {
          if (temps[j].name == currentTagetId) {
            //   获取完整的货币记录
            selectCru = temps[j];
            break;
          }
        }
      }
      const length1 = oldMySelectCurs.length;
      let bool = 0;
      // 判断是否已经选过此个货币
      for (let i = 0; i < length1; i++) {
        if (oldMySelectCurs[i].name == selectCru.name) {
          bool = 1;
        }
      }

      if (bool == 0 || length1 == 0) {
        //获取数据 flyio
        console.log("from", this.globalData.myMainCur.name);
        console.log("to", selectCru.name);
        console.log("amount", this.globalData.myMainCur.amount);
        //flyio
        let _body = {
          from: this.globalData.myMainCur.name,
          to: selectCru.name,
          amount: this.globalData.myMainCur.amount
        };
        this.$fly
          .request({
            method: "get",
            url: "https://wapp.talk-easy.cn/currency/getcurrencyrate",
            body: _body
          })
          .then(res => {
            //把当前的值存储当前对象selectCru
            selectCru.rate = res.data.rate;
            selectCru.amount = res.data.amount;
            //存回收藏集合oldMySelectCurs
            oldMySelectCurs = [selectCru].concat(oldMySelectCurs);
            //完成把需要转换的货币添加到了收藏集合
            //把收藏集合存储到全局对象
            console.log(oldMySelectCurs)
            this.globalData.selectCur = oldMySelectCurs;
            //返回首页
            /*
                mpvue.navigateTo({
                    url:"/pages/changeIndex/main"
                })
            */
            //微信返回前页面（倒退）,默认为1
            wx.navigateBack({
              delta: 1
            });
          });
      } else {
        //返回首页
        //console.log("返回首页");
        wx.navigateBack({
              delta: 1
        });
      }
      //获得全部的货币数据
      //获得用户的主货币（人民币）
      //比较
      //添加到用户的收藏（和人民币的转换）货币
    },
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
.pageHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nameTxt {
  margin-top: 5rpx;
}

.cur_logo {
  width: 72rpx;
  height: 48rpx;
}

.currencyList {
  margin-top: 30rpx;
  background-color: #f2f2f2;
}
.rowList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.itemImage {
  width: 180rpx;
  padding: 18rpx;
  margin-left: 18rpx;
  margin-right: 18rpx;
  text-align: center;
  border-bottom: 1rpx solid #d0d0d0;
  align-items: center;
}

.line {
  height: 0rpx;
  width: 100%;
}
</style>