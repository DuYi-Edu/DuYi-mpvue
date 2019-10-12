<template>
   <div class="reg">
       <div class="row">
           <input placeholder="请输入姓名" @input="bindNameInput"/>
       </div>
       <div class="row">
           <input placeholder="请输入手机" @input="bindPhoneInput"/>
       </div>
       <div class="row">
           <input placeholder="请输入验证码" @input="bindUserInputCode" style="width:70%"/>
           <button :disabled="btnDisabled" class="codeBtn" @click="getCode">{{btnValue}}</button>
       </div>
       <div>
           <button class="subBtn" type="primary" @click="save">注册</button>
       </div>
   </div>
</template>

<script>
//导入短信渠道文件
import duanxinConfig from "@/utils/zhengziConfig"
import zhengzisms from "@/utils/zhenzisms"
export default {
    data(){
        return{
           btnValue:"验证码",
           btnDisabled:'disabled',
           username:'',
           userTel:'',
           currentCode:"",
           userInputCode:""
        }
    },
    methods:{
        //注册
        save(){
            if(this.username == "" || this.userTel == ""){
                wx.showToast({
                    title:"用户名或手机号没有填写",
                    icon:"none",
                    duration:1000
                })
                return;
            }
            //验证码比较
            if(this.userInputCode === this.currentCode){
                //验证码成功，手机号正确
                wx.showToast({
                    title:"注册成功，跳转首页",
                    icon:"success",
                    duration:2000
                })
                //数据保存
            }else{
                wx.showToast({
                    title:"验证码错误",
                    icon:"none",
                    duration:2000
                })
            }
        },
        //用户输入验证码事件
        bindUserInputCode(e){
            this.userInputCode = e.target.value
        },
        //绑定姓名
        bindNameInput(e){
           this.username = e.target.value
        },
        //输入电话输入框的事件
        bindPhoneInput(e){
            this.userTel = e.target.value
            this.btnDisabled = e.target.value==""?"disabled":""
        },
        //修改显示状态
        timer(){
            this.btnDisabled ="disabled"
            this.btnValue = 10
           var intervalTimer =  setInterval(()=>{
                this.btnValue -= 1
                if(this.btnValue == 0){
                    this.btnValue = "验证码"
                    this.btnDisabled = ""
                    clearInterval(intervalTimer)
                }
            },1000)
        },
        //获取验证码
        getCode(){
            if(this.username == "" || this.userTel == ""){
                wx.showToast({
                    title:"用户名或手机号没有填写",
                    icon:"none",
                    duration:1000
                })
                return;
            }
            //修改按钮状态和显示
            this.timer()
            
            //发送验证码
            //1.组织发送语句，2.建立发送通道并发送内容，3.接受用户输入并对比
            let code = ""
            for(let i=0;i<6;i++){
                code += parseInt(Math.random()*10)
            }
            //存储到当前的data数据中
            this.currentCode = code
            let sendContent =`${this.username},你好，这次的验证码为：${code}`
            //发送
            //初始化init
            let _apiUrl = duanxinConfig.config.apiUrl
            let _appId = duanxinConfig.config._appId
            let _appSecret = duanxinConfig.config.appSecret
            zhengzisms.client.init(_apiUrl, _appId, _appSecret)
            zhengzisms.client.send(
                function(res){
                    console.log(res)
                },
                this.userTel,
                sendContent
            )
            console.log(sendContent)
            
        }
    } 
}
</script>

<style>
page{
    background-color: #bbb;
}
.reg{
    margin: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.row{
    position: relative;
    height: 80rpx;
    width: 90%;
    border-radius:10rpx;
    background: white;
    margin: 20rpx 0 10rpx 0;
    padding-left: 20rpx;
    box-sizing: border-box;
}
.row input{
    height: 80rpx;
    line-height: 80rpx;
}
.codeBtn{
    position: absolute;
    right: 0;
    top:0;
    color:#bbb;
    width: 30%;
    height: 80rpx;
    line-height: 80rpx;
}
.subBtn{
    width: 200rpx;
    height: 80rpx;
    background: #fff;
    column-rule: #000;
    border-radius: 80rpx;

}
</style>