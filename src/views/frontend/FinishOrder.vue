<template>
  <div class="finish_order">
    <Header :text-dark="true"></Header>
    <div class="container wrapper">
      <ul class="time_line">
        <li class="step">
          <span class="circle">1</span>
          <span class="text">確認訂單</span>
        </li>
        <li class="step">
          <span class="circle">2</span>
          <span class="text">填寫資料</span>
        </li>
        <li class="step active">
          <span class="circle">3</span>
          <span class="text">完成訂單</span>
        </li>
      </ul>
      <h3 class="list_title">完成訂單</h3>
      <div class="is_paid_alert" v-if="order.is_paid"><span>付款成功！感謝您的訂購</span><span class="material-icons">
sentiment_satisfied_alt
</span></div>
      <div class="order_container">
        <div class="order">
          <h3 class="order_id">
            <span>您的訂單編號:</span>
            <span>{{ order.id }}</span>
          </h3>
          <div class="order_detail">
            <div class="user_info_item">
              <div class="key">姓名:</div>
              <div class="name">{{ order.user.name }}</div>
            </div>
            <div class="user_info_item">
              <div class="key">電子郵件:</div>
              <div class="name">{{ order.user.email }}</div>
            </div>
            <div class="user_info_item">
              <div class="key">電話:</div>
              <div class="name">{{ order.user.tel }}</div>
            </div>
            <div class="user_info_item">
              <div class="key">地址:</div>
              <div class="name">{{ order.user.address }}</div>
            </div>
            <div class="user_info_item">
              <div class="key">付款狀態:</div>
              <div class="name">
                <span v-if="!order.is_paid" class="text-danger">未付款</span>
                <span v-else class="text-success">已付款</span>
              </div>
            </div>
          </div>
          <div class="pay_action_container">
            <a
              @click.prevent="payOrder"
              class="pay_btn"
              v-if="!order.is_paid"
              href="#"
              >一鍵自動付款</a
            >
            <div v-else>
              <router-link class="back_to_home" to="/shop/all">繼續選購</router-link>
            </div>
          </div>
        </div>
      </div>
            <div class="order_product_detail">
      <h3 class="order_products_title">以下是您的訂單明細</h3>
      <div class="table_scroll_bar_container">
      <table class="order_table">
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>
              <img
                class="thumbnail"
                :src="item.product.imageUrl"
                alt="商品圖片"
              />
            </td>
            <td>
              <div class="product_title">
                {{ item.product.title }}
              </div>
            </td>
            <td>
              <div class="product_unit">
                <span class="qty">{{ item.qty }}</span>
                <span class="unit">{{ item.product.unit }}</span>
              </div>
            </td>
            <td>
              <span class="standard">{{ item.standard }}</span>
            </td>
            <td>
              <div class="product_total_container">
                <div class="total_coupon_container">
                  <span :class="{ coupon_yes: item.coupon }" class="total"
                    >$NT {{ item.total }}</span
                  >
                  <span v-if="item.coupon" class="coupon text-success">
                    {{ 100 - item.coupon.percent }}% off</span
                  >
                </div>
                <div v-if="item.coupon" class="final_total">
                  $NT {{ Math.floor(item.final_total) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
            <div class="order_total_container">
              <span>總計：</span>
              <span
                  class="final_total"
                  >$NT {{ Math.floor(order.total) }}</span>
            </div>
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
      bubbleText: '',
      order: {
        user: {
          name: '',
          email: '',
          address: '',
          tel: ''
        },
        is_paid: false
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then(res => {
          if (res.data.success) {
            if (res.data.order) {
              vm.order = res.data.order
            } else {
              vm.$router.push('/')
            }
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
    },
    payOrder () {
      const vm = this
      const id = vm.order.id
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then(res => {
          if (res.data.success) {
            vm.bubbleText = res.data.message
            vm.$refs.bubble.bubbleACtive()
            vm.getOrder()
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
  components: {
    Header, Footer, Loading
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style scoped>
.wrapper {
  padding-top: 75px;
  padding-bottom: 75px;
  font-family: "Noto Sans TC", sans-serif;
}
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
  color: #1a1a1a;
  margin: 0 50px;
  padding: 15px 30px;
  display: flex;
  position: relative;
}
.time_line .step::before {
  content: "";
  left: -20px;
  border-top: 30px solid #e9e9e9;
  border-bottom: 25px solid #e9e9e9;
  border-left: 20px solid transparent;
  position: absolute;
  top: 0;
  height: 0;
  width: 0;
}
.time_line .step::after {
  content: "";
  right: -20px;
  border-top: 30px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #e9e9e9;
  border-right-color: #e9e9e9;
  position: absolute;
  top: 0;
  height: 0;
  width: 0;
}
.time_line .step.active::before {
  border-top: 30px solid #fe5252;
  border-bottom: 25px solid #fe5252;
  border-left: 20px solid transparent;
}
.time_line .step.active::after {
  border-top: 30px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #fe5252;
  border-right-color: #fe5252;
}
.time_line .step .circle {
  border: 2px solid #1a1a1a;
  background: #ffffff;
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  line-height: 15px;
}
.time_line .step.active {
  background: #fe5252;
}
.time_line .step.active .text {
  color: #ffffff;
}
.time_line .step .text {
  letter-spacing: 1px;
}
.list_title {
  text-align: center;
  font-size: 36px;
  letter-spacing: 1px;
  margin-bottom: 30px;
  font-weight: bold;
}
.is_paid_alert {
  background: #d1e7dd;
  color:#0f5132;
  padding: 30px;
  font-size: 24px;
  letter-spacing: 1px;
  width:50%;
  margin: 0 25%;
  display: flex;
  align-items: center;
}
.is_paid_alert span {
  margin-right: 10px;
}
.order_product_detail {
  width: 50%;
  margin: 0 1%;
  background: #ffefea;
  padding: 15px;
  margin: 0 25%;
  margin-top: 30px;
}
.order_table {
  width: 100%;
}
.order_table .thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.order_table .product_title {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}
.order_table td {
  padding: 5px;
}
.product_total_container {
  display: flex;
  align-items: center;
}
.total_coupon_container {
  display: flex;
  flex-direction: column;
  width: 85px;
  font-size: 14px;
  margin-right: 10px;
}
.total_coupon_container .total.coupon_yes {
  text-decoration: line-through;
}
.product_total_container .final_total {
  font-size: 14px;
}
.order_products_title {
  font-size: 24px;
  color:#000000;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.order_total_container {
  display: flex;
  margin-top: 20px;
  border-top:1px solid #000000;
  justify-content: flex-end;
}
.order_total_container span {
  letter-spacing: 1px;
  margin: 15px 0;
}
.order_container {
  display: flex;
  justify-content: center;
}
.order {
  margin-top: 30px;
  background: #ffefea;
  width: 50%;
  padding: 20px;
}
.order_id {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.order_detail .user_info_item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #1a1a1a;
}
.order_detail .user_info_item:last-child {
  border-bottom: 0;
}
.order_detail .user_info_item .key {
  width: 100px;
}
.pay_action_container {
  text-align: center;
  margin-top: 30px;
}
.pay_action_container .pay_btn {
  background: #fe5252;
  border: 1px solid #fe5252;
  color: #ffffff;
  padding: 8px 24px;
  transition: all 0.3s;
  text-decoration: none;
  letter-spacing: 1px;
  width: 100%;
  display: block;
  border-radius: 5px;
}
.pay_action_container .pay_btn:hover {
  background: transparent;
  color: #fe5252;
}
.pay_done {
  background: #198754;
  padding: 8px 24px;
  color: #ffffff;
  margin-right: 15px;
}
.back_to_home {
  background: #fe5252;
  color: #ffffff;
  border:1px solid #fe5252;
  padding: 7px 24px;
  transition: all 0.3s;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all .3s;
  width: 100%;
  display: block;
  border-radius: 5px;
}
.back_to_home:hover {
  background: transparent;
  color:#fe5252;
}
@media(max-width:1024px) {
  .is_paid_alert , .order , .order_product_detail {
    width: 75%;
    margin: 0 12.5% 5% 12.5%;
  }
}
@media (max-width: 768px) {
  .time_line .step {
    margin: 0 25px;
  }
}
@media (max-width: 414px) {
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
    padding: 17px 10px;
  }
  .order_detail_block .order {
    padding: 0px;
  }
  .list_title {
    font-size: 24px;
    font-weight: bold;
  }
  .is_paid_alert , .order , .order_product_detail {
    width: 100%;
    margin: 5% 0;
  }
  .is_paid_alert {
    font-size: 18px;
  }
  .order_id {
    font-size: 18px;
  }
  .order_products_title {
    font-size: 18px;
  }
  .table_scroll_bar_container {
    overflow-x: scroll;
    width: 100%;
    padding: 20px 0;
  }
  .order_table {
    min-width: 600px;
  }
  .is_paid_alert {
    padding: 20px;
  }
}
@media (max-width: 375px) {
  .time_line {
    display: none;
  }
  .order_id span {
    margin: 5px 0;
  }
  .order_id {
    display: flex;
    flex-direction: column;
  }
}
</style>
