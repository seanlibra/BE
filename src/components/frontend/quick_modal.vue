<template>
    <div class="quick_modal_wrapper" :class="{ active :quick_modal_show}">
      <div class="quick_modal" :class="{ active :quick_modal_show}">
          <div class="body">
                <div class="left_group">
                            <div class="ribbon ribbon-top-left" v-if="product.onsale">
                              <span class="ribbon_content">
                                <span class="ribbon_border">{{product.onsale}}</span>
                              </span>
                            </div>
                      <!-- ---------------------------------------- -->
                      <swiper :style="{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" class="swiper_show_img">
                      <swiper-slide>
                        <img :src="product.imageUrl" />
                      </swiper-slide>
                      <swiper-slide v-for="(item, index) in product.imagesUrl" :key="index">
                        <img :src="item" />
                      </swiper-slide>
                      </swiper>
                      <!-- ---------------------------------- -->
                      <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="true" :watchSlidesVisibility="true" :watchSlidesProgress="true" class="swiper_thumb">
                      <swiper-slide>
                        <img :src="product.imageUrl" />
                      </swiper-slide>
                      <swiper-slide v-for="(item, index) in product.imagesUrl" :key="index">
                        <img :src="item" />
                      </swiper-slide>
                  </swiper>
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
                         <div class="inner_container ">
                           <select v-model="standard">
                             <option value="">請選擇一個選項</option>
                             <option v-for="standard in product.specifications" :key="standard" :value="standard">{{standard}}</option>
                           </select>
                           <span :class="{ active : standardAlert }" class="standard_alert">請選擇一個尺寸</span>
                        </div>
                        <div class="inner_container">
                            <div class="counter">
                                <button type="button" @click="count > 1 ? count-- : 1">-</button>
                                <input min="1" max="99" type="number" v-model="count">
                                <button type="button" @click="count++">+</button>
                            </div>
                            <a @click.prevent="addToCart" class="add_to_cart" href="#">加入購物車</a>
                        </div>
                    </div>
                    <div class="product_category_container">
                        <span>商品分類: </span>
                        <router-link :to="`/shop/${product.category}`">{{product.category}}</router-link>
                    </div>
                </div>
                <a @click.prevent="hideModal" class="close_quick" href="#">
                    <span class="material-icons">close</span>
                </a>
            </div>
      </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'

import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
SwiperCore.use([Navigation, Thumbs])

export default {
  props: {
    product: Object
  },
  data () {
    return {
      quick_modal_show: false,
      standardAlert: false,
      count: 1,
      standard: ''
    }
  },
  methods: {
    openModal () {
      this.quick_modal_show = true
    },
    hideModal () {
      this.quick_modal_show = false
      this.standardAlert = false
      this.$emit('clean-quick')
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    addToCart () {
      const vm = this
      if (!vm.standard) {
        vm.standardAlert = true
      } else {
        const readyToAdd = { data: { product_id: vm.product.id, qty: vm.count, standard: vm.standard } }
        vm.$store.commit('startLoading', true)
        vm.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, readyToAdd)
          .then(function (res) {
            if (res.data.success) {
              vm.standardAlert = false
              vm.$store.commit('startLoading', false)
              vm.$emit('quick-bubble', res.data.message)
              vm.$emit('quick-carts')
            }
          })
          .catch(function (err) {
            alert(err)
            vm.$store.commit('startLoading', false)
          })
      }
    }
  },
  components: {
    Swiper, SwiperSlide
  }
}
</script>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] {
    -moz-appearance: textfield;
    }
    /* ribbon */
  .ribbon {
     width: 150px;
     height: 150px;
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
      width: 250px;
      padding: 15px 0;
      background-color: #fe5252;
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      color: #fff;
      font-size: 18px;
      letter-spacing: 1px;
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
      top: -10px;
      left: -10px;
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
     /* end ribbon */

     /* quick_modal */
    .quick_modal_wrapper {
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background-color: rgba(0,0,0,0.6);
      opacity: 0;
      transition: all .3s;
      pointer-events: none;
      z-index: 99;
    }
    .quick_modal_wrapper.active {
       opacity: 1;
       pointer-events: auto;
    }
    .quick_modal {
        width:900px;
        position: fixed;
        top:-150%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
        box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
        transition: all .5s;
    }
    .quick_modal.active {
        top:50%;
        z-index: 9;
    }
    .quick_modal .body {
      background: #ffffff;
      display: flex;
    }
    .quick_modal .body > div {
    width: 50%;
    padding: 20px;
    }
    .quick_modal .body .left_group {
    position: relative;
    }
    .quick_modal .body .right_group {
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
    .quick_modal .body .price_wrapper {
        margin-bottom: 30px;
    }
    .quick_modal .body .price_wrapper .origin_price{
    color:#7e7e7e;
    text-decoration: line-through;
    font-size: 18px;
    font-family:'Sriracha',handwriting;
    margin-right: 15px;
    }
    .quick_modal .body .price_wrapper .origin_price.normal {
    text-decoration: none;
    }
    .quick_modal .body .price_wrapper .onsale_price {
    color:#fe5252;
    font-size: 24px;
    font-family:'Sriracha',handwriting;
    }
    .quick_modal .body .description {
        letter-spacing: 1px;
        font-size: 16px;
        line-height: 26px;
        margin-bottom: 15px;
        flex-grow: 1;
    }
    .quick_modal .body .cart_tools {
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
    .close_quick {
        position: absolute;
        top:-30px;
        right:-30px;
        color:#ffffff;
    }
    .close_quick span {
        font-size: 30px;
    }
    /*end  quick_modal */
    /* swiper */
    .swiper-slide {
    background-size: cover;
    background-position: center;
    position: relative;
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

</style>
