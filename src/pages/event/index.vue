<template>
<div>
    区别window对象操作和小程序事件的写法
    <button @click="add(3)">Add</button>
    <p>The button above has been clicked {{ counter }} times.</p>

    事件修饰符在mpvue的使用
    .stop
    <div @click="outerEvent">
        outer
        <div @click.stop="innerEvent">inner</div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            counter:0
        };
    },

    methods:{
        outerEvent(){
            console.log("outerEventMethods")
        },
        innerEvent(){
            console.log("innerEventMethods")
        },
        add(num){
            //this.counter +=num
            //在mpvue中是不能直接使用window对象的任何方法
            //alert(num)
            //原生微信写法提示框
            wx.showToast({
                title:'成功',
                icon:"success",
                duration:2000
            })

        }
    }
}
</script>

<style>

</style>