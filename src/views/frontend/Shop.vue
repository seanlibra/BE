<template>
  <div class="shop">
    <Header :text-dark="true"></Header>
    <div class="content container">
      <Sidebar @emit-category="change_category"></Sidebar>
      <div class="product_list_group">
        <ul class="product_list">
          <li v-for="item in product_page_list_result" :key="item.product.id">
            <div class="ribbon ribbon-top-left" v-if="item.product.onsale">
              <span class="ribbon_content">
                <span class="ribbon_border">{{ item.product.onsale }}</span>
              </span>
            </div>
            <router-link
              class="product_thumbnail"
              :to="`/product/${item.product.id}`"
            >
              <img
                v-if="item.product.imagesUrl"
                class="on_hover"
                :src="item.product.imagesUrl[0]"
                alt=""
              />
              <img
                v-else
                class="on_hover"
                :src="item.product.imageUrl"
                alt=""
              />
              <img class="default" :src="item.product.imageUrl" alt="" />
              <div class="product_overlay"></div>
            </router-link>
            <h4 class="category">{{ item.product.category }}</h4>
            <h3 class="title">
              <router-link :to="`/product/${item.product.id}`">{{
                item.product.title
              }}</router-link>
            </h3>
            <div class="price">
              <span
                :class="{
                  normal: item.product.price == item.product.origin_price,
                }"
                class="origin_price"
                >$ {{ item.product.origin_price }}</span
              >
              <span
                v-if="item.product.price !== item.product.origin_price"
                class="onsale_price"
                >$ {{ item.product.price }}</span
              >
            </div>
          </li>
        </ul>
        <ul class="custom_pagination" v-if="pagination.allPage !== 1">
          <li class="prev">
            <a
              :class="{ disabled: pagination.nowPage === 1 }"
              @click.prevent="pagination.nowPage--"
              href="#"
            >
              <span class="material-icons">arrow_back_ios</span>
            </a>
          </li>
          <li v-for="page in pagination.allPage" :key="page">
            <a
              :class="{ active: page === pagination.nowPage }"
              @click.prevent="pagination.nowPage = page"
              href="#"
              >{{ page }}</a
            >
          </li>
          <li class="next">
            <a
              :class="{ disabled: pagination.allPage === pagination.nowPage }"
              @click.prevent="pagination.nowPage++"
              href="#"
            >
              <span class="material-icons">arrow_forward_ios</span>
            </a>
          </li>
        </ul>
      </div>
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
      product_list: [],
      pagination: {
        allPage: 0,
        nowPage: 1
      },
      category: ''
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.product_list = res.data.products.slice().reverse()
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    change_category (category) {
      this.category = category
      this.pagination.nowPage = 1
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    },
    current_category_product_list () {
      const list = [...this.product_list]
      let newList = []
      const nowCategory = this.$route.params.category || 'all'
      if (nowCategory !== 'all') {
        list.forEach(function (item) {
          if (item.category === nowCategory) {
            newList.push(item)
          }
        })
      } else {
        newList = list
      }
      return newList
    },
    product_page_list_process () {
      const list = [...this.current_category_product_list]
      // const vm = this
      const newArray = []
      // const filterArray = []
      let index = 0
      for (let i = 0; i < list.length; i++) {
        if (i % 9 === 0) {
          index++
        }
        newArray.push({ product: list[i], page: index })
      }
      return newArray
    },
    product_page_list_result () {
      const list = [...this.product_page_list_process]
      const filterArray = []
      const vm = this
      if (list.length > 2) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].page === vm.pagination.nowPage) {
            filterArray.push(list[j])
          }
        }
      }

      return filterArray
    },
    category_list () {
      const list = [...this.product_list]
      const originCategoryList = []
      let newCategoryList = []
      const newProductList = []
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
  watch: {
    product_page_list_process () {
      this.pagination.allPage = this.product_page_list_process[this.product_page_list_process.length - 1].page
    }
  },
  created () {
    this.getProducts()
    this.category = this.$route.params.category
  },
  components: {
    Header, Footer, Sidebar, Loading
  }
}
</script>

<style scoped>
.content {
  display: flex;
  padding-top: 70px;
  flex-wrap: wrap;
}
.product_list_group {
  width: 75%;
}
.product_list {
  display: flex;
  flex-wrap: wrap;
  font-family: "Noto Sans TC", sans-serif;
  padding: 0;
}
.product_list li {
  width: 31%;
  margin: 0 1% 2% 1%;
  list-style: none;
  position: relative;
}
.product_list li .product_thumbnail {
  position: relative;
  margin-bottom: 15px;
  display: block;
}
.product_list li .product_thumbnail .default {
  position: relative;
  transition: all 0.5s;
  opacity: 1;
}
.product_list li .product_thumbnail .on_hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.product_list li .product_thumbnail:hover .default {
  opacity: 0;
}
.product_list li .product_thumbnail .product_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s;
}
.product_list li .product_thumbnail:hover .product_overlay {
  background: rgba(0, 0, 0, 0.2);
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
  content: "";
  display: block;
  border: 5px solid #fe5252;
}
.ribbon .ribbon_content {
  position: absolute;
  display: block;
  width: 250px;
  padding: 15px 0;
  background-color: #fe5252;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 18px;
  letter-spacing: 1px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}
.ribbon .ribbon_content .ribbon_border {
  padding: 10px 70px;
  border-bottom: 1px solid #ffffff;
  border-top: 1px solid #ffffff;
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
  height: 350px;
  object-fit: cover;
}
.product_list .category {
  color: #7e7e7e;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}
.product_list .title {
  font-size: 18px;
  color: #000000;
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.product_list .title a {
  text-decoration: none;
  color: inherit;
}
.product_list .price {
  font-family: "Sriracha", handwriting;
  color: #7e7e7e;
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
  color: #fe5252;
}
.custom_pagination {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.custom_pagination li {
  list-style: none;
  align-items: center;
  margin: 0 10px;
}
.custom_pagination li a {
  text-decoration: none;
  width: 25px;
  height: 25px;
  background: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #1a1a1a;
  transition: all 0.3s;
}
.custom_pagination li a:hover,
.custom_pagination li a.active {
  color: #ffffff;
  background: #fe5252;
}
.custom_pagination li a.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.custom_pagination li a .material-icons {
  font-size: 14px;
}
@media (max-width: 768px) {
  .product_list li {
    width: 48%;
  }
}
@media (max-width: 414px) {
  .product_list_group {
    width: 100%;
  }
  .content {
    padding-top: 35px;
  }
  .product_list {
    width: 100%;
    padding: 15px 0;
  }
  .product_list li img {
    height: 250px;
  }
}
</style>
