<template>
  <div class="container">
      <span class="music-category-text">最近添加 >></span>
      <!-- 音乐播放碟列表 --> 
      <div class="big-photo-list">
          <div v-for="item in songsList" :key="index">
            <div @click="actionPlayBar" :data-photo='item.coverImgUrl' :data-name='item.name'>
                <musicCard :musicPhoto="item.coverImgUrl" :musicName="item.name" :musicAuthor="item.singer" :musicPath="item.dataUrl"/> 
            </div>
          </div>
      </div>

      <!-- 音乐展示选项（播放列表，歌曲列表，专辑列表，演唱者列表，取消） -->
      <div class="music-group-selector" @click="actionSheetTap">
          <span class="music-group-selector-text">播放列表</span>
          <img class="music-group-selector-jiantou" src="/static/images/icon-jiantou.png" alt="image">
      </div>

      <div class="list-container">
          <div v-if="actionSheetItem==0">
            <songs></songs>
          </div>
          <div v-else-if="actionSheetItem==1">
            <musicPlay></musicPlay>
          </div>
          <div v-else-if="actionSheetItem==2">
            <albumList></albumList>
          </div>
          <div v-else>
            <authorLists></authorLists>
          </div>
      </div>

    <!-- 播放按钮 -->
    <div class="play-bar" v-if="showPlayBar">
        <!-- 歌曲图片 -->
        <div class="play-bar-image-container">
            <img :src="playBar.coverImgUrl" alt="image" class="play-bar-image">
        </div>
        <!-- 播放名称 -->
        <span class="play-bar-text">{{playBar.name}}</span>
        <!-- 播放按钮 -->
        <div v-if="playing === false">
            <img @click="play" src="/static/images/icon-play.png" alt="image" class="play-bar-button">
        </div>
        <div v-else>
            <img @click="pause"  src="/static/images/icon-pause.png" alt="image" class="play-bar-button">
        </div>
    </div>
      
  <action-sheet :hidden="actionSheetHidden" @change="actionSheetChange">
      <block v-for="item in actionSheetList" :key="index">
      <action-sheet-item @tap="bindItemTap" :data-sheetitemIndex="index">
          {{index+1}}.{{item.name}}
      </action-sheet-item>
      </block>
      <action-sheet-cancel class="cancel">取消</action-sheet-cancel>
  </action-sheet>
  </div>



</template>

<script>
import indexShowSongs from '../../utils/songs-list'
import authorLists from '@/components/author-list'
import albumList from '@/components/album-list'
import musicPlay from '@/components/music-play'
import songs from '@/components/songs-list'
import musicCard from '@/components/musicCard'
export default {
    mounted(){
    },
    data(){
        return{
            showPlayBar:false,
            playBar:{
                dataUrl:'http://mpge.5nd.com/2018/2018-5-10/85111/1.mp3',
                name:'哑巴',
                singer:'薛之谦',
                coverImgUrl:'http://img.5nd.com/86/photo/2018album/20185/85111.jpg'
            },
            songsList:indexShowSongs.songslist,
            playing:false,
            actionSheetItem:0,
            changeComponent:false,
            actionSheetHidden:true,
            actionSheetList:[
                {name:'播放列表'},
                {name:'歌曲'},
                {name:'专辑'},
                {name:'演唱者'}
            ]
        }
    },
    methods:{
        //停止按钮
        pause(){
            wx.pauseBackgroundAudio({
                success:function(){
                    //....
                }
            })
            this.changePlay()
        },
        // 播放按钮
        play(){
            wx.playBackgroundAudio({
                dataUrl:this.playBar.dataUrl,
                complate:function(res){
                    //...
                }
            })
            this.changePlay()
        },
        // 在底部显示播放栏
        actionPlayBar(e){
            console.log(e)
            this.playBar.name = e.currentTarget.dataset.name
            this.playBar.coverImgUrl = e.currentTarget.dataset.photo
            // 显示底部触摸栏
            this.showPlayBar = true
            // 播放图标
            this.changePlay()
        },

        changePlay(){
            this.playing = !this.playing
        },
        //单击actionSheet里的菜单选项
        bindItemTap(e){
            this.actionSheetItem = e.currentTarget.dataset.sheetitemindex
            //隐藏actionSheet
            this.actionSheetTap()
        },
        actionSheetTap(){
            this.actionSheetHidden = !this.actionSheetHidden
        },
        // 点击灰色区域或者取消按钮
        actionSheetChange(){
            this.actionSheetHidden = !this.actionSheetHidden
        }
    },
    components: {
        musicCard,
        songs,
        musicPlay,
        albumList,
        authorLists
    },

}
</script>

<style>
.container{
    align-items: flex-start;
}
.music-category-text{
    font-size:28rpx;
    line-height: 30rpx;
}
/* 音乐展示选项 */
.music-group-selector{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10rpx 0;
}
.music-group-selector-text{
    font-size:28rpx;
}
.music-group-selector-jiantou{
    width:28rpx;
    height:28rpx;
}
/* actionsheet */
.cancel{
    background: #ccc
}

.list-container{
    width: 100%;
}

/* 播放栏play-bar */
.play-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background: #f9f9f9;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.play-bar-image-container{
    width: 75rpx;
    height: 75rpx;
    padding-left: 30rpx;
}
.play-bar-image{
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
}
.play-bar-text{
    flex-grow: 1;
    padding-left:20rpx;
}
.play-bar-button{
    width: 40rpx;
    height: 40rpx;
    padding-right: 30rpx;
}

</style>