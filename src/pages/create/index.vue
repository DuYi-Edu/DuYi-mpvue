<template>
  <div>
    <div class="page">
        <div class="page_bd">
          <!-- 错误提示 -->
           <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">错误提示</div>
          <!-- 投票标题 -->
           <div class="weui-cells">
             <div class="weui-cell weui-cell-input">
               <div class="weui-cell__bd">
                 <input @input="getInputTitle" name="title" class="weui-input" maxlength="20" placeholder="请填写投标标题（2-20个字)"/>
               </div>
             </div>
           </div>
          <!-- 投票说明 -->
           <div class="weui-cells">
             <div class="weui-cell">
               <div class="weui-cell__db">
                 <textarea maxlength="80" @input="getTextarea" name="description" id="description" style="height:3.3em" placeholder="请填写投票内容说明（2-80个字）"></textarea>
                 <div class="weui-textarea-counter">{{fontLen}}/80</div>
               </div>
             </div>
           </div>
          <!-- 选项 -->
          <div class="weui-cells">
            <div class="weui-cell weui-cell_input" v-for="item in optionList" :key="index">
              <div class="weui-cell__hd">
                <img @click="delOption" :data-index="index" :src="item.icon" alt="image" class="option-icon">
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" @input="recordValue" :data-index="index" :value="item.value" :placeholder="'选项'+(index+1)">
              </div>
            </div>
            <!-- 添加按钮 -->
            <div class="weui-cell" @click="addOption" v-if="showAddBtn">
              <div class="weui-cell__hd">
                <img src="/static/images/common/4.png" alt="image" class="option-icon"/>
              </div>
              <div class="weui-cell__bd">添加选项</div>
            </div>
          </div>
          <!-- 文本支持提示 -->
          <div class="weui-cells__tips">最多支持15个选项，每个选项不超过40个字</div>
          <!-- 投票时间和类型 -->
          <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
              <div class="weui-cell__hd weui-cell__hd_in-select-after">
                <div class="weui-label">投票类型</div>
              </div>
              <div class="weui-cell__bd">
                <!-- 微信picker -->
                  <picker @change="bindVoteTypeChange" :value="voteTypeIndex" :range="voteType">
                    <div class="weui-select weui-select_in-select-after">
                      {{voteType[voteTypeIndex]}}
                    </div>
                  </picker>
              </div>
            </div>
            <!-- 结束日期 -->
            <div class="weui-cell weui-cell_select">
              <div class="weui-cell__hd weui-cell__hd_in-select-after">
                <div class="weui-label">结束日期</div>
              </div>
              <div class="weui-cell__bd">
                <picker mode="date" :value="endDate" start="2015-09-01" end="2110-09-01" @change="bindDateChange">
                  <div class="weui-select weui-select_in-select-after">{{endDate}}</div>
                </picker>
              </div>
            </div>
            <!-- 结束时间 -->
            <div class="weui-cell weui-cell_select">
              <div class="weui-cell__hd weui-cell__hd_in-select-after">
                <div class="weui-label">结束时间</div>
              </div>
              <div class="weui-cell__bd">
                <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
                  <div class="weui-select weui-select_in-select-after">{{time}}</div>
                </picker>
              </div>
            </div>
            <!-- 开关 -->
            <div class="weui-cell weui-cell_switch">
              <div class="weui-cell__bd">匿名投票</div>
              <div class="weui-cell_ft">
                <switch checked @change="bindswitch"/>
              </div>
            </div>
          </div>
          <!-- 匿名投票 -->
          <div class="weui-cells_tips">开启后，发布者任可以查看投票人详情</div>
          <!-- 添加图片 -->
          <div class="weui-cells uploader-wrap">
              <div class="uploader-text">添加图片</div>
              <div class="weui-uploader">
                <div class="weui-uploader__bd">
                  <div class="weui-uploader__files">
                    <block v-for="item in files" :key="index">
                      <div class="weui-uploader__file" @click="previewImage" :id="item">
                        <img :src="item" alt="image" class="weui-uploader__img" mode="aspectFill">
                      </div>
                    </block>
                  </div>
                  <!-- 选择图片 -->
                   <div class="weui-uploader__input-box" v-if="files.length <= 0">
                        <div class="weui-uploader__input" @click="chooseImage"></div>
                    </div>
 
                </div>
              </div>
          </div>
          <!-- 文本提示 -->
          <div class="weui-cells__tips">
            可上传一张和投票主体相关的图片
          </div>
          <!-- 确认发布 -->
          <div class="weui-btn-area">
            <button class="weui-btn" type="primary" @click="submitData">确认发布</button>
          </div>
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
          //投票描述的字数
          fontLen:0,
          files:[],
          // 日期初始值
          endDate:'2019-10-01',
          //时间初始值
          time:"12:01",
          // 投票类型数组
          voteType:["单选","多选，最多2项",'多选，无限制'],
          voteTypeIndex:0,

          //显示添加选项按钮
          showAddBtn:1,
          //显示错误提示
          showTopTips:false,
          // 选项数组
          optionList:[
            {icon:""},
            {icon:""}
          ],

          data:{
            title:'投票标题',
            description:'投票描述',
            time:'00:00',
            endDate:'2200-01-01',
            voteTypeIndex:'0',
            optionList:[],
            switch:false,
            files:[]
          }
        }
    },
    methods:{
      //选择图片
      chooseImage(){
        let that = this
        //调起微信接口
        wx.chooseImage({
          sizeType:["original",'compressed'],//可以指定是原图还是缩略图，默认二者都可以选择
          sourceType:['album','camera'],//可以指定来源是相册还是相机，默认二者都可以有
          count:1,//最多可以选择的图片张数
          success:(res)=>{
            //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            console.log(res.tempFilePaths)
            that.files = res.tempFilePaths
            that.data.files = res.tempFilePaths
          }
        })
      },
      //预览
      previewImage(e){
          console.log(e)
          //微信预览图片api
          wx.previewImage({
            current:e.currentTarget.id,
            urls:this.files
          })
      },
      //确认发布
      submitData(){
        
        //数据的验证
        if(this.dataValidate()){
          //云数据操作
          //云端存储，1.cloud初始化，2.云目录路径配置
          this.cloudUpload(this.data.files[0])

          
          
        }
      
      },
      //云存储
      cloudUpload(_files){
        wx.cloud.uploadFile({
          cloudPath:`${Math.random()*10}.png`,
          filePath:_files,
          success:res=>{
            console.log('[云数据][云图片存储]成功：',res.fileID)
            this.data.files[0] = res.fileID
            //云数据操作
            this.onAdd(this.data)
          },
          fail:err=>{
            console.log('[云数据][云图片存储]失败：',err)
          }
        })
      },

      //云数据库添加
      onAdd(_data){
        //云数据初始化并创建
        const db = wx.cloud.database()
        //去获取集合对象
        const collectionObj = db.collection('vote').add({
          data:{
            oneVoteData:_data
          },
          success:res=>{
            //在返回结果中会包含新的创建的记录的_id
            wx.showToast({
              title:'新增记录成功',
              duration:1000
            })
            console.log('[数据库][新增记录]成功，记录_id:',res._id)
            //跳转
            /*
            mpvue.navigateTo({
              url:"/pages/home/main"
            })
            */
           mpvue.switchTab({
              url:"/pages/home/main"
           })
          },
          fail:err=>{
            wx.showToast({
              title:'新增记录失败',
              icon:'none'
            })
            console.log('[数据库][新增记录]失败:',err)
          }
        })
      },
      //数据验证
      dataValidate(){
        //错误描述文本
        let errStr = ''
        if(this.data.description === '投票描述'){
          errStr = "描述需要详尽"
        }else if(this.data.files.length === 0){
          errStr = "图片需要添加"
        }else if(this.data.optionList.length === 0){
          errStr = "选项为空"
        }else if(this.data.title === "投票标题"){
          errStr = '标题需要详尽'
        }
        if(errStr){
          //有错误，提示用户
          wx.showToast({
            title:errStr,
            icon:'none',
            duration:1000
          })
          return false
        }
        return true
      },
      //获取匿名投票操作
      bindswitch(e){
        this.data.switch = e.target.value
      },
      //获取投票结束时间
      bindTimeChange(e){
        this.time = e.target.value
        this.data.time = this.time
      },
      //获取投票结束日期
      bindDateChange(e){
        this.endDate = e.target.value
        this.data.endDate = this.endDate
      },
      //获取投票类型
      bindVoteTypeChange(e){
        this.voteTypeIndex = e.target.value
        this.data.voteTypeIndex = this.voteTypeIndex
      },
      //记录选项值
      recordValue(e){
        //获取索引值
        let _index = e.currentTarget.dataset.index
        //获取填写值
        let _value = e.target.value
        //获取选项数组
        let _optionList = this.optionList
        //把填写值填充到数组对应对象中
        _optionList[_index].value = _value
        this.optionList = _optionList

        //存入数组数据
        this.data.optionList = this.optionList
        //console.log(this.optionList)
      },
      //添加选项
      addOption(){
          //获取data的数据
          let _optionList = this.optionList
          _optionList.push({icon:"/static/images/common/5.png"})
          this.optionList = _optionList
          // 判断超过15个
          if(_optionList.length >=15){
            //把showAddBtn变量设置为0
            this.showAddBtn = 0
          }
          //动态更新投票类型
          this.updateVoteType()
      },
      //动态更新投票类型
      updateVoteType(){
        //获取用户的选项数组
        let _optionList = this.optionList;
        let _voteType = this.voteType
        //修改(清除初始化数据)
        _voteType = []
        _optionList.map((obj,i)=>{
          if(i === 0){
            _voteType.push("单选")
          }else{
            _voteType.push("多选，最多"+(i+1)+"项")
          }
        })
        this.voteType = _voteType
        //console.log(_voteType)
      },
      // 获取投票标题
      getInputTitle(e){
        if(e.target.value==""){
          wx.showToast({
            title:"标题很重要",
            icon:"none"
          })
        }
       this.data.title = e.target.value
      },
      //获取投票说明
      getTextarea(e){
        if(e.target.value==""){
           wx.showToast({
            title:"说明很重要",
            icon:"none"
          })
        }
        if(e.target.value.length>=80){
          wx.showToast({
            title:"不超过80字",
            icon:"none"
          })
        }else{
          this.data.description = e.target.value
        }
        this.data.description= e.target.value.substr(0,80)
        this.fontLen = e.target.value.length
        //console.log(this.data)
      }
    }
}
</script>

<style>
.option-icon{
  margin-right:10rpx;
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
}

.uploader-wrap{
  width:100%;
  overflow: hidden;
}

.uploader-text{
  float:left;
  height: 200rpx;
  line-height: 200rpx;
  padding-left:30rpx;
  margin-right: 40rpx;
}

.weui-uploader{
  float: left;
  padding-top:18rpx;
}

</style>