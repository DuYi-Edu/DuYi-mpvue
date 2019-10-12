<template>
  <div class="item">
      <radio :value="genderid" hidden :checked="genderid==1" :id="'g'+genderid"/>
      <label for="" class="labeled">
          <div :class="{'head':true,'select':genderid==1}">
              <img class="avatar" :src="'/static/images/'+img+'.png'" alt="image">
          </div>
          <span class="call">{{name}}</span>
      </label>
  </div>
</template>

<script>
export default {
    props:['name','img','genderid']
}
</script>

<style>
.item{
    width:120rpx;
}
.item .labeled{
    display:flex;
    flex-direction: column;
    align-items:center;
}
.head{
    display: block;
    width:120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    opacity: 0.6;
}
.select{
    background-color: #d9ba6a;
    opacity: 1;
}
.avatar{
    width: 120rpx;
    height: 120rpx;
}
.call{
    margin-top:12rpx;
}
.select{
  background-color: #d9ba6a;
  opacity: 1;
}

</style>