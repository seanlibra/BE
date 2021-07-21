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
                  <span class="text">確認資料</span>
              </li>
              <li class="step">
                  <span class="circle">3</span>
                  <span class="text">完成訂單</span>
              </li>
          </ul>
          <h3 class="list_title">填寫詳細資料</h3>
                <Form class="ckeckout_form" ref="form" v-slot="{ errors }" @submit="onSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">姓名</label>
                    <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
<error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                   <!-- <input type="email" class="form-control" id="email" placeholder="example@example.com"> -->
                   <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入Email" rules="email|required" v-model="form.user.email"></Field>
<error-message name="email" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">電話</label>
                    <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話號碼" rules="min:8" v-model="form.user.tel"></Field>
<error-message name="電話" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">地址</label>
                    <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">訊息</label>
                    <textarea type="text" class="form-control" id="message" placeholder="" row="5" v-model="message"></textarea>
                </div>
                <div class="mb-3 text-center">
                    <button class="submit_btn" type="submit" :class="{ 'btn-disabled' : !has_cart }">送出訂單</button>
                </div>
            </Form>
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
      message: ''
    }
  },
  methods: {
    getCartList () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/cart`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.list = res.data.data.carts
            // vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    submit_order () {
      var vm = this
      vm.$store.commit('startLoading', true)
      var readyToOrder = { data: vm.form, message: vm.message }
      vm.$http.post(`${vm.url}/api/${vm.path}/order`, readyToOrder)
        .then(function (res) {
          if (res.data.success) {
            console.log(res)
            vm.getCartList()
            alert(res.data.message)
            vm.$refs.form.resetForm()
          } else {
            console.log(res)
            vm.$store.commit('startLoading', false)
          }
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
  }
}
</script>

<style scoped>
  .wrapper {
    /* display: flex; */
    padding:75px 0;
  }
  .time_line {
    display: flex;
    justify-content: center;
    margin: 0;
    margin-bottom: 50px;
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
  .list_title {
      text-align: center;
      margin-bottom: 50px;
  }
  .ckeckout_form {
      border:1px solid #e4e4e4;
      padding: 5%;
  }
  .ckeckout_form .submit_btn {
      background: #fe5252;
      border:1px solid #fe5252;
      color:#ffffff;
      padding:8px 24px;
      transition: all .3s;
  }
  .ckeckout_form .submit_btn:hover {
      background: #ffffff;
      color:#fe5252;
  }
</style>
