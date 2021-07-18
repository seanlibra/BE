<template>
    <div class="single_product">
        <Header text-dark="true"></Header>
        <div class="wrapper container">
        <Sidebar></Sidebar>
        <div class="content">
            <div class="product_detail">
                <div class="left_group">
                    <img class="product_img" :src="product.imageUrl">
                </div>
                <div class="right_group">
                    <h2 class="product_title">{{product.title}}</h2>
                    <div class="price_wrapper">
                        <span v-if="product.price !== product.origin_price" class="origin_price">${{product.origin_price}}</span>
                        <span class="onsale_price">${{product.price}}</span>
                    </div>
                    <div class="description">
                        告言牛幫衣相，北行里詞那喝，你得刃停筆安內申或能許高大！結巾春兄紅高禾葉別昌尺頁。用今犬眼浪左主月至，抓色神者音年頁波人同急村叫道飽麻子定，朱麼拍；了個喝。

那陽姐長即父和東綠鼻流着即止童對，海秋夕開休哪目入發拉兌笑麻請刃，聲肖馬買許心的，都要喜位牛都；壯那肖地己定蛋乙沒流祖嗎抱？寸婆由愛支蝶打記親雲反斥眼工，個土根內但多路田六娘山說抱木抱花。
                    </div>
                    <div class="cart_tools">
                        <div class="inner_container">
                            <div class="counter">
                                <button @click="count--">-</button>
                                <input min="1" max="99" type="number" v-model="count">
                                <button @click="count++">+</button>
                            </div>
                            <a class="add_to_cart" href="#">加入購物車</a>
                        </div>
                    </div>
                    <div class="product_category_container">
                        <span>商品分類: </span>
                        <router-link :to="`/shop/${product.category}`">{{product.category}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer.vue'
import Sidebar from '@/components/frontend/Sidebar.vue'

export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      product: {},
      count: 1
    }
  },
  methods: {
    getProductDetail () {
      var vm = this
      var id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/product/${id}`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.product = res.data.product
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
  components: {
    Header, Footer, Sidebar
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
</style>
