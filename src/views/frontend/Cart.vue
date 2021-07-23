<template>
    <div class="Cart">
      <Header :update-Cart="cartUpdteTrigger" :text-dark="true"></Header>
      <div class="container wrapper">
            <ul class="time_line">
              <li class="step active">
                  <span class="circle">1</span>
                  <span class="text">確認訂單</span>
              </li>
              <li class="step">
                  <span class="circle">2</span>
                  <span class="text">填寫資料</span>
              </li>
              <li class="step">
                  <span class="circle">3</span>
                  <span class="text">完成訂單</span>
              </li>
          </ul>
          <h3 class="list_title">購物車清單</h3>
          <div class="table_scroll_bar_container">
            <table class="cart_list_table">
                <thead>
                    <tr>
                        <th></th>
                        <th>商品</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.id">
                        <td>
                            <div class="product_delete_container">
                            <a @click.prevent="deleteCartsItem(item)" href="#">
                                <span class="material-icons">close</span>
                            </a>
                            </div>
                        </td>
                        <td>
                            <div class="product_thumbnail">
                              <img :src="item.product.imageUrl">
                              <h3>{{item.product.title}}</h3>
                            </div>
                        </td>
                        <td>
                          NT$ {{item.product.price}}
                        </td>
                        <td>
                            <div class="product_qty">
                                  <button @click="updateCartItemQty(item,item.qty - 1 )">-</button>
                                  <input @blur="updateCartItemQty(item,item.qty)" min="1" max="99" type="number" v-model.number="item.qty">
                                  <button @click="updateCartItemQty(item,item.qty + 1)">+</button>
                            </div>
                        </td>
                        <td>
                          <div class="single_product_price_container">
                            <div class="single_origin_price">
                              <span :class="{ coupon_yes : item.coupon }" class="price">
                                NT$ {{item.total}}
                              </span>
                              <span v-if="item.coupon" class="coupon text-success"> {{100 - item.coupon.percent}}% off</span>
                            </div>
                            <div v-if="item.coupon"  class="single_final_price">
                              NT$ {{Math.floor(item.final_total)}}
                            </div>
                          </div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
            <div class="cart_total">
                <div class="coupon_container">
                    <input :class="{ coupon_active : coupon == 2 }" v-model="couponCode">
                    <a class="coupon_no" v-if="coupon == 0" @click.prevent="useCoupon" href="#">使用優惠券</a>
                    <a class="coupon_some" v-else-if="coupon == 1" @click.prevent="useCoupon" href="#">部分已套用優惠券</a>
                    <a class="coupon_yes" v-else @click.prevent="useCoupon" href="#">已套用優惠券</a>
                </div>
                <div class="total_num">
                    <span>總計：</span>
                    <div class="price_container">
                        <span :class="{ coupon_yes : cart_info.data.total !== cart_info.data.final_total }" class="total">$NT {{cart_info.data.total}}</span>
                        <span class="final_total" v-if="cart_info.data.total !== cart_info.data.final_total">$NT {{ Math.floor(cart_info.data.final_total)}}</span>
                    </div>
                </div>
            </div>
            <div class="go_checkout">
                <router-link  v-if="list.length > 0" to="/checkout">前往填寫資料</router-link>
            </div>
      </div>
      <Loading v-if="loading"></Loading>
      <Footer></Footer>
      <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
    </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
import Loading from '@/components/Loading.vue'

export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      list: [],
      cart_info: {
        data: {
          total: 0
        }
      },
      couponCode: '',
      coupon: 0,
      cartUpdteTrigger: false,
      bubbleText: ''
    }
  },
  methods: {
    getCartList () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/cart`)
        .then(function (res) {
          if (res.data.success) {
            vm.list = res.data.data.carts
            vm.cart_info = res.data
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    },
    deleteCartsItem (item) {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.delete(`${vm.url}/api/${vm.path}/cart/${item.id}`)
        .then(function (res) {
          if (res.data.success) {
            vm.getCartList()
            vm.$store.commit('startLoading', false)
            vm.bubbleText = res.data.message
            vm.$refs.bubble.bubbleACtive()
            vm.cartUpdteTrigger = !vm.cartUpdteTrigger
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    },
    updateCartItemQty (item, count) {
      var vm = this
      vm.$store.commit('startLoading', true)
      var readyForUpdate = { data: { product_id: item.id, qty: count } }
      vm.$http.put(`${vm.url}/api/${vm.path}/cart/${item.id}`, readyForUpdate)
        .then(function (res) {
          if (res.data.success) {
            vm.getCartList()
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
    },
    useCoupon () {
      var vm = this
      var coupon = { data: { code: vm.couponCode } }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/${vm.path}/coupon`, coupon)
        .then(function (res) {
          if (res.data.success) {
            vm.getCartList()
            vm.bubbleText = res.data.message
            vm.$store.commit('startLoading', false)
            vm.$refs.bubble.bubbleACtive()
            vm.cartUpdteTrigger = !vm.cartUpdteTrigger
            vm.coupon = true
          } else {
            vm.bubbleText = res.data.message
            vm.$store.commit('startLoading', false)
            vm.$refs.bubble.bubbleACtive()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  components: {
    Header, Footer, Loading
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  watch: {
    list () {
      var CheckArray = [...this.list]
      var isSomeCoupon = CheckArray.some(el => el.coupon)
      if (isSomeCoupon) {
        var isAllcopon = CheckArray.every(el => el.coupon)
        if (isAllcopon) {
          this.coupon = 2
        } else {
          this.coupon = 1
        }
      } else {
        this.coupon = 0
      }
    }
  },
  created () {
    this.getCartList()
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
    /* display: flex; */
    padding-top:75px;
    padding-bottom:75px;
    font-family: 'Noto Sans TC', sans-serif;
  }
  .list_title {
      text-align: center;
      font-size: 36px;
      letter-spacing: 1px;
      margin-bottom: 30px;
      font-weight: bold;
  }
  /*timeline*/
  .time_line {
    display: flex;
    justify-content: center;
    margin: 0;
    margin-bottom: 50px;
    padding: 0;
    /* width:100%; */
  }
  .time_line .step {
    list-style: none;
    background: #e9e9e9;
    color:#1a1a1a;
    margin: 0 50px;
    padding: 15px 30px;
    display: flex;
    position: relative;
  }
  .time_line .step::before {
      content:'';
      left:-20px;
      border-top: 30px solid #e9e9e9;
      border-bottom: 25px solid #e9e9e9;
      border-left:20px solid transparent;
      position: absolute;
      top:0;
      height:0;
      width:0;
  }
  .time_line .step::after {
     content:'';
     right:-20px;
     border-top:30px solid transparent;
     border-bottom: 25px solid transparent;
     border-left:20px solid #e9e9e9;
     border-right-color:#e9e9e9;
     position: absolute;
     top:0;
     height:0;
     width:0;
  }
  .time_line .step.active::before {
      border-top: 30px solid #fe5252;
      border-bottom: 25px solid #fe5252;
      border-left:20px solid transparent;
  }
  .time_line .step.active::after {
     border-top:30px solid transparent;
     border-bottom: 25px solid transparent;
     border-left:20px solid #fe5252;
     border-right-color:#fe5252;
  }
  .time_line .step .circle {
      border:2px solid #1a1a1a;
      background: #ffffff;
      display: flex;
      width: 25px;
      height:25px;
      border-radius: 50%;
      text-align: center;
      margin-right: 10px;
      align-items: center;
      justify-content: center;
  }
  .time_line .step.active {
      background: #fe5252;
  }
  .time_line .step.active .text {
      color:#ffffff;
  }
  .time_line .step .text {
      letter-spacing: 1px;
  }
  .cart_list_table {
      width: 100%;
  }
  .cart_list_table td , .cart_list_table th {
      padding: 10px;
  }
  .cart_list_table thead tr {
      background: #f7f7f7;
      border:1px solid #e9e9e9;
  }
  .cart_list_table tbody tr {
      border-left:1px solid #e9e9e9;
      border-right:1px solid #e9e9e9;
      border-bottom:1px solid #e9e9e9;
  }
  .product_delete_container {
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .product_delete_container a {
      border:2px solid #fe5252;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height:30px;
      border-radius: 50%;
      text-decoration: none;
      transition: all .3s;
  }
  .product_delete_container a span {
      color:#fe5252;
      font-size: 18px;
      transition: all .3s;
  }
  .product_delete_container a:hover {
      background: #fe5252;
  }
   .product_delete_container a:hover span {
       color:#ffffff;
   }
  .product_thumbnail {
      display: flex;
      align-items: center;
  }
  .product_thumbnail img{
      width:75px;
      height:75px;
      object-fit: cover;
      margin-right: 30px;
  }
  .product_thumbnail h3 {
      font-size: 18px;
      letter-spacing: 1px;
  }
  .product_qty {
    display: flex;
    margin-right: 15px;
  }

  .product_qty button{
  /* display: block; */
    width: 36px;
    height:36px;
    border:1px solid #e4e4e4;
    background: #ffffff;
  }
  .product_qty  input {
     width: 36px;
     height:36px;
     border:0;
     border-top:1px solid #e4e4e4;
     border-bottom:1px solid #e4e4e4;
     text-align: center;
     font-size: 14px;
}
  .single_product_price_container {
    display: flex;
    align-items: center;
  }
  .single_origin_price {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  .single_origin_price .price {
    font-weight: bold;
  }
  .single_origin_price .price.coupon_yes {
    text-decoration: line-through;
    color:#e9e9e9;
    min-width: 75px;
  }
  .single_origin_price .coupon {
    color:#198754;
    font-size:14px;
    font-weight: bold;
  }
  .single_final_price {
    font-weight: bold;
  }
  .cart_total {
      border-left:1px solid #e4e4e4;
      border-right:1px solid #e4e4e4;
      border-bottom:1px solid #e4e4e4;
      padding: 16px;
      margin-bottom: 20px;
      padding-right: 50px;
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      align-items: center;
  }
  .coupon_container {
      margin-right: 20px;
  }
  .coupon_container a {
      background: #fe5252;
      color:#ffffff;
      text-decoration: none;
      padding:10px 24px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
  }
    .coupon_container a.coupon_yes {
      background: #28a745;
      opacity: 0.7;
      color:#ffffff;
      text-decoration: none;
      padding:10px 24px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      pointer-events: none;
  }
    .coupon_container a.coupon_some {
      background: #ffc107;
      color:#ffffff;
      text-decoration: none;
      padding:10px 24px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
  }
  .coupon_container input {
      padding: 6px 10px;
      border:1px solid #e4e4e4;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
  }
  .coupon_container input.coupon_active {
      opacity: 0.7;
      pointer-events: none;
  }
  .go_checkout {
      padding:12px;
      padding-right: 0;
      text-align: right;
  }
  .go_checkout a{
      padding:10px 24px;
      background: #fe5252;
      color:#ffffff;
      text-decoration: none;
      letter-spacing: 1px;
      border:1px solid #fe5252;
      transition: all .3s;
      /* border-radius: 10px; */
  }
  .go_checkout a:hover {
      color:#fe5252;
      background: #ffffff;
  }
  .total_num {
      display: flex;
      align-items: center;
  }
  .price_container {
      display: flex;
      flex-direction: column;
  }
  .price_container .coupon_yes {
      text-decoration: line-through;
      color:#e4e4e4;
  }
  .price_container .final_total {
    font-weight: bold;
  }
  @media(max-width:768px) {
    .time_line .step {
      margin: 0 25px;
    }
  }
  @media(max-width:414px) {
    .wrapper {
      padding-top: 35px;
      padding-bottom: 35px;
    }
    .time_line .step {
      margin: 0 5px;
    }
    .time_line .step .circle {
      display: none;
    }
    .time_line .step {
      margin: 0 25px;
      font-size: 14px;
      padding:17px 10px;
    }
    .list_title {
      font-size: 24px;
      font-weight: bold;
    }
    .table_scroll_bar_container {
      overflow-x: scroll;
      width:100%
    }
    .coupon_container {
      margin-right: 0;
    }
    .cart_total {
      padding-right: 20px;
    }
    .total_num {
      margin-top: 20px;
    }
    .product_thumbnail img {
      margin-right: 15px;
    }
    .product_thumbnail h3 {
      font-size: 14px;
      line-height: 18px;
    }
    .coupon_container a{
      padding:9px 10px;
      width: 50%;
    }
    .coupon_container input {
      width: 50%;
    }
  }
  @media(max-width:375px) {
    .time_line {
      display: none;
    }
  }
</style>
