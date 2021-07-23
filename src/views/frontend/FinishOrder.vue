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
          <div class="order_container">
            <div class="order">
              <h3 class="order_id">您的訂單編號:{{order.id}}</h3>
              <div class="order_detail">
                <div class="user_info_item">
                  <div class="key">姓名:</div>
                  <div class="name">{{order.user.name}}</div>
                </div>
               <div class="user_info_item">
                  <div class="key">電子郵件:</div>
                  <div class="name">{{order.user.email}}</div>
                </div>
               <div class="user_info_item">
                  <div class="key">電話:</div>
                  <div class="name">{{order.user.tel}}</div>
                </div>
               <div class="user_info_item">
                  <div class="key">地址:</div>
                  <div class="name">{{order.user.address}}</div>
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
                <a @click.prevent="payOrder" class="pay_btn" v-if="!order.is_paid" href="#">一鍵自動付款</a>
                <span v-else class="pay_done">付款完成</span>
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
      var vm = this
      var id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/order/${id}`)
        .then(function (res) {
          if (res.data.success) {
            vm.$store.commit('startLoading', false)
            vm.order = res.data.order
          } else {
            console.log(res)
            vm.$store.commit('startLoading', false)
          }
        })
    },
    payOrder () {
      var vm = this
      var id = vm.order.id
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/${vm.path}/pay/${id}`)
        .then(function (res) {
          if (res.data.success) {
            console.log(res)
            vm.$store.commit('startLoading', false)
            vm.getOrder()
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
  },
  created () {
    this.getOrder()
  }
}
</script>

<style scoped>
  .wrapper {
    /* display: flex; */
    padding-top:75px;
    padding-bottom: 75px;
    font-family: 'Noto Sans TC', sans-serif;
  }
  .time_line {
    display: flex;
    justify-content: center;
    margin: 0;
    margin-bottom: 50px;
    padding:0;
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
      font-size: 36px;
      letter-spacing: 1px;
      margin-bottom: 30px;
      font-weight: bold;
  }
  .order_container {
    display: flex;
    justify-content: center;
  }
  .order {
    margin-top: 30px;
    background: #ffefea;
    width:40%;
    padding: 20px;
  }
  .order_id {
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
  }
  .order_detail .user_info_item {
    display: flex;
    padding: 10px 0;
    border-bottom:1px solid  #1a1a1a
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
      border:1px solid #fe5252;
      color:#ffffff;
      padding:8px 24px;
      transition: all .3s;
      text-decoration: none;
      letter-spacing: 1px;
   }
   .pay_action_container .pay_btn:hover {
     background: transparent;
     color:#fe5252;
   }
   .pay_done {
     background: #198754;
     padding:8px 24px;
     color:#ffffff;
   }
   @media(max-width:768px) {
    .time_line .step {
      margin: 0 25px;
    }
    .order {
      background: #ffefea;
      width:60%;
      padding: 20px;
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
    .order_detail_block .order {
      padding:0px;
    }
    .list_title {
      font-size: 24px;
      font-weight: bold;
    }
    .order {
      width:100%;
    }
   }
   @media(max-width:375px) {
    .time_line {
      display: none;
    }
   }
</style>
