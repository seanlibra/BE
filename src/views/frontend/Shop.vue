<template>
    <div class="shop">
      <Header text-dark="true"></Header>
      <div class="content container">
       <Sidebar></Sidebar>
        <ul class="product_list">
          <li v-for="item in current_category_product_list" :key="item.id">
            <div class="ribbon ribbon-top-left" v-if="item.onsale">
            <span class="ribbon_content">
              <span class="ribbon_border">{{item.onsale}}</span>
            </span>
          </div>
          <router-link :to="`/product/${item.id}`">
            <img :src="item.imageUrl" alt="">
          </router-link>
          <h4 class="category">{{item.category}}</h4>
          <h3 class="title">{{item.title}}</h3>
          <div class="price">
            <span  :class="{ normal : item.price  == item.origin_price }"  class="origin_price">$ {{item.origin_price}}</span>
            <span v-if="item.price  !== item.origin_price" class="onsale_price">$ {{item.price}}</span>
          </div>
        </li>
        </ul>
      </div>
      <Loading v-if="loading"></Loading>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
import Sidebar from '@/components/frontend/Sidebar.vue'
import Loading from '@/components/Loading.vue'

export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      product_list: [],
      pagination: {}
    }
  },
  methods: {
    getProducts () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/products/all`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.product_list = res.data.products
            // vm.pagination = res.data.pagination
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
    loading () {
      return this.$store.state.isLoading
    },
    current_category_product_list () {
      var list = [...this.product_list]
      var newList = []
      var nowCategory = this.$route.params.category || 'all'
      if (nowCategory !== 'all') {
        list.forEach(function (item) {
          console.log(item)
          if (item.category === nowCategory) {
            newList.push(item)
          }
        })
      } else {
        newList = list
      }
      return newList
    },
    category_list () {
      var list = [...this.product_list]
      var originCategoryList = []
      var newCategoryList = []
      var newProductList = []
      list.forEach(function (item) {
        originCategoryList.push(item.category)
      })
      newCategoryList = originCategoryList.filter(function (item, index) {
        return originCategoryList.indexOf(item) === index
      })
      for (let i = 0; i < newCategoryList.length; i++) {
        newProductList.push({ category: newCategoryList[i], count: 0 })
      }
      list.filter(function (item) {
        for (let i = 0; i < newProductList.length; i++) {
          if (item.category === newProductList[i].category) {
            newProductList[i].count++
          }
        }
      })
      return newProductList
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Header, Footer, Sidebar, Loading
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    padding-top:70px;
  }
  /* .sidebar {
    width: 23%;
    margin: 0 1%;
  }
  .sidebar_group h2{
    font-size: 18px;
    letter-spacing: 1px;
    padding-left: 10px;
    border-left: 3px solid  #fe5252;
  }
  .product_category_list {
    margin: 0;
    padding: 15px 0px;
  }
  .product_category_list li{
    list-style: none;
    margin-bottom: 10px;
    font-family: 'Noto Sans TC', sans-serif;
  }
  .product_category_list li a {
    text-decoration: none;
    color:#000000;
    letter-spacing: 1px;
    font-size: 16px;
    transition: all .3s;
    position: relative;
    display: block;
    font-family: inherit;
  }
  .product_category_list li a .circle {
    width:12px;
    height:12px;
    display: inline-block;
    border:3px double rgba(0,0,0,0.3);
    border-radius: 50%;
    margin-right: 10px;
  }
  .product_category_list li a .count {
    position: absolute;
    right: 0;
    background: rgba(84,84,84,.07);
    padding: 0 10px;
    border-radius: 10px;
  }
  .product_category_list li a:hover {
    color:#fe5252;
  } */
  .product_list {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Noto Sans TC', sans-serif;
    width: 75%;
    padding: 0;
  }
   .product_list li {
     width: 31%;
     margin: 0 1% 2% 1%;
     list-style: none;
     position: relative;
   }
    .ribbon {
     width: 150px;
     height: 150px;
     overflow: hidden;
     position: absolute;
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
     margin-bottom: 15px;
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
   .product_list .price {
     font-family:'Sriracha',handwriting;
     color:#7e7e7e;
     font-size: 14px;
   }
  .product_list .origin_price {
    text-decoration: line-through;
    margin-right: 10px;
  }
  .product_list .origin_price.normal {
    text-decoration: none;
  }
  .product_list .onsale_price {
    color:#fe5252;
  }
</style>
