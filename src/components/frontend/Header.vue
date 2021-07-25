<template>
     <div class="header container">
        <h1 class="logo">B<span class="logo_accessory">&</span>E</h1>
        <span class="sub_title">The best for everyone</span>
        <ul class="header_menu" :class="{ 'text-dark' : textDark }">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/shop/all">Shop</router-link>
          </li>
          <li>
            <router-link to="/blog/all">Blog</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/cart" href="#" class="cart_link" >
               <span class="cart" :class="{ 'fill' : !textDark }">{{cart_count}}</span>
            </router-link>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  props: {
    textDark: {
      type: Boolean,
      Default: false
    },
    updateCart: {
      type: Boolean,
      Default: false
    }
  },
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      carts: []
    }
  },
  methods: {
    getCartInfo () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/cart`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.carts = res.data.data.carts
            // vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  computed: {
    cart_count () {
      return this.carts.length
    }
  },
  created () {
    this.getCartInfo()
  },
  watch: {
    updateCart () {
      this.getCartInfo()
    }
  }
}
</script>

<style scoped>
  .logo {
    font-family:'Sriracha',handwriting;
    color:#fe5252;
    margin-bottom:0;
    font-size: 48px;
  }
  .logo_accessory {
    font-size: 24px;
    margin: 0 2px;
  }
  .sub_title {
    font-size: 14px;
    font-family:'Sriracha',handwriting;
    margin-bottom: 20px;
    color:#000000;
  }
   .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .header .header_menu {
    display: flex;
    align-items: center;
    margin:0;
    padding:0;
  }
  .header .header_menu li{
    list-style: none;
    padding: 0 20px;
    color:#ffffff;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
  }
   .header .header_menu.text-dark li {
    color:#000000;
  }
  .header .header_menu li a {
    font-family: inherit;
    color:inherit;
    text-decoration: none;
    letter-spacing: inherit;
    font-size: inherit;
  }
  .cart_link .cart.fill{
    background: #fe5252;
    color:#ffffff;
  }
  .cart_link:hover .cart{
    background: #fe5252;
    color:#ffffff;
  }
  .cart {
    border:2px solid #fe5252;
    width:30px;
    height:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-family: sans-serif;
    color:#fe5252;
    font-size: 14px;
    position: relative;
    font-weight: bold;
    transition: all .3s;
  }
  .cart::after {
    content:'';
    position: absolute;
    pointer-events: none;
    border-width: 2px;
    border-style: solid;
    border-top-left-radius:10em;
    border-top-right-radius:10em;
    border-bottom:0;
    height:12px;
    width:12px;
    top:-8px;
    border-color:#fe5252;
  }
  @media(max-width:414px) {
    .logo {
      font-size: 36px;
    }
    .header .header_menu li {
      font-size: 16px;
      padding: 0 10px;
    }
  }
</style>
