<template>
  <div class="containerBox">
    <!-- 显示聊天内容 -->
    <div v-for="item in allContentList" :key="index">
      <div v-if="index % 2 == 1" class="textBox fl">{{item.value}}</div>
      <div v-else class="textBox fr">{{item.value}}</div>
    </div>
    <!-- 发送聊天按钮 -->
    <div class="handleBox">
      <input type="text" class="input_submit" placeholder="点击输入,开始聊天"  @input="bindKeyInput" />
      <button type="submit" class="btn_submit" size="mini" @click="submitTo">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      allContentList: [{"value":"aaaa"},{"value":"bbbb"}],
      userInput:'',
      robotSay:''
    };
  },
  methods: {
    // 获取用户输入
    bindKeyInput(e){
        this.userInput = e.target.value
    },
    // 发起聊天
    submitTo() {
        //console.log("submitTo",this.userInput)
        //把新写入的数据填写到allContentList数组中，作为本地显示
        this.allContentList.push({"value":this.userInput})
        //图灵的机器人聊天
        let _method="post"
        let _url="http://www.tuling123.com/openapi/api"
        let _body={
            key:"d13b441029804ee99fc4e3b617a5f557",
            info: this.userInput
        }
        this.robotTalk(_method,_url,_body)
    }, 
    // 机器人聊天
    robotTalk(_method,_url,_body){
        let that = this
        this.$fly.request({
            method:_method,
            url:_url,
            body:_body
        }).then(function(res){
            //console.log(res.data.text)
            that.robotSay= res.data.text
            // 把机器人说的话，push到数组中
            that.allContentList.push({"value":res.data.text})
        }).catch(function(err){
            console.log(err)
            return err
        })
    }
  }
};
</script>

<style>
.containerBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100rpx;
}
.textBox {
  display: block;
  text-align: left;
  max-width: 82%;
  border-radius: 10rpx;
  font-size: 26rpx;
  line-height: 42rpx;
  margin: 30rpx 20rpx 10rpx;
  box-sizing: border-box;
  padding: 0 10rpx;
}
.fr {
  float: right;
  background: #eee;
}
.fl {
  float: left;
  background: paleturquoise;
}
.handleBox {
  width: 100%;
  height: 66rpx;
  position: fixed;
  bottom: 0;
  background: #efefef;
  border-top: 2rpx solid #ddd;
  padding: 20rpx 0;
}
.input_submit {
  max-width: 80%;
  width: 80%;
  display: inline;
  float: left;
  background: #fff;
  margin: 4rpx 10rpx;
  border-radius: 10rpx;
}
.btn_submit {
  float: right;
  right: 10rpx;
}
</style>