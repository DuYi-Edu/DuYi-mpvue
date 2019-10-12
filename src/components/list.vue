<template>
  <div>
    <a :href="nav">
    <div class="item">
      <div class="icon">
        <img :src="'/static/me/'+iconimg" alt="image" class="iconImg" />
      </div>
      <div class="itemName">
        <div>{{title}}</div>
      </div>
      <div class="right">></div>
    </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["iconimg", "title","nav"]
};
</script>

<style>
.item {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  height: 100rpx;
  align-items: center;
}
.icon {
  width: 100rpx;
  text-align: center;
}
.itemName {
  width: 40%;
  font-size: 28rpx;
  font-weight: bold;
}
.right {
  width: 40%;
  text-align: right;
}
</style>