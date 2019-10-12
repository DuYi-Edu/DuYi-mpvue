<template>
  <div class="container">
    <div class="inner">
      <form @submit="generate">
        <!-- 称呼 -->
        <div :class="'named '+[isMore?'more':'']">
          <input
            type="text"
            name="toname"
            placeholder="怎么称呼TA?(不超过10个字)"
            input-placeholder="i-named"
          />
        </div>
        <!-- 类别（TA是你的谁） -->
        <div class="cate">
          <div class="hd">
            <span>TA是你的</span>
          </div>
          <div class="bd">
            <!-- 使用单选按钮操作 -->
            <radio-group name="relationID">
              <div class="row r1">
                <block v-for="item in relation1" :key="index">
                  <div class="item">
                    <radio
                      :value="item.id"
                      hidden
                      :checked="item.id==relationID"
                      :id="'r'+item.id"
                    />
                    <label for class="labeled">
                      <div
                        :class="{'head':true,'select':item.id==relationID}"
                        @click="tap_relation"
                        :data-id="item.id"
                      >
                        <img :src="'/static/images/'+item.img+'.png'" alt="image" class="avatar" />
                      </div>
                      <span class="call">{{item.name}}</span>
                    </label>
                  </div>
                </block>
              </div>
              <div class="row r2">
                <block v-for="item in relation2" :key="index">
                  <div class="item">
                    <radio
                      :value="item.id"
                      hidden
                      :checked="item.id==relationID"
                      :id="'r'+item.id"
                    />
                    <label for class="labeled">
                      <div
                        :class="{'head':true,'select':item.id==relationID}"
                        @click="tap_relation"
                        :data-id="item.id"
                      >
                        <img :src="'/static/images/'+item.img+'.png'" alt="image" class="avatar" />
                      </div>
                      <span class="call">{{item.name}}</span>
                    </label>
                  </div>
                </block>
              </div>
            </radio-group>
          </div>
        </div>
        <!-- 性别 -->
        <div class="sex">
          <div class="hd">
            <span>TA的性别</span>
          </div>
        </div>
        <div class="bd">
          <radio-group name="genderID">
            <div class="row">
              <block v-for="item in gender" :key="index">
                <div class="item">
                  <radio :value="item.id" hidden :checked="item.id==genderID" :id="'g'+item.id" />
                  <label for class="labeled">
                    <div
                      :class="{'head':true,'select':item.id==genderID}"
                      @click="tap_gender"
                      :data-id="item.id"
                    >
                      <img class="avatar" :src="'/static/images/'+item.img+'.png'" alt="image" />
                    </div>
                    <span class="call">{{item.name}}</span>
                  </label>
                </div>
              </block>
            </div>
          </radio-group>
        </div>
        <!-- 生成祝福 -->
        <div>
          <button form-type="submit" class="submit-btn">捎句祝福话</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import genderAvatarComponent from "@/components/genderAvatar";
import relationAvatarComponent from "@/components/relationAvatar";
import relationData from "@/utils/data";
export default {
  data() {
    return {
      isMore: false,
      relation1: relationData.relation.slice(0, 4),
      relation2: relationData.relation.slice(4, 8),
      gender: relationData.gender,
      relationID: 1,
      genderID: 1
    };
  },

  components: {
    relationAvatarComponent,
    genderAvatarComponent
  },

  methods: {
    tap_relation(e) {
      this.relationID = e.currentTarget.dataset.id;
    },
    tap_gender(e) {
      this.genderID = e.currentTarget.dataset.id;
    },
    generate(e) {
      let wishes = {};
      //console.log(e)
      //判断toname是否有值输入
      if (e.target.value.toname) {
        //创建数据对象，并存储e事件传送过来的值
        wishes = {
          relationID: e.target.value.relationID,
          genderID: e.target.value.genderID,
          toName: e.target.value.toname
        };
        //保存至全局对象globaldata
        this.globalData.wishesInfo = wishes;
        console.log(this.globalData.wishesInfo);
        //跳转至卡片页面
        mpvue.navigateTo({
          url: "/pages/logs/main"
        });
      } else {
        wx.showToast({
          title: "没有发送者",
          icon: "none"
        });
      }
    }
  },

  created() {}
};
</script>

<style>
.container {
  background-color: #f7f4ee;
  color: #424242;
}
form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60rpx;
}
.named input {
  text-align: center;
  height: 78rpx;
  border-radius: 10rpx;
  border: 2rpx solid #d9ba6a;
  background-color: #fff;
  line-height: 78rpx;
  font-size: 32rpx;
}
.more input {
  border: 2rpx solid #e7404d;
  box-shadow: 0 0 10rpx #e7404d;
}

.hd {
  display: flex;
  justify-content: center;
  font-size: 36rpx;
  padding-top: 60rpx;
}
.row {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
}
.avatar {
  width: 120rpx;
  height: 120rpx;
}
.submit-btn {
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
  background-color: #d9ba6a;
  border-radius: 10rpx;
  font-size: 36rpx;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.submit-btn::after {
  display: none;
}
</style>
