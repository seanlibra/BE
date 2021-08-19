<template>
  <div class="home">
    <div class="banner container-fluid py-2">
      <div class="overlay"></div>
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
      <Header :update-Cart="cartUpdteTrigger"></Header>
    </div>
    <div class="new_arrival">
      <h2 class="block_title text-center">New arrival</h2>
      <ul class="product_list container">
        <li v-for="item in arrival_list" :key="item.id">
          <div class="ribbon ribbon-top-left" v-if="item.onsale">
            <span class="ribbon_content">
              <span class="ribbon_border">{{ item.onsale }}</span>
            </span>
          </div>
          <router-link class="product_thumbnail" :to="`/product/${item.id}`">
            <img
              v-if="item.imagesUrl[0]"
              class="on_hover"
              :src="item.imagesUrl[0]"
              alt="商品圖片二"
            />
            <img
              v-else
              class="on_hover"
              :src="item.imageUrl"
              alt="商品圖片二"
            />
            <img class="default" :src="item.imageUrl" alt="商品預設圖片" />
            <div class="product_overlay"></div>
            <a @click.prevent="open_quick(item)" class="quick_view" href="#">
              <span class="material-icons mx-2">visibility</span>
              <span>快速瀏覽</span>
            </a>
          </router-link>
          <h4 class="category">
            <router-link :to="`/shop/${item.category}`">{{
              item.category
            }}</router-link>
          </h4>
          <h3 class="title">
            <router-link :to="`/product/${item.id}`">{{
              item.title
            }}</router-link>
          </h3>
          <router-link :to="`/product/${item.id}`" class="price">
            <span
              :class="{ normal: item.price == item.origin_price }"
              class="origin_price"
              >$ {{ item.origin_price }}</span
            >
            <span v-if="item.price !== item.origin_price" class="onsale_price"
              >$ {{ item.price }}</span
            >
          </router-link>
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
            <router-link to="/shop/夏季新品" class="ad_btn"
              >夏季新品</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="product_category container-fluid">
      <h2 class="block_title text-center">Category</h2>
      <ul class="product_category_list container">
        <li v-for="(item, index) in category" :key="index">
          <router-link
            :to="item.link"
            :style="`background-image:url(${item.bg})`"
          >
            <div class="category_overlay">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="news_block container-fluid">
      <div class="container">
        <h2 class="block_title text-center">LATEST NEWS</h2>
        <ul class="news_list">
          <li v-for="item in display_news" :key="item.id">
            <router-link
              :to="`/post/${item.id}`"
              class="thumbnail"
              :style="`background-image:url(${item.imageUrl})`"
            >
              <div class="news_overlay"></div>
              <span class="read_more">了解更多</span>
            </router-link>
            <div class="post_content">
              <router-link :to="`/post/${item.id}`">
                <h3>
                  {{ item.title }}
                </h3>
                <div class="excerpt">
                  {{ item.description }}
                </div>
              </router-link>
            </div>
            <div class="post_info">
              <div class="d-flex align-items-center">
                <span class="material-icons"> account_circle </span>
                <span class="mx-1 text">{{ item.author }}</span>
              </div>
              <router-link
                :to="`/blog/${item.tag}`"
                class="tags d-flex align-items-center"
              >
                <span class="material-icons"> local_offer </span>
                <span class="mx-1 text">{{ item.tag }}</span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <QuickModal
      @quick-carts="quick_carts_reload"
      @quick-bubble="quick_bubble"
      @clean-quick="quick_product = {}"
      ref="quick_modal"
      :product="quick_product"
    ></QuickModal>
    <Loading v-if="loading"></Loading>
    <Footer></Footer>
    <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
import Loading from '@/components/Loading.vue'
import QuickModal from '@/components/frontend/Quick_modal'
export default {
  name: 'Home',
  data () {
    return {
      category: [
        {
          title: '男性服裝',
          bg: 'https://i.imgur.com/YaTrDn6.jpg',
          link: '/shop/男性服裝'
        },
        {
          title: '女性服裝',
          bg: 'https://i.imgur.com/FXvp5Yo.jpg',
          link: '/shop/女性服裝'
        },
        {
          title: '男性配件',
          bg: 'https://i.imgur.com/eyxzP79.jpg',
          link: '/shop/男性配件'
        },
        {
          title: '女性配件',
          bg: 'https://images.unsplash.com/photo-1610249101495-41cc9cd8b301?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          link: '/shop/女性配件'
        }

      ],
      quick_product: {},
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      product_list: [],
      news_list: [],
      pagination: {},
      quick_modal_show: false,
      bubbleText: '',
      cartUpdteTrigger: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/products?page=${page}`)
        .then(res => {
          if (res.data.success) {
            vm.product_list = res.data.products
            vm.pagination = res.data.pagination
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
    open_quick (item) {
      this.$refs.quick_modal.openModal()
      this.getSingleProduct(item)
    },
    quick_bubble (text) {
      this.bubbleText = text
      this.$refs.bubble.bubbleACtive()
    },
    quick_carts_reload () {
      this.cartUpdteTrigger = !this.cartUpdteTrigger
    },
    getSingleProduct (item) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${item.id}`)
        .then(res => {
          if (res.data.success) {
            vm.quick_product = res.data.product
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
    getNews (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/articles?page=${page}`)
        .then(res => {
          if (res.data.success) {
            vm.news_list = res.data.articles
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
  computed: {
    loading () {
      return this.$store.state.isLoading
    },
    arrival_list () {
      const newArray = [...this.product_list]
      newArray.splice(0, 2)
      return newArray
    },
    display_news () {
      const newArray = [...this.news_list]
      const result = []
      if (newArray.length > 3) {
        for (let i = 0; i < 3; i++) {
          result.push(newArray[i])
        }
      }
      return result
    }
  },
  created () {
    this.getProducts()
    this.getNews()
  },
  components: {
    Header, Footer, Loading, QuickModal
  }
}
</script>

<style scoped>
  li {
    list-style: none;
  }
  .home {
    position: relative;
  }
  .banner {
    height:800px;
    background-image:url(https://i.imgur.com/k5rFGmx.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: top;
    background-attachment: fixed;
    position: relative;
  }
  .overlay {
    position: absolute;
    background: linear-gradient(180deg, rgba(0,0,0,40%) 0%, rgba(0,0,0,0) 100%);
    top:0;
    left:0;
    bottom: 0;
    right:0;
  }
  .banner_content {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
  }
  .banner_ad {
    /* min-height:600px; */
    position: absolute;
    top:50%;
    left:0;
    transform: translateY(-25%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .banner_ad .ad_prefix {
    margin-bottom: 10px;
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
   .product_list li .product_thumbnail .quick_view {
     position: absolute;
     bottom: 0;
     left:0;
     right: 0;
     top:100%;
     background: rgba(0,0,0,0.5);
     color:#ffffff;
     text-decoration: none;
     display: flex;
     justify-content: center;
     align-items: center;
     transition: all .3s;
     opacity: 0;
     letter-spacing: 1px;
     font-size: 16px;
   }
   .product_list li .product_thumbnail .default {
     position: relative;
     transition: all .5s;
     opacity: 1;
   }
   .product_list li .product_thumbnail .on_hover{
     position: absolute;
     top:0;
     left:0;
     right: 0;
     bottom: 0;
   }
   .product_list li .product_thumbnail .product_overlay {
     position: absolute;
     top:0;
     left:0;
     right: 0;
     bottom: 0;
     transition: all .3s;
   }
   .product_list li .product_thumbnail:hover .quick_view{
     top:90%;
     opacity: 1;
   }
   .product_list li .product_thumbnail:hover .default {
     opacity: 0;
   }
   .product_list li .product_thumbnail:hover .product_overlay{
     background: rgba(0,0,0,0.2);
   }
   .ribbon {
     width: 150px;
     height: 150px;
     overflow: hidden;
     position: absolute;
     z-index: 99;
     pointer-events: none;
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
      width: 250px;
      padding: 15px 0;
      background-color: #fe5252;
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      color: #fff;
      font-size: 18px;
      letter-spacing: 1px;
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
   }
   .product_list .category {
     margin-bottom: 10px;
     display: flex;
     flex-direction: column;
     font-size: 16px;
     letter-spacing: 1px;
   }
   .product_list .category a {
     color:#7e7e7e;
     text-decoration: none;
   }
   .product_list .title {
     font-size: 18px;
     color:#000000;
     margin-bottom: 5px;
     letter-spacing: 1px;
   }
   .product_list .title a {
     text-decoration: none;
     color:inherit;
     transition: all .3s;
   }
   .product_list .title a:hover {
     color:#fe5252;
   }
   .product_list .price {
     font-family:'Sriracha',handwriting;
     color:#7e7e7e;
     font-size: 14px;
     text-decoration: none;
     /* display: flex; */
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
   .product_category {
     padding: 50px 0;
   }
   .product_category_list {
     display: flex;
     flex-wrap: wrap;
   }
   .product_category_list li {
     list-style: none;
     width:23%;
     margin: 0 1%;
     overflow: hidden;
   }
   .product_category_list li a {
     width: 100%;
     height:400px;
     background-size: cover;
     display:block;
     text-decoration: none;
     transition: all .3s;
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
   .product_category_list li:hover a{
     transform: scale(1.1);
   }
   .product_category_list li a:hover span {
     opacity: 1;
   }
   .product_category_list li a:hover .category_overlay {
     opacity: 1;
   }
   .product_category_list li a span {
     color:#000000;
     background: #ffffff;
     padding:8px 20px;
     font-family: 'Noto Sans TC', sans-serif;
     letter-spacing: 1px;
     border-radius: 10px;
     opacity: 0;
     transition: all .5s;
     transform: scale(0.9);
   }
   .DM_block {
     height:650px;
     background-image: url('https://i.imgur.com/aczldfV.jpg');
     background-size: cover;
     background-attachment: fixed;
     position: relative;
   }
   .news_block {
     background: #ffefea;
     padding: 50px;
   }
   .news_list {
     margin: 0;
     padding: 0;
     display: flex;
     flex-wrap: wrap;
     font-family: 'Noto Sans TC', sans-serif;
   }
   .news_list li {
     width: 31%;
     margin: 0 1%;
     display: flex;
     flex-direction: column;
   }
   .news_list li .thumbnail {
     height:250px;
     background-size: cover;
     display: flex;
     justify-content: center;
     align-items: center;
     text-decoration: none;
     color:#ffffff;
     position: relative;
     font-size: 16px;
     letter-spacing: 1px;
   }
   .news_list li .thumbnail .news_overlay {
     position: absolute;
     top:0;
     left:0;
     bottom: 0;
     right: 0;
     background: rgba(0,0,0,0.3);
     transition: all .3s;
     opacity: 0;
     pointer-events: none;
   }
   .news_list li .thumbnail:hover .read_more{
     opacity: 1;
   }
   .news_list li .thumbnail:hover .news_overlay {
     opacity: 1;
   }
   .news_list li .read_more {
     border:1px solid #ffffff;
     padding: 5px 15px;
     border-radius: 15px;
     transition: all .3s;
     opacity:0;
     position: relative;
   }
   .news_list li .read_more:hover {
     background: #ffffff;
     color:#000000;
   }
    .news_list li .post_content {
     border:1px solid #f0eff0;
     /* padding: 15px; */
     background: #ffffff;
     min-height: 120px;
   }
   .news_list li .post_content a {
     text-decoration: none;
     display: block;
     padding: 15px;
     height: 100%;
   }
    .news_list li .post_content h3 {
     text-align: center;
     font-size: 24px;
     margin-bottom: 15px;
     letter-spacing: 1px;
     font-family: 'Noto Sans TC', sans-serif;
   }
   .news_list li .post_content h3  {
     transition: all .3s;
     text-decoration: none;
     color:inherit;
     color:#000000;
   }
   .news_list li .post_content h3:hover {
     color:#fe5252;
   }
    .news_list li .post_content .excerpt {
     font-size: 16px;
     letter-spacing: 1px;
     font-family: 'Noto Sans TC', sans-serif;
     text-decoration: none;
     color:#000000;
     transition: all .3s;
   }
   .news_list li .post_content .excerpt:hover {
     color:#fe5252;
   }
    .news_list li .post_info {
      background: #f0eff0;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .news_list li .post_info .text {
      font-size: 14px;
    }
    .news_list li .post_info a {
      text-decoration: none;
      color:#000000;
      transition: all .3s;
    }
    .news_list li .post_info a:hover {
      color:#fe5252
    }
    .custom_alert {
      position: fixed;
      background: #fe5252;
      padding: 8px 16px;
      bottom: 50px;
      right:50px;
      color:#ffffff;
      border-radius: 12px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      opacity: 1;
      transition: all .3s;
      opacity: 0;
    }
    .custom_alert a {
      text-decoration: none;
      color:#ffffff;
      font-size: 18px;
      margin-right: 10px;
    }
    .custom_alert.active {
      opacity: 1;
      pointer-events: none;
    }
    @media(max-width:1024px) {
      .product_list li .product_thumbnail .quick_view {
        display: none;
      }
    }
    @media (max-width:768px) {
      .banner {
        height:50vh;
      }
      .banner_ad {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .product_list li{
        width: 48%;
        margin-bottom: 3%;
      }
      .product_category_list li {
        width: 48%;
        margin-bottom: 3%;
      }
      .news_list li {
        width: 96%;
        margin-bottom: 5%;
      }
        .DM_block {
          height: 50vh;
          background-position: 65% 50%;
        }
     }
     @media(max-width:414px) {
        .banner_ad .ad_prefix span {
          font-size: 24px;
          color:#ffffff;
          border-top:3px double #ffffff;
          border-bottom:3px double #ffffff;
          font-family: 'Roboto', sans-serif;
        }
        .banner_ad {
          padding: 0 20px;
        }
        .banner_ad .ad_main {
          font-size: 24px;
          color:#ffffff;
          margin-bottom: 30px;
          font-family: 'Noto Sans TC', sans-serif;
          letter-spacing: 1.5px;
        }
        .banner_ad .ad_btn {
          border:1px solid #ffffff;
          padding: 6px 12px;
          color:#ffffff;
          text-decoration: none;
          transition: .3s all;
          letter-spacing: 1px;
          font-family: 'Noto Sans TC', sans-serif;
          letter-spacing: 1px;
          font-size: 14px;
        }
        .block_title {
          font-size: 36px;
        }
        .new_arrival {
          padding: 25px 0;
        }
        .block_title {
          padding-bottom: 25px;
        }
        .product_list li img {
          height:300px;
        }
        .ribbon .ribbon_content {
          width: 225px;
        }
        .ribbon .ribbon_content {
          padding: 10px 0;
        }
        .ribbon .ribbon_content .ribbon_border {
          padding: 5px 70px;
        }
        .DM_block {
          height: 50vh;
          background-position: 65% 50%;
        }
        .news_block {
          padding: 50px 25px;
        }
        .news_list li .post_content h3 {
          font-size: 18px;
        }
        .news_list li .post_content .excerpt {
          font-size: 16px;
        }
        .product_category_list li a {
          height:300px;
        }
     }
</style>
