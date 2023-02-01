<template>
  <view class="container">
    <image src="../../static/logo.png" class="logo"></image>
    <view class="form">
      <view class="form-item">
        <text class="label">Username</text>
        <input v-model="username" class="input" type="text" placeholder="Enter your username"></input>
      </view>
      <view class="form-item">
        <text class="label">Password</text>
        <input v-model="password" class="input" type="password" placeholder="Enter your password"></input>
      </view>
      <button @click="login" type="primary">Login</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username === '' || this.password === '') {
        uni.showToast({
          title: 'Username or password cannot be empty',
          duration: 2000
        });
        return;
      }
      // Send login request to server
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
}

.form {
  width: 80%;
}

.form-item {
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
