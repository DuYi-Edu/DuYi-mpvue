<template>
  <div>
    <!-- 左侧aside滑块 -->
    <div class="container flex-wrap flex-direction-row">
      <!-- left aside -->
      <div class="aside flex-wrap flex-direction-col">
        <block v-for="item in navList" :key="index">
          <span
            @click="selectNav"
            :data-index="index"
            :class="{'type-nav':true, 'selected':curNav == item.id}"
          >{{item.name}}</span>
        </block>
      </div>
      <!-- content -->
      <div class="content flex-item">
        <block v-for="item in classifyList[curIndex]" :key="index">
          <div
            @click="selectNavData"
            :data-classify="item.id"
            class="dish flex-wrap flex-direction-row"
          >
            <div class="flex-item">
              <span class="title">{{item.name}}</span>
              <p>￥{{item.price}}</p>
            </div>
            <div class="add_btn">
              <icon :type="[item.status ? 'success' : 'circle']"></icon>
            </div>
          </div>
        </block>
      </div>
    </div>
    <!-- cart num -->
    <div class="cart">
      <span class="total" @click="showCart">购物车：{{cartTotal}}</span>
    </div>

  </div>
</template>

<script>
import dataList from "@/utils/data";
export default {
  onLoad() {},
  data() {
    return {
      navList: dataList.navList,
      curNav: 1,
      classifyList: dataList.classifyData,
      curIndex: 0,
      cart: [],
      cartTotal:0
    };
  },
  methods: {
    //显示购物车
    showCart(){
      console.log(this.cart)
    },
    selectNav(e) {
      //console.log(e.currentTarget.dataset.index)
      this.curNav = parseInt(e.currentTarget.dataset.index) + 1;
      this.curIndex = parseInt(e.currentTarget.dataset.index);
    },
    //选择分类对应的数据
    selectNavData(e) {
      let classifyid = e.currentTarget.dataset.classify;
      let flag = true;
      let cart = this.cart;

      if (cart.length > 0) {
        //购物车有数据
        cart.forEach(function(item,index){
          if(item == classifyid){
            //已经选中后的取消操作
            cart.splice(index,1)//从购物车删除此物品
            flag = false
          }
        })
      }
      //购物车无数据
      if(flag){
        cart.push(classifyid)
      }
      this.cartTotal = cart.length
      console.log(this.cartTotal)
      this.setStatus(classifyid)
    },
    //设置并修改选项状态图标值
    setStatus(classifyid){
      let classifyList = this.classifyList
      for(let classify of classifyList){
        classify.forEach((item)=>{
          if(item.id == classifyid){
            item.status = !item.status || false
          }
        })
      }
    }
  }
};
</script>

<style>
.aside {
  width: 160rpx;
  border-right: 1px solid #ddd;
  font-size: 30rpx;
  background-color: #ccc;
}
.type-nav {
  position: relative;
  padding: 35rpx 25rpx;
  text-align: center;
  border-bottom: 1px solid #ddd;
  z-index: 10;
}
.type-nav.selected {
  margin-right: -1px;
  padding-left: -1px;
  color: #333;
  background-color: #fff;
}
.content {
  background-color: #fff;
}

.dish {
  margin-left: 10rpx;
  padding: 10rpx;
  border-bottom: 2rpx solid #ddd;
}
.dish .title {
  display: block;
  font-size: 30rpx;
}
.dish p {
  color: orange;
}

.cart{
  display: block;
  position:fixed;
  left:0;
  right: 0;
  bottom:0;
  padding: 10rpx;
  background: #ddd;
}
</style>