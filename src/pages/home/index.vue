<template>
      <!-- 显示区域 -->
      <div class="content">
          <div class="layout-top">
              <div class="screen">{{screenData}}</div>
          </div>
      
        <!-- 按钮布局 -->
        <div class="layout-bottom">
            <div class="btnGroup">
                <div class="item orange" @click="clickBtn" id="c">C</div>
                <div class="item orange" @click="clickBtn" id="back">←</div>
                <div class="item orange" @click="clickBtn" id="history">
                    <icon :type="iconType" :color="iconColor" class="icon"></icon>
                </div>
                <div class="item orange" @click="clickBtn" id="+">+</div>
            </div>
            <div class="btnGroup">
                <div class="item blue" @click="clickBtn" id="9">9</div>
                <div class="item blue" @click="clickBtn" id="8">8</div>
                <div class="item blue" @click="clickBtn" id="7">7</div>
                <div class="item orange" @click="clickBtn" id="-">-</div>
            </div>
            <div class="btnGroup">
                <div class="item blue" @click="clickBtn" id="6">6</div>
                <div class="item blue" @click="clickBtn" id="5">5</div>
                <div class="item blue" @click="clickBtn" id="4">4</div>
                <div class="item orange" @click="clickBtn" id="*">*</div>
            </div>
            <div class="btnGroup">
                <div class="item blue" @click="clickBtn" id="3">3</div>
                <div class="item blue" @click="clickBtn" id="2">2</div>
                <div class="item blue" @click="clickBtn" id="1">1</div>
                <div class="item orange" @click="clickBtn" id="dv">÷</div>
            </div>
            <div class="btnGroup">
                <div class="item blue zero" @click="clickBtn" id="0">0</div>
                <div class="item blue" @click="clickBtn" id="d">.</div>
                <div class="item orange" @click="clickBtn" id="equ">=</div>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    mounted(){

    },
    data(){
        return{
            //屏幕显示的内容
            screenData:"0",
            //所点击按钮的各个数值集合（数字和计算符号）
            arr:[],
            logs:[]
        }
    },
    methods:{
        clickBtn(e){
           let id = e.target.id
           //判断按键
           //退格键
           if(id == "back"){
               //获取屏幕上的显示
               var data = this.screenData
               if(data == "0")return
               //从字符串中截取到最后一个前
               data = data.substring(0,data.length-1)
               if(data == ""){
                   data = 0
               }
               this.screenData = data
               this.arr.pop();
           }else if(id == "c"){
                //清屏
                this.screenData = "0"
                this.arr.length = 0
           }else if(id == "equ"){
               //等于
               let data = this.screenData
               if(data == "0") return
               //计算
               let lastWord = data.charAt(data.length)
               if(isNaN(lastWord))return
               let num = ""
               let lastOperator = ""
               var arr = this.arr //1+2
               let optarr = [];
               for(let i in arr){
                   if(isNaN(arr[i]) === false){
                       //是数字
                       num+=arr[i]
                   }else{
                       lastOperator = arr[i]
                       optarr.push(num) //1字符串
                       optarr.push(arr[i]) //符号 字符串
                       num = ""
                   }
               }
               //
               optarr.push(Number(num)) //第二数 是数字
               var result = Number(optarr[0])* 1.0
               for(let i=1;i<optarr.length;i++){
                   if(isNaN(optarr[i])){
                       if(optarr[1] == "+"){
                           result += Number(optarr[i+1])
                       }else if(optarr[1] == "-"){
                           result -= Number(optarr[i+1])
                       }else if(optarr[1] == "*"){
                           result *= Number(optarr[i+1])
                       }else if(optarr[1] == "dv"){
                           result /= Number(optarr[i+1])
                       }
                   }
               }
               //存储历史记录
               this.logs.push(data + "=" + result)
               //存全局变量
               this.globalData.calclogs = {logs:this.logs}

               this.arr.length = 0
               this.arr.push(result)
               //显示
               this.screenData = result
           }else{
               if(id=="+" || id == "-" || id=="*" || id=="dv"){
                   if(this.screenData=="0") return
               }
               let sd = this.screenData
               let data
               if(sd==0){
                   data = id;
               }else{
                   data = sd + id
               }
               this.screenData=data
               this.arr.push(id)
           }
        }
    }
}
</script>

<style>
.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ccc;
    font-family: "Microsoft YaHei";
    overflow-x: hidden;
}
.layout-top{
    width: 100%;
    margin-bottom: 30rpx;
}
.layout-bottom{
    width: 100%;
}
.screen {
    text-align: right;
    width: 100%;
    height: 260rpx;
    line-height: 260rpx;
    padding: 0 10rpx;
    font-weight: bold;
    font-size: 60px;
    box-sizing: border-box;
    border-top: 1px solid #fff;
}
.btnGroup {
    display: flex;
    flex-direction: row;
    flex: 1;
    width: 100%;
    height: 200rpx;
    background-color: #fff;
}
.item {
    width:25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 1px;
    margin-right: 1px;
}
.item:active {
    background-color: #ff0000;
}
.zero{
    width: 50%;
}
.orange {
    color: #fef4e9;
    background: #f78d1d;
    font-weight: bold;
}
.blue {
    color:#d9eef7;
    background-color: #0095cd;
}
.iconBtn{
    display: flex;
}
.icon{
   display: flex;
   align-items: center;
   width:100%;
   justify-content: center;
}
</style>