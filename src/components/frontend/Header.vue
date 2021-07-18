<template>
     <div class="header container">
        <h1 class="logo">B<span class="logo_accessory">&</span>E</h1>
        <span class="sub_title">The best for everyone</span>
        <ul class="header_menu" :class="{ 'text-dark' : textDark }">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/shop/all">Shop</router-link>
          </li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
</template>

<script>
export default {
  props: {
    textDark: Boolean
  },
  data () {
    return {
      // text_dark: false
    }
  }
}
</script>

<style scoped>
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
   .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .header .header_menu {
    display: flex;
    margin:0;
    padding:0;
  }
  .header .header_menu li{
    list-style: none;
    padding: 0 20px;
    color:#ffffff;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
  }
   .header .header_menu.text-dark li {
    color:#000000;
  }
  .header .header_menu li a {
    font-family: inherit;
    color:inherit;
    text-decoration: none;
    letter-spacing: inherit;
    font-size: inherit;
  }
</style>
