<template>
    <div class="Cart">
      <Header :text-dark="true"></Header>
      <div class="container wrapper">
          <ul class="time_line">
              <li class="step active">
                  <span class="circle">1</span>
                  <span class="text">確認訂單</span>
              </li>
              <li class="step">
                  <span class="circle">2</span>
                  <span class="text">確認資料</span>
              </li>
              <li class="step">
                  <span class="circle">3</span>
                  <span class="text">完成訂單</span>
              </li>
          </ul>
          <h3 class="list_title">購物車清單</h3>
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
      url: process.env.VUE_APP_API
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
  }
</style>
