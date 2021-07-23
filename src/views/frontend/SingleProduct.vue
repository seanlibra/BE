<template>
    <div class="single_product">
        <Header :update-Cart="cartUpdteTrigger" :text-dark="true"></Header>
        <div class="wrapper container">
        <Sidebar></Sidebar>
        <div class="content">
            <div class="product_detail">
                <div class="left_group">
                            <div class="ribbon ribbon-top-left" v-if="product.onsale">
                              <span class="ribbon_content">
                                <span class="ribbon_border">{{product.onsale}}</span>
                              </span>
                            </div>
                    <img class="product_img" :src="product.imageUrl">
                </div>
                <div class="right_group">
                    <h2 class="product_title">{{product.title}}</h2>
                    <div class="price_wrapper">
                        <span :class="{ normal : product.price  == product.origin_price }"  class="origin_price">${{product.origin_price}}</span>
                        <span  v-if="product.price !== product.origin_price" class="onsale_price">${{product.price}}</span>
                    </div>
                    <div v-html="product.content" class="description">
                    </div>
                    <div class="cart_tools">
                        <div class="inner_container">
                            <div class="counter">
                                <button @click="count--">-</button>
                                <input min="1" max="99" type="number" v-model="count">
                                <button @click="count++">+</button>
                            </div>
                            <a @click.prevent="addToCart" class="add_to_cart" href="#">加入購物車</a>
                        </div>
                    </div>
                    <div class="product_category_container">
                        <span>商品分類: </span>
                        <router-link :to="`/shop/${product.category}`">{{product.category}}</router-link>
                    </div>
                    <div class="soical_media_container">
                      <a style="background-image:url('https://i.imgur.com/sUM6rZ1.png')" href="#"></a>
                      <a style="background-image:url('https://i.imgur.com/rxHpEdl.png')" href="#"></a>
                      <a style="background-image:url('https://i.imgur.com/i9i9Hpf.png')" href="#"></a>
                      <a style="background-image:url('https://i.imgur.com/mQ6bpWS.png')" href="#"></a>
                      <a style="background-image:url('https://i.imgur.com/jMyZwmb.png')" href="#"></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Loading v-if="loading"></Loading>
        <Footer></Footer>
        <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
    </div>
</template>

<script>
import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer.vue'
import Sidebar from '@/components/frontend/Sidebar.vue'
import Loading from '@/components/Loading.vue'

export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      product: {
        on_sale: false
      },
      count: 1,
      cartUpdteTrigger: false,
      bubbleText: ''
    }
  },
  methods: {
    getProductDetail () {
      var vm = this
      var id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/product/${id}`)
        .then(function (res) {
          if (res.data.success) {
            vm.product = res.data.product
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    },
    addToCart () {
      var vm = this
      var readyToAdd = { data: { product_id: vm.product.id, qty: vm.count } }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/${vm.path}/cart`, readyToAdd)
        .then(function (res) {
          console.log(res)
          if (res.data.success) {
            vm.bubbleText = res.data.message
            vm.$store.commit('startLoading', false)
            vm.$refs.bubble.bubbleACtive()
            vm.cartUpdteTrigger = !vm.cartUpdteTrigger
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    Header, Footer, Sidebar, Loading
  },
  created () {
    this.getProductDetail()
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.wrapper {
  display:flex;
  padding:75px 0;
  position: relative;
}
.content {
   width: 73%;
   margin: 0 1%;
}
.product_detail {
  display:flex;
}
.product_detail > div {
  width: 50%;
  padding: 20px;
}
.product_detail .left_group {
  position: relative;
}
.product_detail .right_group {
 display: flex;
 flex-direction: column;
}
.product_img {
  width:100%;
  height:650px;
  object-fit: cover;
}
.product_title {
  font-size: 30px;
  letter-spacing: 1px;
  font-family: 'Noto Sans TC', sans-serif;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f1f1;
}
.product_detail .price_wrapper {
    margin-bottom: 30px;
}
.product_detail .price_wrapper .origin_price{
  color:#7e7e7e;
  text-decoration: line-through;
  font-size: 18px;
  font-family:'Sriracha',handwriting;
  margin-right: 15px;
}
.product_detail .price_wrapper .origin_price.normal {
  text-decoration: none;
}
.product_detail .price_wrapper .onsale_price {
  color:#fe5252;
  font-size: 24px;
  font-family:'Sriracha',handwriting;
}
.product_detail .description {
    letter-spacing: 1px;
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 15px;
    flex-grow: 1;
}
.product_detail .cart_tools {
  border-top:1px solid #f1f1f1;
  border-bottom:1px solid #f1f1f1;
  padding: 20px 0;
}
.cart_tools .inner_container {
  display: flex;
  align-items: center;
}
.cart_tools .counter {
  display: flex;
  margin-right: 15px;
}

.cart_tools .counter button{
  /* display: block; */
  width: 36px;
  height:36px;
  border:1px solid #e4e4e4;
  background: #ffffff;
}
.cart_tools .counter input {
 width: 36px;
 height:36px;
 border:0;
 border-top:1px solid #e4e4e4;
 border-bottom:1px solid #e4e4e4;
 text-align: center;
 font-size: 14px;
}
.cart_tools  .add_to_cart {
    color:#ffffff;
    background: #fe5252;
    padding: 6px 20px;
    text-decoration: none;
    border:1px solid #fe5252;
    transition: all .3s;
}
.cart_tools  .add_to_cart:hover {
    background: #ffffff;
    color:#fe5252;
}
.product_category_container {
  padding: 20px 0;
  font-family: 'Noto Sans TC', sans-serif;
}
.product_category_container span {
  font-size: 16px;
  font-family: inherit;
  letter-spacing: 1px;
}
.product_category_container a {
    text-decoration: none;
    color:#7e7e7e;
     font-family: inherit;
}
.soical_media_container {
  display: flex;
}
.soical_media_container a{
  width: 30px;
  height:30px;
  background-size: contain;
  margin-right: 15px;
  transition: all .3s;
}
.soical_media_container a:hover {
  opacity: 0.5;
}

/* ribbon */
   .ribbon {
     width: 140px;
     height: 140px;
     overflow: hidden;
     position: absolute;
     z-index: 99;
   }
   .ribbon::before,
   .ribbon::after {
      position: absolute;
      z-index: -1;
      content: '';
      display: block;
      border: 5px solid #fe5252;
    }
    .ribbon .ribbon_content {
      position: absolute;
      display: block;
      width: 225px;
      padding: 15px 0;
      background-color: #fe5252;
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      color: #fff;
      font: 700 18px/1 'Lato', sans-serif;
      text-shadow: 0 1px 1px rgba(0,0,0,.2);
      text-transform: uppercase;
      text-align: center;
     }
     .ribbon .ribbon_content .ribbon_border {
       padding: 10px 70px;
       border-bottom:1px solid #ffffff;
       border-top:1px solid #ffffff;
     }
/* top left*/
    .ribbon-top-left {
      top: 10px;
      left: 10px;
    }
    .ribbon-top-left::before,
    .ribbon-top-left::after {
      border-top-color: transparent;
      border-left-color: transparent;
    }
    .ribbon-top-left::before {
      top: 0;
      right: 0;
    }
    .ribbon-top-left::after {
      bottom: 0;
      left: 0;
    }
    .ribbon-top-left span {
      right: -25px;
      top: 30px;
      transform: rotate(-45deg);
}
</style>
