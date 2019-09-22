<template>
  <div>
      <input type="text" v-model="message" placeholder="text input">
      <p>Message is:{{message}}</p>
      <textarea name="mytextarea" id="mytextarea" v-model="message" cols="30" rows="10">
         
      </textarea>
      <input type="checkbox" v-model="checked">
      <label for="checkbox">{{checked}}</label>

      微信小程序控件
      <button loading>按钮</button>
      <button disabled>不可用按钮</button>
      <button type="primary">通过按钮</button>
      <button type="warn">警告按钮</button>
      <button type="default">默认按钮格式</button>
      <button size="mini">小按钮</button>
      <checkbox-group>
        <label v-for="item in items" :key="index">
            <checkbox :value="item.name"/>{{item.value}}
        </label>
      </checkbox-group>
    富文本编辑器
        <editor id="editor" 
            :placeholder="hello" 
            showImgSize 
            showImgToolbar 
            showImgResize
            @statuschange = "onStatusChange"
            >
        </editor>
         <form action="">
            <input type="text" placeholder="请输入昵称" v-model="formMess.account">
            <input type="password" placeholder="请输入密码" v-model="formMess.act_pwd">
            <input type="text" placeholder="请输入手机号" v-model="formMess.phone">
            <span @click="onSubmit()">提交</span>
        </form>
        微信表单
        <form @submit="formSubmit">
            <input name="inputname" placeholder="please input here">
            <button form-type="submit">Submit</button>
        </form>
        picker
        <picker @change="bindPickerChange" :value="index" :range="array">
            <div>
                选择当前的国家: {{country}}
            </div>
        </picker>
        时间选择器
        <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
            <div>选择时间</div>
        </picker>
        <!-- 日期 -->
        <picker mode="date" :value="time" start="2019-1-1" end="2019-12-31">
            <div>日期</div>
        </picker>
        <!-- 省市 -->
        <picker mode="region" @change="bindReginChange" :value="region" :custom-item="customItem">
            <div>省市</div>
        </picker>
        <!-- 开关 -->
        开关按钮<switch @change="switchToChange"/>
        <!-- sliber -->
        <slider @change="sliderChange" min="50" max="200" show-value></slider>
  </div>
</template>

<script>
export default {
    data(){
        return{
            region:['广东省','广州市','珠海区'],
            customItem:"全部",
          country:'',
          array: ['美国', '中国', '巴西', '日本'],
          formMess:{
              "account":"",
              "act_pwd":"",
              "phone":""
          },
           hello:"eidtor content",
           message:'',
           items:[
               {name:"USA",value:"美国"},
               {name:'CHA',value:'中国'},
               {name:'JPN',value:'日本'}
           ]
        }
    },

    methods:{
        sliderChange(e){
            console.log(e)
        },
        switchToChange(e){
            console.log("switch 发生了change事件",e.target.value)
        },
        bindTimeChange(e){
            console.log(e)
        },
        bindPickerChange(e){
            console.log(e)
            this.country = this.array[e.target.value]
        },
        onStatusChange(){
            console.log("onStatusChange event")
        },
        onSubmit(){
            console.log(this.formMess)
        },
        formSubmit(e){
            console.log(e)
            console.log(e.target.value.inputname)
        }
    }
}
</script>

<style>

</style>