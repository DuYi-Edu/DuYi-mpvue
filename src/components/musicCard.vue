<template>
    <div class="big-photo-item" @click="play">
                <img class="photo" :src="musicPhoto" alt="images"/>
                <span class="music-name">{{musicName}}</span>
                <span class="music-author">{{musicAuthor}}</span>
    </div> 
</template>

<script>
export default {
    props:["musicPhoto","musicName","musicAuthor","musicPath"],
    data(){
        return{

        }
    },
    methods:{
        play(){
            //利用背景播放音乐-微信
            
            wx.playBackgroundAudio({
                dataUrl:this.musicPath,
                name:this.musicName,
                singer:this.musicAuthor,
                coverImgUrl:this.musicPhoto,
                complate:function(res){
                    //playing:true
                }
            })
            
        }
    }
}
</script>

<style>
.big-photo-list{
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content: space-around;
}
.big-photo-item{
    width: 280rpx;
    display: flex;
    flex-direction: column;
    padding:5rpx 0;
    text-align: center;
}

.photo{
    width: 280rpx;
    height: 280rpx;
    border-radius: 10rpx;
    background: #aaa;
}

.music-name{
    font-size:24rpx;
    line-height: 32rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.music-author{
    font-size: 24rpx;
    color:#929292;
    line-height: 32rpx;
}
</style>