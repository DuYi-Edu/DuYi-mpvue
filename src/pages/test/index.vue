<template>
  <div>
    <!--  
    <h1 v-if="flag==1">mpvue v-if 1</h1>
    <h1 v-else-if="flag==2">mpvue v-else 2</h1>
    <h1 v-else-if="flag==3">mpvue v-else 3</h1>
    <h1 v-else>v-else</h1>
    -->
    <!--  
    <template v-if="blockIf">
    <div>这是我们的view标签if部分</div>
    <div>新学习，新知识</div>
    </template>
    <template v-else>
    <div>这是我们的view标签else部分</div>
    <div>新学习，新知识</div>
    </template>
    
    <template v-if="loginName == 'login'">
      <label>username</label>
      <input placeholder="输入用户名" key="username">
    </template>
    <template v-else>
      <label>telphone</label>
      <input placeholder="输入电话" key="telphone">
    </template>
    <button @click="changeLogin">改变登录</button>

    <div v-show="blockIf">
      <div>view tag</div>
    </div>
    

    <ul>
      <li v-for="(item,index) in students" :key="index">
       {{loginName}} - {{index}}-{{item.name}}
      </li>
    </ul>

    <div v-for="(value,name,index) in student" :key="index">
      {{index}},{{name}}.{{value}}
    </div>
-->
<ul>
    <template v-for="student in students">
      <li>{{student.name}}</li>
    </template>
</ul>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      student:{ 
        name:"jack",
        age:20,
        gender:1
      },
      flag:4,
      blockIf:false,
      loginName:'login',
      students:[
        {name:"tom"},
        {name:"mary"}
      ]
    };
  },

  methods: {
      changeLogin(){
        this.loginName = 'telphone'
      }
  }
};
</script>

<style>
</style>