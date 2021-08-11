<template>
  <div class="container-fluid login-container">
    <div class="main-container">
      <div class="login-form">
        <div
          class="login-img"
          style="
            background-image: url('https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80');
          "
        ></div>
        <Form class="user-info" v-slot="{ errors }" @submit="login">
          <h1 class="logo">B<span class="logo_accessory">&</span>E</h1>
          <span class="sub_title">The best for everyone</span>
          <div class="input-container">
            <label for="username">帳號</label>
            <Field
              id="username"
              name="帳號"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['帳號'] }"
              placeholder="請輸入Email地址"
              rules="email|required"
              v-model="username"
            ></Field>
            <error-message name="帳號" class="invalid-feedback"></error-message>
          </div>
          <div class="input-container">
            <label for="password">密碼</label>
            <Field
              id="password"
              name="密碼"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼"
              rules="required"
              v-model="password"
            ></Field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <button class="login-btn">登入</button>
          <router-link to="/" class="login-back" href="#">回到前台</router-link>
        </Form>
      </div>
    </div>
    <div class="loading_shadow" v-if="loading">
      <div class="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const user = {
        username: this.username,
        password: this.password
      }
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${process.env.VUE_APP_API}/admin/signin`, user)
        .then(function (res) {
          if (res.data.success) {
            const token = res.data.token
            const expired = res.data.expired
            document.cookie = `vue_class=${token}; expires=${new Date(expired)};path=/`
            vm.$store.commit('startLoading', false)
            alert(res.data.message)
            vm.$router.push('/admin')
          } else {
            vm.$store.commit('startLoading', false)
            alert(res.data.message)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>
.logo {
  text-align: center;
  font-family: "Sriracha", handwriting;
  color: #fe5252;
  margin-bottom: 0;
  font-size: 48px;
}
.logo_accessory {
  font-size: 24px;
  margin: 0 2px;
}
.sub_title {
  font-size: 14px;
  font-family: "Sriracha", handwriting;
  margin-bottom: 20px;
  color: #000000;
  text-align: center;
}
.login-container {
  background: #c2a09e;
  height: 100vh;
  font-family: "Noto Sans TC", sans-serif;
}
.main-container {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 600px;
}
.login-form {
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
  /* border:1px solid #c3c4c7; */
  background: #ffffff;
  display: flex;
  height: 100%;
  border-radius: 10px;
}
.login-form .login-img {
  height: 100%;
  width: 50%;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.login-form .user-info {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.input-container input {
  border: 1px solid #4a4a4a;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}
.login-btn {
  display: block;
  border: 1px solid #c2a09e;
  background: #c2a09e;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  margin-bottom: 15px;
  border-radius: 5px;
  transition: all 0.3s;
}
.login-btn:hover {
  background: #ffffff;
  color: #c2a09e;
}
.login-back {
  display: block;
  border: 1px solid #f0f0f1;
  background: #f0f0f1;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  color: #4a4a4a;
  border-radius: 5px;
}
/*======loading======*/
.loading_shadow {
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
.lds-default {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #c2a09e;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
