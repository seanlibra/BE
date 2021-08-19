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
                <span class="ribbon_border">{{ product.onsale }}</span>
              </span>
            </div>
            <!-- ---------------------------------------- -->
            <swiper
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }"
              :spaceBetween="10"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              class="swiper_show_img"
            >
              <swiper-slide>
                <img :src="product.imageUrl" alt="商品預設圖" />
              </swiper-slide>
              <swiper-slide
                v-for="(item, index) in product.imagesUrl"
                :key="index"
              >
                <img :src="item" :alt="`商品圖片${index + 1}`" />
              </swiper-slide>
            </swiper>
            <!-- ---------------------------------- -->
            <swiper
              @swiper="setThumbsSwiper"
              :spaceBetween="10"
              :slidesPerView="4"
              :freeMode="true"
              :watchSlidesVisibility="true"
              :watchSlidesProgress="true"
              class="swiper_thumb"
            >
              <swiper-slide>
                <img :src="product.imageUrl" alt="商品預設圖" />
              </swiper-slide>
              <swiper-slide
                v-for="(item, index) in product.imagesUrl"
                :key="index"
              >
                <img :src="item" :alt="`商品圖片${index + 1}`" />
              </swiper-slide>
            </swiper>
          </div>
          <div class="right_group">
            <h2 class="product_title">{{ product.title }}</h2>
            <div class="price_wrapper">
              <span
                :class="{ normal: product.price == product.origin_price }"
                class="origin_price"
                >${{ product.origin_price }}</span
              >
              <span
                v-if="product.price !== product.origin_price"
                class="onsale_price"
                >${{ product.price }}</span
              >
            </div>
            <div v-html="product.content" class="description"></div>
            <div class="cart_tools">
              <div class="inner_container">
                <select v-model="standard">
                  <option value="">請選擇一個選項</option>
                  <option
                    v-for="standard in product.specifications"
                    :key="standard"
                    :value="standard"
                  >
                    {{ standard }}
                  </option>
                </select>
                <span :class="{ active: standardAlert }" class="standard_alert"
                  >請選擇一個尺寸</span
                >
              </div>
              <div class="inner_container">
                <div class="counter">
                  <button type="button" @click="count > 1 ? count-- : 1">
                    -
                  </button>
                  <input min="1" max="99" type="number" v-model="count" />
                  <button type="button" @click="count++">+</button>
                </div>
                <a @click.prevent="addToCart" class="add_to_cart" href="#"
                  >加入購物車</a
                >
              </div>
            </div>
            <div class="product_category_container">
              <span>商品分類: </span>
              <router-link :to="`/shop/${product.category}`">{{
                product.category
              }}</router-link>
            </div>
            <div class="soical_media_container">
              <a
                target="_blank"
                style="background-image: url('https://i.imgur.com/sUM6rZ1.png')"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
              ></a>
              <a
                target="_blank"
                style="background-image: url('https://i.imgur.com/rxHpEdl.png')"
                :href="`http://www.twitter.com/share?url=${pageUrl}`"
              ></a>
              <a
                target="_blank"
                style="background-image: url('https://i.imgur.com/i9i9Hpf.png')"
                :href="`https://t.me/share/url?url=${pageUrl}&text=hey! check this out`"
              ></a>
              <a
                target="_blank"
                style="background-image: url('https://i.imgur.com/mQ6bpWS.png')"
                :href="`https://api.whatsapp.com/send?text=${pageUrl}`"
              ></a>
              <a
                style="background-image: url('https://i.imgur.com/jMyZwmb.png')"
                href="#"
              ></a>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'

import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
SwiperCore.use([Navigation, Thumbs])

export default {
  data () {
    return {
      recentList: [],
      product: {
        on_sale: false
      },
      count: 1,
      cartUpdteTrigger: false,
      bubbleText: '',
      pageUrl: '',
      standard: '',
      standardAlert: false,
      thumbsSwiper: null
    }
  },
  methods: {
    getProductDetail () {
      const vm = this
      const id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          if (res.data.success) {
            vm.product = res.data.product
            vm.$store.commit('startLoading', false)
            vm.setRecent()
          } else {
            vm.$store.commit('startLoading', false)
            vm.bubbleText = res.data.message
            vm.$refs.bubble.bubbleACtive()
            setTimeout(() => {
              vm.$router.push('/shop/all')
            }, 3000)
          }
        })
        .catch(() => {
          vm.bubbleText = '連線錯誤'
          vm.$refs.bubble.bubbleACtive()
          vm.$store.commit('startLoading', false)
        })
    },
    addToCart () {
      const vm = this
      if (!vm.standard) {
        vm.standardAlert = true
      } else {
        const readyToAdd = { data: { product_id: vm.product.id, qty: vm.count, standard: vm.standard } }
        vm.$store.commit('startLoading', true)
        vm.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, readyToAdd)
          .then(res => {
            if (res.data.success) {
              vm.standardAlert = false
              vm.bubbleText = res.data.message
              vm.$refs.bubble.bubbleACtive()
              vm.cartUpdteTrigger = !vm.cartUpdteTrigger
              vm.$store.commit('startLoading', false)
            } else {
              vm.bubbleText = res.data.message
              vm.$refs.bubble.bubbleACtive()
              vm.$store.commit('startLoading', false)
            }
          })
          .catch(() => {
            vm.bubbleText = '連線錯誤'
            vm.$refs.bubble.bubbleACtive()
            vm.$store.commit('startLoading', false)
          })
      }
    },
    setRecent () {
      const recentList = [...this.recentList]
      const vm = this
      let exist = false
      recentList.forEach(item => {
        if (vm.product.id === item.id) {
          exist = true
        }
      })
      if (!exist) {
        recentList.push({ id: this.product.id, title: this.product.title, img: this.product.imageUrl, price: this.product.price, origin_price: this.product.origin_price })
        localStorage.setItem('be_product', JSON.stringify(recentList))
      }
    },
    getRecent () {
      const recentList = JSON.parse(localStorage.getItem('be_product')) || []
      if (recentList.length > 5) {
        recentList.splice(0, 1)
      }
      this.recentList = recentList
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    Header, Footer, Sidebar, Loading, Swiper, SwiperSlide
  },
  watch: {
    $route (to, from) {
      this.getProductDetail()
    }
  },
  created () {
    this.getProductDetail()
    this.pageUrl = document.location.href
    this.getRecent()
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
  padding-top:75px;
  padding-bottom: 75px;
  position: relative;
  flex-wrap: wrap;
  font-family: 'Noto Sans TC', sans-serif;
}
.content {
   width: 73%;
   margin: 0 1%;
}
.product_detail {
  display:flex;
  flex-wrap: wrap;
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
  margin:15px 0;
}
.cart_tools .inner_container select {
  padding:5px 15px;
  -webkit-appearance:none;
  box-shadow: inset 0 -1.4em 1em 0 rgb(0 0 0 / 2%);
  background-image: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right .25em top 50%;
  background-repeat:no-repeat;
  padding-right: 1.4em;
  background-size:auto 16px;
  font-size: 16px;
  border:1px solid #e4e4e4;
  width:200px;
  letter-spacing: 1px;
}
.cart_tools .counter {
  display: flex;
  margin-right: 15px;
}
.standard_alert {
  font-size: 14px;
  color:#fe5252;
  margin-left: 15px;
  opacity: 0;
  transition: all .3s;
}
.standard_alert.active {
  opacity: 1;
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
/* swiper */
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.swiper_show_img {
  height:650px;
}
.swiper_thumb {
  height: 120px;
  box-sizing: border-box;
  padding: 10px 0;
}

.swiper_thumb .swiper-slide {
  width: 25%;
  opacity: 0.4;
}
.swiper-slide img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.swiper_thumb .swiper-slide-thumb-active {
  opacity: 1;
}
@media(max-width:1024px) {
  .product_img {
    height:450px;
  }
}
@media (max-width:768px) {
  .wrapper {
    padding-top: 35px;
    flex-direction: column-reverse;
  }
  .content {
    width: 100%;
  }
  .product_detail > div {
    padding: 10px;
  }
  .product_img {
    height:350px;
  }
  .cart_tools .add_to_cart {
    padding: 6px 10px;
  }
}
@media(max-width:414px) {
  .wrapper {
    padding-top: 35px;
    padding-bottom: 35px;
  }
  .content {
    margin-bottom: 30px;
  }
  .product_detail > div {
    width: 100%;
  }
}
</style>
