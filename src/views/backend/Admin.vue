<template>
    <div class="admin">
        <div class="admin_wrapper">
            <div class="navbar">
                <ul class="menu">
                    <li>
                        <router-link to="/admin">商品管理</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/order">訂單管理</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/coupon">優惠管理</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/posts">文章管理</router-link>
                    </li>
                </ul>
                <a @click.prevent="logOut" class="logout" href="#">登出</a>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <!-- <ProductModal ref="productModal"></ProductModal> -->
    <div class="loading_shadow" v-if="loading">
        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     </div>
</template>

<script>
// import ProductModal from '@/components/ProductModal.vue'
export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      token: ''
    }
  },
  methods: {
    logOut () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.defaults.headers.common.Authorization = this.token
      vm.$http.post(`${vm.url}/logout`)
        .then(function (res) {
          if (res.data.success) {
            console.log(res.data.message)
            vm.$store.commit('startLoading', false)
            alert(res.data.message)
            vm.$router.push('/login')
          } else {
            alert(res.data.message)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    checkLogin () {
      var vm = this
      console.log('檢查登入中')
      vm.$http.defaults.headers.common.Authorization = this.token
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/user/check`)
        .then(function (res) {
          console.log(res)
          if (res.data.success) {
            vm.$store.commit('startLoading', false)
            // alert('目前登入中')
          } else {
            alert('驗證錯誤,請重新登入')
            vm.$store.commit('startLoading', false)
            vm.$router.push('/login')
          }
        })
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  components: {
  },
  mounted () {
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue_class\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.token = token
    this.checkLogin()
  }
}
</script>

<style scoped>
.admin {
    background: #7a7a7a;
    height:100vh;
}
.admin_wrapper {
    height:80%;
    width:80%;
    /* background: #ffffff; */
    position: absolute;
    top:50%;
    left:50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
}
.navbar {
    background: #c2a09e;
    padding: 12px 40px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.navbar .menu {
    display: flex;
    margin: 0;
    padding-left: 0;
}
.navbar .menu li {
    list-style: none;
    font-size: 16px;
    color:#ffffff;
    margin-right: 15px;
    letter-spacing: 1px;
}
.navbar .menu li a , .logout {
    font-size: 16px;
    color:#ffffff;
    letter-spacing: 1px;
    text-decoration: none;
}
.content {
    overflow-y: scroll;
    background: #ffffff;
    height: calc(100% - 48px);
    padding:1.5% 2.5%;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
/*======loading======*/
.loading_shadow {
    background: rgba(255,255,255,0.7);
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
    z-index: 9999;
}
.lds-default {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  top:50%;
  left:50%;
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
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
