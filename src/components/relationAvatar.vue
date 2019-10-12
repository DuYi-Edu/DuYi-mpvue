<template>
  <div class="item">
    <radio :value="pid" hidden :checked="pid==1" :id="'r'+pid"/>
    <label for class="labeled">
      <div :class="{'head':true,'select':pid==relationID}" @click="tap_relation" :data-id="pid">
        <img :src="'/static/images/'+img+'.png'" alt="image" class="avatar" />
      </div>
      <span class="call">{{name}}</span>
    </label>
  </div>
</template>
 
<script>
export default {
  props: ['name','img','pid'],
  data() {
    return {
      relationID:1
    };
  },
  methods: {
    //关系的切换
    tap_relation(pid){
      this.relationID = pid.currentTarget.dataset.id
    }
  }
};
</script>

<style>

.item {
  width: 120rpx;
}
.item .labeled {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  display: block;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  opacity: 0.6;
}
.call {
  margin-top: 12rpx;
}
.select{
  background-color: #d9ba6a;
  opacity: 1;
}

</style>