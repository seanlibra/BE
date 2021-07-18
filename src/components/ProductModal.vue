<template>
  <div class="custom_product_modal_container" :class={active:modalStatus}>
      <div class="custom_model" :class={active:modalStatus}>
          <div class="header">
              <h2 v-if="isNew">新增產品</h2>
              <h2 v-else>更新產品</h2>
              <a @click.prevent="leaveModal" href="#" class="leave">
                  <span class="material-icons">close</span>
              </a>
          </div>
          <div class="body">
               <div class="row">
              <div class="col-sm-4 mb-1">
                  <div class="form-group">
                      <label for="imageUrl">主要圖片</label>
                      <input v-model="detail.imageUrl" type="text" class="form-control" name="" id="" placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="detail.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                  <div class="form-group mb-2">
                      <label for="title">標題</label>
                      <input v-model="detail.title" id="title" class="form-control" type="text" name="" placeholder="請輸入標題">
                  </div>
                  <div class="row">
                      <div class="form-group col-md-6 mb-2">
                          <label for="category">分類</label>
                          <input v-model="detail.category" id="category" type="text" class="form-control" placeholder="請輸入分類">
                      </div>
                      <div class="form-group col-md-6 mb-2">
                          <label for="unit">單位</label>
                          <input v-model="detail.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                      </div>
                  </div>
                  <div class="row">
                      <div class="form-group col-md-6 mb-3">
                          <label for="origin_price">原價</label>
                          <input v-model.number="detail.origin_price" id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                        </div>
                      <div class="form-group col-md-6 mb-3">
                          <label for="price">售價</label>
                          <input v-model.number="detail.price" id="price" type="number" min="0" class="form-control" placeholder="請輸入售價">
                      </div>
                        <div class="form-group col-md-6 mb-3">
                          <label for="ribbon">特別訊息</label>
                          <input v-model="detail.onsale" id="ribbon" class="form-control" placeholder="請輸入緞帶訊息">
                      </div>
                      <hr>
                      <div class="form-group">
                          <label for="description">產品描述</label>
                          <textarea v-model="detail.description" id="description" type="text" class="form-control" placeholder="請輸入產品描述"></textarea>
                      </div>
                      <div class="form-group">
                          <label for="content">說明內容</label>
                          <textarea v-model="detail.content" id="content" type="text" class="form-control" placeholder="請輸入說明內容"></textarea>
                      </div>
                      <div class="form-group">
                          <div class="form-check">
                            <input v-model="detail.is_enabled" :true-value="1" :false-value="0"  id="is_enabled" class="form-check-input" type="checkbox">
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                          </div>
                    </div>
                  </div>
              </div>
          </div>
          </div>
          <div class="footer">
              <a @click.prevent="addProduct" v-if="isNew" class="works_btn" href="#">新增</a>
              <a @click.prevent="updateProduct" v-else class="works_btn" href="#">更新</a>
          </div>
      </div>
  </div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    product: Object,
    isNew: Boolean
  },
  data () {
    return {
      detail: {},
      modalStatus: false,
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      token: ''
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
    },
    leaveModal () {
      this.modalStatus = false
    },
    addProduct () {
      const vm = this
      var readToAdd = { data: this.detail }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/${vm.path}/admin/product`, readToAdd, {
        headers: {
          Authorization: vm.token
        }
      })
        .then(function (res) {
          if (res.data.success) {
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('emitAdd')
            vm.leaveModal()
          } else {
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
    },
    updateProduct () {
      const vm = this
      vm.$store.commit('startLoading', true)
      var readyToUpdate = { data: vm.detail }
      console.log(vm.detail)
      vm.$http.put(`${vm.url}/api/${vm.path}/admin/product/${vm.detail.id}`, readyToUpdate, {
        headers: {
          Authorization: vm.token
        }
      })
        .then(function (res) {
          if (res.data.success) {
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('emitUpdate')
            vm.leaveModal()
          } else {
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue_class\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.token = token
  },
  watch: {
    product () {
      this.detail = this.product
    }
  }
}
</script>

<style scoped>
    .custom_product_modal_container {
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background-color: rgba(255,255,255,0.7);
      opacity: 0;
      transition: all .3s;
      pointer-events: none;
    }
    .custom_product_modal_container.active {
        opacity: 1;
         pointer-events: auto;
    }
    .custom_model {
        /* max-height:500px; */
        width:900px;
        /* border:1px solid #000000; */
        position: fixed;
        top:-150%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
        box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
        transition: all .5s;
    }
    .custom_model.active {
        top:50%;
    }
    .custom_model .header {
        background:#c2a09e;
        padding: 16px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .custom_model .header h2 {
        font-size: 18px;
        color:#ffffff;
        margin: 0;
    }
    .custom_model .header .leave {
      color:#ffffff;
    }
    .custom_model .body {
        background: #ffffff;
        padding: 16px;
    }
    .custom_model .footer {
        padding: 16px;
        background: #ffffff;
        border-top:1px solid #dee2e6;
        text-align: right;
    }
    .footer .works_btn {
        background: #c2a09e;
        padding: 6px 10px;
        color:#ffffff;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
