<template>
  <div class="custom_product_modal_container" :class="{ active: modalStatus }">
    <div class="custom_model" :class="{ active: modalStatus }">
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
              <input
                v-model="detail.imageUrl"
                type="text"
                class="form-control mb-3"
                name=""
                id="imgUrl"
                placeholder="請輸入圖片連結"
              />
            </div>
            <img class="img-fluid" :src="detail.imageUrl" alt="商品預設圖片" />
            <div class="form-group">
              <label for="imageUrl">其他圖片</label>
              <div class="images_controler">
                <input
                  v-model="imagesUrl"
                  type="text"
                  class="form-control"
                  name=""
                  id="imgsUrl"
                  placeholder="請輸入圖片連結"
                />
                <a @click.prevent="addImagesUrl" href="#">新增圖片</a>
              </div>
              <ul class="images_container">
                <li
                  v-for="(item, index) in detail.imagesUrl"
                  :key="index"
                  class=""
                >
                  <div :style="`background-image:url(${item})`">
                    <a href="#" @click.prevent="removeImagesUrl(index)">
                      <span class="material-icons">close</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="form-group mb-2">
              <label for="title">標題</label>
              <input
                v-model="detail.title"
                id="title"
                class="form-control"
                type="text"
                name=""
                placeholder="請輸入標題"
              />
            </div>
            <div class="row">
              <div class="form-group col-md-6 mb-2">
                <label for="category">分類</label>
                <input
                  v-model="detail.category"
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類"
                />
              </div>
              <div class="form-group col-md-6 mb-2">
                <label for="unit">單位</label>
                <input
                  v-model="detail.unit"
                  id="unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位"
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6 mb-3">
                <label for="origin_price">原價</label>
                <input
                  v-model.number="detail.origin_price"
                  id="origin_price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入原價"
                />
              </div>
              <div class="form-group col-md-6 mb-3">
                <label for="price">售價</label>
                <input
                  v-model.number="detail.price"
                  id="price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入售價"
                />
              </div>
              <div class="form-group col-md-6 mb-3">
                <label for="ribbon">特別訊息</label>
                <input
                  v-model="detail.onsale"
                  id="ribbon"
                  class="form-control"
                  placeholder="請輸入緞帶訊息"
                />
              </div>
              <hr />
              <div class="form-group col-md-12 specifications_controler">
                <label for="specifications">商品規格</label>
                <div>
                  <input
                    v-model.trim="standard"
                    id="specifications"
                    class="form-control"
                    placeholder="請輸入規格"
                  />
                  <a @click.prevent="addStandard" href="#">新增規格</a>
                </div>
              </div>
              <ul class="product_specifications">
                <li v-for="item in detail.specifications" :key="item">
                  <span>{{ item }}</span>
                  <a href="#" @click.prevent="removeStandard(item)">
                    <span class="material-icons">close</span>
                  </a>
                </li>
              </ul>
              <hr />
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  v-model="detail.description"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  v-model="detail.content"
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    v-model="detail.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <a @click.prevent="addProduct" v-if="isNew" class="works_btn" href="#"
          >新增</a
        >
        <a @click.prevent="updateProduct" v-else class="works_btn" href="#"
          >更新</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isNew: Boolean
  },
  emits: [
    'bubbleOpen', 'emitAdd', 'emitUpdate'
  ],
  data () {
    return {
      standard: '',
      imagesUrl: '',
      detail: {
        specifications: [],
        imagesUrl: []
      },
      modalStatus: false
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
      const readToAdd = { data: this.detail }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, readToAdd)
        .then(res => {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('emitAdd')
            vm.leaveModal()
          } else {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(() => {
          vm.$emit('bubbleOpen', '連線錯誤')
          vm.$store.commit('startLoading', false)
        })
    },
    updateProduct () {
      const vm = this
      vm.$store.commit('startLoading', true)
      const readyToUpdate = { data: vm.detail }
      vm.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${vm.detail.id}`, readyToUpdate)
        .then(res => {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('emitUpdate')
            vm.leaveModal()
          } else {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(() => {
          vm.$emit('bubbleOpen', '連線錯誤')
          vm.$store.commit('startLoading', false)
        })
    },
    addStandard () {
      this.detail.specifications.push(this.standard)
      this.standard = ''
    },
    removeStandard (item) {
      const index = this.detail.specifications.indexOf(item)
      this.detail.specifications.splice(index, 1)
    },
    addImagesUrl () {
      this.detail.imagesUrl.push(this.imagesUrl)
      this.imagesUrl = ''
    },
    removeImagesUrl (index) {
      this.detail.imagesUrl.splice(index, 1)
    }
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: all 0.3s;
  pointer-events: none;
}
.custom_product_modal_container.active {
  opacity: 1;
  pointer-events: auto;
}
.custom_model {
  width: 900px;
  position: fixed;
  top: -150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
  transition: all 0.5s;
}
.custom_model.active {
  top: 50%;
  z-index: 9;
}
.custom_model .header {
  background: #c2a09e;
  padding: 16px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom_model .header h2 {
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}
.custom_model .header .leave {
  color: #ffffff;
}
.custom_model .body {
  background: #ffffff;
  padding: 16px;
}
.images_container {
  display: flex;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  flex-wrap: wrap;
}
.images_container li {
  list-style: none;
  margin-right: 10px;
  margin-bottom: 10px;
}
.images_container li > div {
  height: 75px;
  width: 75px;
  background-size: cover;
  background-position: center;
  padding: 5px;
  position: relative;
}
.images_container li > div > a {
  text-decoration: none;
  color: #ffffff;
  position: absolute;
  top: 8px;
  right: 8px;
}
.images_container li > div > a > span {
  font-size: 16px;
}
.custom_model .footer {
  padding: 16px;
  background: #ffffff;
  border-top: 1px solid #dee2e6;
  text-align: right;
}
.footer .works_btn {
  background: #c2a09e;
  padding: 6px 10px;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
}
.images_controler {
  display: flex;
  align-items: center;
}
.images_controler > input {
  width: 60%;
}
.images_controler > a {
  width: 40%;
  background: #c2a09e;
  padding: 6px 10px;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #c2a09e;
  transition: all 0.3s;
}
.images_controler > a:hover {
  background: #ffffff;
  color: #c2a09e;
}
.specifications_controler > div {
  display: flex;
}
.specifications_controler > div > input {
  width: 80%;
}
.specifications_controler > div > a {
  width: 20%;
  background: #c2a09e;
  padding: 6px 10px;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #c2a09e;
  transition: all 0.3s;
}
.specifications_controler > div > a:hover {
  background: #ffffff;
  color: #c2a09e;
}
.product_specifications {
  display: flex;
  margin: 10px 0;
}
.product_specifications li {
  list-style: none;
  background: #c2a09e;
  border-radius: 5px;
  color: #ffffff;
  padding: 2.5px 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.product_specifications li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  margin-left: 5px;
}
.product_specifications li a .material-icons {
  font-size: 14px;
}
</style>
