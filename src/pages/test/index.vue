<template>
  <div>
        <template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" key="email-input">
    </template>
    <button @click="aa">aaa</button>
  </div>

</template>

<script>
export default {
    data(){
        return{
            loginType:"username"
        };
    },

    methods:{
        aa(){
            this.loginType="aaa"
        }
    }
}
</script>

<style>

</style>