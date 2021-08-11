<template>
  <div>
    <Header :text-dark="true"></Header>
    <div class="container wrapper">
      <div class="content">
        <div class="top_group">
          <div class="logo_bk">
            <h1 class="logo">B<span class="logo_accessory">&</span>E</h1>
            <span class="sub_title">The best for everyone</span>
          </div>
          <div class="img_bk">
            <div>
              <img src="https://i.imgur.com/x6hg5tY.jpg" />
            </div>
          </div>
        </div>
        <div class="footer_group">
          <p>
            B&E成立於2021年，適逢新型冠狀病毒在全世界蔓延，百業蕭條的時候，B&E不畏懼逆境，五月在網路平台完成展店。<br />
            B&E現主要販售項目為男女衣服及少量飾品，而預計未來會再擴展到鞋類等，也歡迎各類品牌廠商洽詢合作。
          </p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
export default {
  components: {
    Header, Footer
  }
}
</script>

<style scoped>
  .wrapper {
      padding-top: 75px;
      margin-bottom: 75px;
      font-family: 'Noto Sans TC', sans-serif;
  }
  .content {
      width: 60%;
      margin: 0 20%;
  }
  .content .top_group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  }
  .content .top_group .logo_bk {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }
  .logo {
    font-family:'Sriracha',handwriting;
    color:#fe5252;
    margin-bottom:0;
    font-size: 48px;
  }
  .logo_accessory {
    font-size: 24px;
    margin: 0 2px;
  }
  .sub_title {
    font-size: 14px;
    font-family:'Sriracha',handwriting;
    margin-bottom: 20px;
    color:#000000;
  }
  .top_group > div {
      width: 50%;
  }
  .top_group .img_bk img {
      width: 100%;
  }
  .footer_group p {
      font-size: 18px;
      line-height: 28px;
      letter-spacing: 1px;
      text-align: left;
  }
</style>
