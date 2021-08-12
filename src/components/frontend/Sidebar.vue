<template>
  <div class="sidebar">
    <div class="sidebar_group">
      <h2>商品分類</h2>
      <ul class="product_category_list">
        <li>
          <router-link
            @click="change_category('all')"
            :to="`/shop/all`"
            :class="{ active: now_category === 'all' }"
          >
            <span class="circle"></span>
            <span class="name">全部商品</span>
            <span class="count">{{ product_list.length }}</span>
          </router-link>
        </li>
        <li v-for="(item, index) in category_list" :key="index">
          <router-link
            @click="change_category(item.category)"
            :to="`/shop/${item.category}`"
            :class="{ active: now_category === item.category }"
          >
            <span class="circle"></span>
            <span class="name">{{ item.category }}</span>
            <span class="count">{{ item.count }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar_group">
      <h2>最近瀏覽的商品</h2>
      <ul class="recent_product_list">
        <li v-for="item in recent_list.slice().reverse()" :key="item.id">
          <router-link
            class="thumbnail"
            :to="`/product/${item.id}`"
            :style="`background-image:url(${item.img})`"
          ></router-link>
          <div class="single_recent_info">
            <router-link class="title" :to="`/product/${item.id}`">{{
              item.title
            }}</router-link>
            <router-link
              :class="{ normal: item.price == item.origin_price }"
              class="origin_price"
              :to="`/product/${item.id}`"
              >$ {{ item.origin_price }}</router-link
            >
            <router-link
              v-if="item.price !== item.origin_price"
              class="price"
              :to="`/product/${item.id}`"
              >$ {{ item.price }}</router-link
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productsCategory: Array
  },
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      product_list: [],
      recent_list: [],
      now_category: ''
    }
  },
  methods: {
    getProducts_category () {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/products/all`)
        .then(function (res) {
          if (res.data.success) {
            vm.product_list = res.data.products
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    change_category (category) {
      this.$emit('emit-category', category)
      this.now_category = category
    },
    getRecent () {
      const recentList = JSON.parse(localStorage.getItem('be_product')) || []
      if (recentList.length > 5) {
        recentList.splice(0, 1)
      }
      this.recent_list = recentList
    }
  },
  computed: {
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
  created () {
    this.getProducts_category()
    this.getRecent()
    this.now_category = this.$route.params.category
  }
}
</script>

<style scoped>
.sidebar {
  width: 23%;
  margin: 0 1%;
  font-family: "Noto Sans TC", sans-serif;
}
.sidebar_group h2 {
  font-size: 18px;
  letter-spacing: 1px;
  padding-left: 10px;
  border-left: 3px solid #fe5252;
}
.product_category_list {
  margin: 0;
  padding: 15px 0px;
}
.product_category_list li {
  list-style: none;
  margin-bottom: 10px;
  font-family: "Noto Sans TC", sans-serif;
}
.product_category_list li a {
  text-decoration: none;
  color: #000000;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all 0.3s;
  position: relative;
  display: block;
  font-family: inherit;
}
.product_category_list li a .circle {
  width: 12px;
  height: 12px;
  display: inline-block;
  border: 3px double rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  margin-right: 10px;
}
.product_category_list li a .count {
  position: absolute;
  right: 0;
  background: rgba(84, 84, 84, 0.07);
  /* padding: 0 10px; */
  border-radius: 10px;
  width: 35px;
  text-align: center;
}
.product_category_list li a:hover,
.product_category_list li a.active {
  color: #fe5252;
}
.recent_product_list {
  margin: 0;
  padding: 15px 0;
}
.recent_product_list li {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}
.recent_product_list li .thumbnail {
  display: block;
  width: 75px;
  height: 75px;
  background-size: cover;
  border-radius: 10px;
  transition: all 0.3s;
}
.recent_product_list li:hover .thumbnail {
  opacity: 0.5;
}
.recent_product_list li .single_recent_info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  height: 75px;
}
.recent_product_list li .single_recent_info a {
  /* text-decoration: none; */
  letter-spacing: 1px;
}
.single_recent_info .title {
  font-size: 14px;
  transition: all 0.3s;
  color: #000000;
  text-decoration: none;
}
.recent_product_list li:hover .title {
  color: #fe5252;
}
.single_recent_info .origin_price {
  font-size: 14px;
  font-family: "Sriracha", handwriting;
  color: #7e7e7e;
  text-decoration: line-through;
}
.single_recent_info .price {
  font-size: 14px;
  font-family: "Sriracha", handwriting;
  color: #fe5252;
  text-decoration: none;
}
.single_recent_info .origin_price.normal {
  text-decoration: none;
}
@media (max-width: 414px) {
  .sidebar {
    width: 100%;
  }
  .sidebar_group h2 {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
