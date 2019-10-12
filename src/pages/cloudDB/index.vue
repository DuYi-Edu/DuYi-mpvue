<template>
  <div class="container">
    <div class="page-body">
      <!-- 添加数据 -->
      <div class="page-section">
        <div class="page-section-title">数据录入操作</div>
        <div class="page-section-content">
          <form @submit="formSubmit">
            <div class="section-row">
              <span>姓名：</span>
              <input type="text" name="username" class="input-style" />
            </div>
            <div class="section-row">
              <span>年龄：</span>
              <input type="text" name="userage" class="input-style" />
            </div>
            <button type="primary" form-type="submit">数据库录入</button>
          </form>
        </div>
      </div>
      <!-- 获取数据 -->
      <div class="page-section">
        <div class="page-section-title">数据获取</div>
        <div class="page-section-content">
          <div class="section-row" v-for="item in userList" :key="index">
            <div>用户姓名：{{item.name}}</div>
            <div>用户姓名：{{item.age}}</div>
          </div>
          <button type="primary" @click="getUserRecord">数据库读取记录</button>
        </div>
      </div>
      <!-- 获取单条数据 -->
      <div class="page-section">
        <div class="page-section-title">数据单条获取</div>
        <div class="page-section-content">
          <div class="section-row">
            <div>用户姓名：{{name}}</div>
            <div>用户姓名：{{age}}</div>
          </div>
          <button type="primary" @click="getUser">数据库读取单记录</button>
        </div>
      </div>
      <!-- 数据单条更新 -->
      <div class="page-section">
        <div class="page-section-title">数据单条更新</div>
        <div class="page-section-content">
          <div class="section-row">
            <span>需要更新的字段</span>
            <input type="text" name="newFiledVal" @blur="getNewsFieldVal" class="input-style" />
          </div>
          <div class="section-row">
            <span>数据库字段</span>
            <input type="text" name="dbFieldVal" :value="dbFieldVal" class="input-style" />
          </div>
          <button type="primary" @click="updateData">数据更新</button>
        </div>
      </div>
      <!-- 数据删除操作 -->
      <div class="page-sectoin">
        <div class="page-section-title">数据删除操作</div>
        <div class="page-section-content">
          <div class="section-row">
            <span>需要删除ID：</span>
            <input type="text" name="deleteFieldVal" @input="getDeleteId" class="input-style" />
          </div>
          <button type="primary" @click="deleteData">删除数据</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database({
  env: "test-jj55w"
});
export default {
  onLoad() {
    //云函数
    wx.cloud.callFunction({name:"user"}).then(res=>{
      console.log(res)
    })



    let that = this;
    db
      .collection("shujuku3")
      .where({
        _id: "1af3506e5d9bfa1f0d56a39c20583ca2"
      })
      .get()
      .then(res => {
        that.dbFieldVal = res.data[0].name;
      });
  },
  data() {
    return {
      userList: [],
      name: "",
      age: "",
      dbFieldVal: "",
      newVal: "",
      deleteId: ""
    };
  },
  methods: {
    //删除数据
    deleteData() {
      if (this.deleteId == "") {
        wx.showToast({
          title: "删除ID没有",
          icon: "none"
        });
      } else {
        db
          .collection("shujuku3")
          .doc(this.deleteId)
          .remove()
          .then(res => {
            wx.showToast({
              title: "已删除记录：" + res.stats.removed
            });
          })
          .catch(res => {
            wx.showToast({
              title: "无此记录",
              icon:"none"
            });
          });
      }
    },
    //获取需要删除id
    getDeleteId(e) {
      this.deleteId = e.target.value;
    },
    //获取需要修改的文本
    getNewsFieldVal(e) {
      this.newVal = e.target.value;
    },
    //数据单条更新
    updateData() {
      //回调模式
      /*
            db.collection('shujuku3').doc('1af3506e5d9bfa1f0d56a39c20583ca2').update({
                data:{
                    name:this.newVal
                },
                success:console.log,
                fail:console.error
            })
            */
      //promise
      db
        .collection("shujuku3")
        .doc("1af3506e5d9bfa1f0d56a39c20583ca2")
        .update({
          data: {
            name: this.newVal
          }
        })
        .then(res => {
          wx.showToast({
            title: "更新记录数" + res.stats.updated
          });
        })
        .catch(console.error);
    },
    //获取单条数据
    getUser() {
      db
        .collection("shujuku3")
        .doc("1af3506e5d9bfa1f0d56a39c20583ca2")
        .get()
        .then(res => {
          console.log(res);
          this.name = res.data.name;
          this.age = res.data.age;
        });
    },
    //获取用户记录
    getUserRecord() {
      let that = this;
      const db = wx.cloud.database({
        env: "test-jj55w"
      });
      //回调方式
      /*
            db.collection("shujuku3").get({
                success(res){
                    console.log(res)
                }
            })
            */
      //promise
      db
        .collection("shujuku3")
        .get()
        .then(res => {
          that.userList = res.data;
        });
    },
    //数据获取
    formSubmit(e) {
      //获取录入的数据
      let userInfo = {
        username: e.target.value.username,
        userage: e.target.value.userage
      };
      //数据库操作
      this.cloudDBadd(userInfo);
    },
    //数据添加
    cloudDBadd(userInfo) {
      //回调方法
      //创建数据库对象
      const db = wx.cloud.database({
        env: "test-jj55w"
      });
      //选择数据库结合并添加数据
      //创建服务器端时间
      //备注：运行前自行创建shujuku3集合
      /*
            db.collection('shujuku3').add({
                data:{
                    name:userInfo.username,
                    age:userInfo.userage,
                    createTime:new Date('2019-01-01')
                },
                success(res){
                    //成功后会返回新记录的_id
                    console.log(res)
                }
            })
            */

      //promise方式
      db
        .collection("shujuku3")
        .add({
          data: {
            name: userInfo.username,
            age: userInfo.userage,
            createTime: db.serverDate()
          }
        })
        .then(res => {
          console.log("success", res);
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
.page-body {
  width: 100%;
  height: 100%;
}

.page-section {
  width: 90%;
  background: white;
  border-radius: 10rpx;
  margin: 20rpx auto;
  padding: 20rpx;
}

.page-section-title {
  text-align: center;
  font-size: 40rpx;
}

.page-section-content {
  width: 100%;
}

.section-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100rpx;
  line-height: 100rpx;
}

.input-style {
  margin-top: 25rpx;
  height: 60rpx;
  border-radius: 5rpx;
  margin-left: 10rpx;
}

.input-style {
  background: #c4c4dfbd;
}

button {
  margin: 20rpx 0;
}
</style>