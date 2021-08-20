<template>
  <div class="header_tools_container">
    <h1>產品列表</h1>
    <a @click.prevent="openModal(true)" class="addProduct" href="#">新增產品</a>
  </div>
  <table class="product_list">
    <thead>
      <tr>
        <th class="text-center">
          <span>商品縮圖</span>
        </th>
        <th>
          <span>商品名稱</span>
        </th>
        <th>
          <span>商品分類</span>
        </th>
        <th>
          <span>商品價格</span>
        </th>
        <th>
          <span>商品狀態</span>
        </th>
        <th>
          <span>編輯</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="single_product" v-for="item in list" :key="item.id">
        <td class="text-center">
          <img class="thumbnail" :src="item.imageUrl" alt="商品圖片" />
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>{{ item.category }}</td>
        <td>{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <a href="#" class="edit" @click.prevent="openModal(false, item)">
            <span class="material-icons">mode_edit</span>
          </a>
          <a href="#" class="remove" @click.prevent="openDelModal(item)">
            <span class="material-icons">close</span>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
  <div>
    <nav aria-label="Page navigation example" class="mt-3">
      <ul class="pagination justify-content-center custom_pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            @click.prevent="getProducts(pagination.current_page - 1)"
            class="page-link"
            href="#"
            >Previous</a
          >
        </li>
        <li
          :class="{ active: pagination.current_page == item }"
          v-for="(item, index) in pagination.total_pages"
          :key="index"
          class="page-item"
        >
          <a
            @click.prevent="getProducts(index + 1)"
            class="page-link"
            href="#"
            >{{ index + 1 }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            @click.prevent="getProducts(pagination.current_page + 1)"
            class="page-link"
            href="#"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
  <ProductModal
    @bubble-open="bubbleTrigger"
    @emit-add="getProducts"
    @emit-update="getProducts"
    ref="productModal"
    :product="tempProduct"
    :is-new="isNew"
  ></ProductModal>
  <ProductDelModal
    @bubble-open="bubbleTrigger"
    @emit-del="getProducts"
    :product="tempProduct"
    ref="delProductModal"
  ></ProductDelModal>
  <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue'
import ProductDelModal from '@/components/backend/ProductDelModal.vue'

export default {
  data () {
    return {
      list: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      bubbleText: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then(res => {
          if (res.data.success) {
            vm.list = res.data.products
            // vm.list.forEach(function (item) {
            //   item.specifications = []
            // })
            // vm.list.forEach(function (item) {
            //   item.imagesUrl = []
            // })
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
    changePage (page) {
      this.getProducts(page)
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {
          specifications: [],
          imagesUrl: []
        }
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productModal = this.$refs.productModal
      productModal.openModal()
    },
    openDelModal (item) {
      this.tempProduct = item
      const delProductModal = this.$refs.delProductModal
      delProductModal.openModal()
    },
    bubbleTrigger (message) {
      const vm = this
      vm.bubbleText = message
      vm.$refs.bubble.bubbleACtive()
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    ProductModal, ProductDelModal
  }
}
</script>

<style scoped>
.product_list {
  width: 100%;
}
.thumbnail {
    height: 75px;
    width: 75px;
    object-fit: cover;
}
.product_list tbody tr td {
    padding: 5px;
}
.product_list tbody tr:nth-child(odd) {
 background: #f1f2f6;
}
.edit span{
  color:#c2a09e;
}
.remove span {
  color:#4a4a4a;
}
.addProduct {
  background: #c2a09e;
  color:#ffffff;
  padding: 6px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: all .3s;
  border:1px solid #c2a09e;
}
.addProduct:hover{
  background: #ffffff;
  color:#c2a09e;
}
.header_tools_container {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.header_tools_container h1 {
  font-size: 24px;
  font-weight: bold;
}
.custom_pagination li.active a{
  background: #c2a09e;
  border:1px solid #c2a09e;
  color:#ffffff;
}
.custom_pagination li a {
  color:#c2a09e;
}
</style>
