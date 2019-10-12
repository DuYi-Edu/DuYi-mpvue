<template>
  <div class="page">
    <div class="page__bd">
      <!-- 我的参与与我的投票 -->
      <div class="weui-navbar">
        <!-- tab 导航 -->
        <block v-for="item in tabs" :key="index">
          <div :id="index" :class="'weui-navbar__item '+[activeIndex==index?'weui-bar__item_on':'']" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <!-- 左边的line -->
        <div
          class="weui-navbar__slider"
          :style="'left:'+sliderLeft+'px;transform:translateX('+sliderOffset+'px)'"
        ></div>
      </div>
      <!-- 显示panel -->
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex!=0">
          <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
              <block v-for="item in topics" :key="index">
                <a url="#" class="weui-media-box weui-media-box_appmsg">
                  <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                    <image class="weui-media-box__thumb" :src="item.oneVoteData.files[0]" />
                  </div>
                  <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                    <div class="weui-media-box__title">{{item.oneVoteData.title}}</div>
                    <div class="weui-media-box__desc">{{item.oneVoteData.description}}</div>
                  </div>
                </a>
              </block>
            </div>
          </div>
        </div>

        <div class="weui-tab__content" :hidden="activeIndex!=1">
          <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
              <block v-for="item in topics" :key="index">
                <a url="#" class="weui-media-box weui-media-box_appmsg">
                  <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                    <image class="weui-media-box__thumb" :src="item.oneVoteData.files[0]" />
                  </div>
                  <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                    <div class="weui-media-box__title">{{item.oneVoteData.title}}</div>
                    <div class="weui-media-box__desc">{{item.oneVoteData.description}}</div>
                  </div>
                </a>
              </block>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let that = this
    this.onQuery();

    //利用微信接口获取窗口信息
    wx.getSystemInfo({
      success:(res)=>{
        console.log('getSystemInfo',res)
        //把获取到的窗口宽度和tabs的长度，来计算值
        that.sliderLeft = (res.windowWidth / that.tabs.length - that.sliderWidth)/2
        that.sliderOffset =res.windowWidth / that.tabs.length * that.activeIndex
      }
    })
  },

  data() {
    return {
      sliderWidth:100,//需要设置slider的宽度，用户计算中间位置
      tabs: ["我发起的", "我参与的"],
      activeIndex: 0,
      sliderLeft: 0,
      sliderOffset: 0,
      icon60:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==",
      topics: []
    };
  },
  methods: {
    //tab按钮的点击
    tabClick(e){
      console.log(e)
      this.activeIndex = e.currentTarget.id
      //线条的动态变化
      this.sliderOffset = e.currentTarget.offsetLeft
    },
    onQuery() {
      let that = this;
      const db = wx.cloud.database();
      db
        .collection("vote")
        .where({
          _openid: "ofG444-XzfAKViLygnPAJbmSpuEE"
        })
        .get({
          success: res => {
            console.log(res);
            that.topics = res.data;
          }
        });
    }
  }
};
</script>

<style>
</style>