<template>
  <div @click="clickHandle">
    <div class="userinfo" @click="bindViewTap">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      newsId:"1001",
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: ""
      }
    };
  },

  components: {
    card
  },

  mounted() {
    
  },

  onLoad() {
    
  },

  methods: {
    gotoTest(gotoId){
      console.log("gotoTest",gotoId)
      /*
      wx.navigateTo({
        url:"../test/main?newsid="+gotoId,
      })
      */
     /*
      let url ="../test/main?newsid="+gotoId
      mpvue.navigateTo({url})
      */
    },
    bindViewTap() {
      console.log(mpvuePlatform)

      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
