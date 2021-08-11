<template>
  <div class="checkout">
    <Header :text-dark="true"></Header>
    <div class="container wrapper">
      <ul class="time_line">
        <li class="step">
          <span class="circle">1</span>
          <span class="text">確認訂單</span>
        </li>
        <li class="step active">
          <span class="circle">2</span>
          <span class="text">填寫資料</span>
        </li>
        <li class="step">
          <span class="circle">3</span>
          <span class="text">完成訂單</span>
        </li>
      </ul>
      <h3 class="list_title">填寫詳細資料</h3>
      <div class="content">
        <div class="client_info_block">
          <Form
            class="ckeckout_form"
            ref="form"
            v-slot="{ errors }"
            @submit="submit_order"
          >
            <div class="mb-3">
              <label for="name" class="form-label">姓名</label>
              <Field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></Field>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入Email"
                rules="email|required"
                v-model="form.user.email"
              ></Field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">電話</label>
              <Field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話號碼"
                rules="min:8"
                v-model="form.user.tel"
              ></Field>
              <error-message
                name="電話"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">地址</label>
              <Field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              ></Field>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">訊息</label>
              <textarea
                type="text"
                class="form-control"
                id="message"
                placeholder=""
                row="5"
                v-model="message"
              ></textarea>
            </div>
            <div class="mb-3 text-center">
              <button class="submit_btn" type="submit">送出訂單</button>
            </div>
          </Form>
        </div>
        <div class="order_detail_block">
          <div class="order">
            <h3 class="order_title">訂單內容</h3>
            <table class="order_table">
              <tbody>
                <tr v-for="item in cartList" :key="item.id">
                  <td>
                    <img class="thumbnail" :src="item.product.imageUrl" />
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
            <div class="order_total_container">
              <span>總計：</span>
              <div class="price_container">
                <span
                  :class="{
                    coupon_yes:
                      cart_info.data.total !== cart_info.data.final_total,
                  }"
                  class="total"
                  >$NT {{ cart_info.data.total }}</span
                >
                <span
                  class="final_total"
                  v-if="cart_info.data.total !== cart_info.data.final_total"
                  >$NT {{ Math.floor(cart_info.data.final_total) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading"></Loading>
    <Footer></Footer>
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        }
      },
      cart_info: {
        data: {
          total: 0
        }
      },
      message: '',
      cartList: []
    }
  },
  methods: {
    getCartList () {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/cart`)
        .then(function (res) {
          if (res.data.success) {
            vm.cartList = res.data.data.carts
            vm.cart_info = res.data
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    submit_order () {
      const vm = this
      vm.$store.commit('startLoading', true)
      const readyToOrder = { data: vm.form, message: vm.message }
      vm.$http.post(`${vm.url}/api/${vm.path}/order`, readyToOrder)
        .then(function (res) {
          if (res.data.success) {
            const id = res.data.orderId
            vm.$router.push(`/finishorder/${id}`)
            // vm.$refs.form.resetForm()
          } else {
            console.log(res)
            vm.$store.commit('startLoading', false)
          }
        })
    }
  },
  created () {
    this.getCartList()
  },
  components: {
    Header, Footer, Loading
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
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
.ckeckout_form {
  border: 1px solid #e4e4e4;
  padding: 5%;
}
.ckeckout_form .submit_btn {
  background: #fe5252;
  border: 1px solid #fe5252;
  color: #ffffff;
  padding: 8px 24px;
  transition: all 0.3s;
}
.ckeckout_form .submit_btn:hover {
  background: #ffffff;
  color: #fe5252;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10%;
}
.client_info_block {
  width: 48%;
  margin: 0 1%;
}
.order_detail_block {
  width: 48%;
  margin: 0 1%;
  background: #ffefea;
  padding: 15px;
}
.order_title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
}
.order_detail_block .order {
  /* border:1px solid #e4e4e4; */
  padding: 20px;
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
.total_container {
  border-top: 2px solid #1a1a1a;
}
.product_unit {
  font-size: 14px;
}
.product_unit .qty {
  margin-right: 5px;
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
/* .total_coupon_container .total {
    text-decoration: line-through;
  } */
.total_coupon_container .total.coupon_yes {
  text-decoration: line-through;
}
.product_total_container .final_total {
  font-size: 14px;
}
.order_total_container {
  border-top: 1px solid #000000;
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px 0;
}
.price_container {
  display: flex;
  flex-direction: column;
}
.price_container .coupon_yes {
  text-decoration: line-through;
  color: #e4e4e4;
}
.price_container .final_total {
  font-weight: bold;
}
@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
  }
  .client_info_block {
    width: 100%;
  }
  .order_detail_block {
    width: 100%;
    margin-bottom: 30px;
  }
  .time_line .step {
    margin: 0 25px;
  }
  .content {
    padding: 0;
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
}
@media (max-width: 375px) {
  .time_line {
    display: none;
  }
}
</style>
