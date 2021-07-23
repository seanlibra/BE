<template>
      <div class="sidebar">
          <div class="sidebar_group">
            <h2>商品分類</h2>
            <ul class="product_category_list">
              <li v-for="(item,index) in category_list" :key="index">
                <router-link :to="`/shop/${item.category}`">
                  <span class="circle"></span>
                  <span class="name">{{item.category}}</span>
                  <span class="count">{{item.count}}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- <div class="sidebar_group">
            <h2>熱門商品</h2>
          </div> -->
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
      product_list: []

    }
  },
  methods: {
    getProducts_category () {
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
    this.getProducts_category()
  }
}
</script>

<style scoped>
 .sidebar {
    width: 23%;
    margin: 0 1%;
     font-family: 'Noto Sans TC', sans-serif;
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
    /* padding: 0 10px; */
    border-radius: 10px;
    width: 35px;
    text-align: center;
  }
  .product_category_list li a:hover {
    color:#fe5252;
  }
  @media (max-width:414px) {
    .sidebar {
      width: 100%;
    }
    .sidebar_group h2 {
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>
