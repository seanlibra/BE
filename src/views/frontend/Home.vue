<template>
  <div class="home">
    <div class="banner container-fluid py-2">
      <div class="overlay"></div>
      <Header></Header>
      <div class="container banner_content">
        <div class="banner_ad">
          <div class="ad_prefix">
            <span>B & E - S T Y L E</span>
          </div>
          <div class="ad_main">一生值得你擁有的款式</div>
          <div>
            <router-link to="/shop/all" class="ad_btn">立即選購</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="new_arrival">
      <h2 class="block_title text-center">New arrival</h2>
      <ul class="product_list container">
        <li v-for="item in arrival_list" :key="item.id">
          <div class="ribbon ribbon-top-left" v-if="item.onsale">
            <span class="ribbon_content">
              <span class="ribbon_border">{{item.onsale}}</span>
            </span>
          </div>
          <router-link class="product_thumbnail" :to="`/product/${item.id}`">
            <img :src="item.imageUrl" alt="">
            <div class="product_overlay"></div>
          </router-link>
          <h4 class="category">{{item.category}}</h4>
          <h3 class="title">
            <router-link :to="`/product/${item.id}`">{{item.title}}</router-link>
          </h3>
          <div class="price">
            <span v-if="item.price !== item.origin_price" class="origin_price">$ {{item.origin_price}}</span>
            <span class="onsale_price">$ {{item.price}}</span>
          </div>
        </li>
      </ul>
    </div>
     <div class="DM_block">
       <div class="container banner_content">
         <div class="banner_ad">
          <div class="ad_prefix">
            <span>B & E - S T Y L E</span>
          </div>
          <div class="ad_main">炎炎夏日的新選擇</div>
          <div>
             <router-link to="/shop/夏季新品" class="ad_btn">立即選購</router-link>
          </div>
        </div>
       </div>
    </div>
    <div class="product_category container-fluid">
       <h2 class="block_title text-center">Category</h2>
       <ul class="product_category_list container">
         <li v-for="(item,index) in category" :key="index">
           <router-link :to="item.link" :style="`background-image:url(${item.bg})`">
             <div class="category_overlay">
               <span>{{item.title}}</span>
             </div>
           </router-link>
         </li>
       </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
export default {
  name: 'Home',
  data () {
    return {
      category: [
        {
          title: '男士衣裝',
          bg: 'https://images.unsplash.com/photo-1592994238317-fcf75c5466fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
          link: '/shop/男士衣裝'
        },
        {
          title: '女士衣裝',
          bg: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
          link: '/shop/女士衣裝'
        },
        {
          title: '男士配件',
          bg: 'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          link: '/shop/男士配件'
        },
        {
          title: '女士配件',
          bg: 'https://images.unsplash.com/photo-1610249101495-41cc9cd8b301?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          link: '/shop/女士配件'
        }

      ],
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      header_color: 'dark',
      product_list: [],
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/products?page=${page}`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.product_list = res.data.products
            vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  computed: {
    arrival_list () {
      const newArray = [...this.product_list]
      newArray.splice(0, 2)
      return newArray
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Header, Footer
  }
}
</script>

<style scoped>
  /* * {
    font-family: 'Noto Sans TC', sans-serif;
    font-family: 'Roboto', sans-serif;
    font-family: 'Sriracha', cursive;
  } */
  li {
    list-style: none;
  }
  .banner {
    height:800px;
    background-image:url(https://i.imgur.com/tbjFQCl.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: top;
    background-attachment: fixed;
    position: relative;
  }
  .overlay {
    position: absolute;
    background: linear-gradient(180deg, rgba(0,0,0,20%) 0%, rgba(0,0,0,0) 100%);
    top:0;
    left:0;
    bottom: 0;
    right:0;
  }
  .banner_content {
    position: relative;
  }
  .banner_ad {
    min-height:600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .banner_ad .ad_prefix {
    margin-bottom: 10px;
    /* padding: 2px 0; */
  }
  .banner_ad .ad_prefix span {
    font-size: 36px;
    color:#ffffff;
    border-top:3px double #ffffff;
    border-bottom:3px double #ffffff;
    font-family: 'Roboto', sans-serif;
  }
  .banner_ad .ad_main {
    font-size: 48px;
    color:#ffffff;
    margin-bottom: 30px;
    font-family: 'Noto Sans TC', sans-serif;
    letter-spacing: 1.5px;
  }
  .banner_ad .ad_btn {
    border:1px solid #ffffff;
    padding: 8px 20px;
    color:#ffffff;
    text-decoration: none;
    transition: .3s all;
    letter-spacing: 1px;
    font-family: 'Noto Sans TC', sans-serif;
    letter-spacing: 1px;
  }
  .banner_ad .ad_btn:hover {
    background: #fe5252;
    border:1px solid #fe5252;
    color:#ffffff;
  }
  .block_title {
    padding-bottom: 50px;
    font-family:'Sriracha',handwriting;
    font-size: 48px;
    color:#3e1f55;
  }
  .new_arrival {
    padding: 50px 0;
  }
  .product_list {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Noto Sans TC', sans-serif;
  }
   .product_list li {
     width: 23%;
     margin: 0 1% 1% 1%;
     list-style: none;
     position: relative;
   }
   .product_list li .product_thumbnail {
     position: relative;
     margin-bottom: 15px;
     display: block;
   }
   .product_list li .product_thumbnail .product_overlay {
     position: absolute;
     top:0;
     left:0;
     right: 0;
     bottom: 0;
     transition: all .3s;
   }
   .product_list li .product_thumbnail:hover .product_overlay{
     background: rgba(0,0,0,0.3);
   }
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
   .product_list li img {
     width: 100%;
     height:350px;
     object-fit: cover;
     /* margin-bottom: 15px; */
   }
   .product_list .category {
     color:#7e7e7e;
     margin-bottom: 10px;
     display: flex;
     flex-direction: column;
     font-size: 16px;
   }
   .product_list .title {
     font-size: 18px;
     color:#000000;
     margin-bottom: 10px;
     letter-spacing: 1px;
   }
   .product_list .title a {
     text-decoration: none;
     color:inherit;
   }
   .product_list .price {
     font-family:'Sriracha',handwriting;
     color:#7e7e7e;
     font-size: 14px;
     /* display: flex; */
   }
  .product_list .origin_price {
    text-decoration: line-through;
    margin-right: 10px;
  }
  .product_list .onsale_price {
    color:#fe5252;
  }
   .product_category {
     padding: 50px 0;
   }
   .product_category_list {
     display: flex;
   }
   .product_category_list li {
     list-style: none;
     width:23%;
     margin: 0 1%;
   }
   .product_category_list li a {
     width: 100%;
     height:400px;
     background-size: cover;
     display:block;
     text-decoration: none;
   }
   .product_category_list li a .category_overlay {
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
     height: 100%;
     background: rgba(0,0,0,0.3);
     opacity: 0;
     transition: all .3s;
   }
   .product_category_list li a:hover span {
     opacity: 1;
   }
   .product_category_list li a:hover .category_overlay {
     opacity: 1;
   }
   .product_category_list li a span {
     color:#c2a09e;
     background: #ffffff;
     padding:8px 20px;
     font-family: 'Noto Sans TC', sans-serif;
     /* font-weight: bold; */
     letter-spacing: 1px;
     border-radius: 10px;
     opacity: 0;
     transition: all .5s;
   }
   .DM_block {
     height:650px;
     background-image: url('https://i.imgur.com/stCqJIz.jpg');
     background-size: cover;
     background-attachment: fixed;
     /* margin-bottom: 100px; */
   }
   .footer_wrapper {
     background: #322b2b;
     padding: 50px 0;
   }
   .footer_block h2{
     color:#ffffff;
     font-size: 16px;
     padding-left: 10px;
     border-left:3px solid #fe5252;
     line-height: 16px;
     margin-bottom: 50px;
     letter-spacing: 1px;
   }
   .footer_block .material-icons {
     color:#fe5252;
   }
   .footer_contact_list {
     margin: 0;
     padding: 0;
   }
   .footer_contact_list li {
     display: flex;
     align-items: center;
     margin-bottom: 20px;
   }
   .footer_contact_item_group {
     display: flex;
     flex-direction: column;
     margin-left: 10px;
   }
   .footer_contact_item_group span {
     color:#ffffff;
     font-size: 14px;
     letter-spacing: 1px;
   }
</style>
