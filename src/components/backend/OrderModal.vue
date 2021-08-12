<template>
  <div class="order_modal_container" :class="{ active: modalStatus }">
    <div class="order_modal" :class="{ active: modalStatus }">
      <div class="header">
        <h2>修改訂單</h2>
        <a @click.prevent="leaveModal" href="#" class="leave">
          <span class="material-icons">close</span>
        </a>
      </div>
      <div class="body">
        <div>
          <div class="row">
            <div class="order_block col-6">
              <h3>訂單資訊</h3>
              <div class="order_item_group">
                <span>訂單建立時間</span>
                <span>{{ fix_time_format(tempOrder.create_at) }}</span>
              </div>
              <div class="order_item_group">
                <span>訂單編號</span>
                <span>{{ tempOrder.id }}</span>
              </div>
            </div>
            <div class="order_block col-6">
              <h3>付款資訊</h3>
              <div class="order_item_group">
                <label for="create_time">付款狀態</label>
                <div class="d-flex w-50">
                  <input
                    v-model="tempOrder.is_paid"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <span v-if="tempOrder.is_paid" class="text-success mx-2"
                    >已付款</span
                  >
                  <span v-else class="text-danger mx-2">未付款</span>
                </div>
              </div>
              <div class="order_item_group">
                <span>運送方式</span>
                <span>宅配到府</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="order_block col-6">
              <h3>訂單明細</h3>
              <table class="order_product_list">
                <thead>
                  <tr>
                    <th></th>
                    <th>品名</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <td class="text-center">
                      <img
                        class="thumbnail"
                        :src="item.product.imageUrl"
                        alt=""
                      />
                    </td>
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.product.price }}</td>
                    <td>{{ item.qty }} {{ item.product.unit }}</td>
                    <td>{{ item.final_total }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="product_price_total">
                <span>總金額 NT {{ tempOrder.total }}</span>
              </div>
            </div>
            <div class="order_block col-6">
              <h3>顧客資訊</h3>
              <div class="order_item_group">
                <label for="create_time">姓名</label>
                <input
                  v-model="tempOrder.user.name"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="order_item_group">
                <label for="create_time">E-mail</label>
                <input
                  v-model="tempOrder.user.email"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="order_item_group">
                <label for="create_time">電話</label>
                <input
                  v-model="tempOrder.user.tel"
                  class="form-control"
                  type="tel"
                />
              </div>
              <div class="order_item_group">
                <label for="create_time">地址</label>
                <input
                  v-model="tempOrder.user.address"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="order_item_group">
                <label for="create_time">備註</label>
                <input
                  v-model="tempOrder.user.message"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <a @click.prevent="updateOrder" class="update" href="#">更新</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object
  },
  data () {
    return {
      modalStatus: false,
      tempOrder: {
        user: {
          name: '',
          email: '',
          address: '',
          tel: ''
        }
      }
    }
  },
  methods: {
    updateOrder () {
      const vm = this
      const readyToUpdate = { data: vm.tempOrder }
      vm.$store.commit('startLoading', true)
      vm.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${vm.tempOrder.id}`, readyToUpdate)
        .then(function (res) {
          if (res.data.success) {
            vm.$emit('emit-update')
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.leaveModal()
          }
        })
        .catch(function (err) {
          vm.$store.commit('startLoading', false)
          console.log(err)
        })
    },
    openModal () {
      this.modalStatus = true
    },
    leaveModal () {
      this.modalStatus = false
      this.tempOrder = JSON.parse(JSON.stringify(this.order))
    },
    fix_time_format (time) {
      const nowTime = new Date(time * 1000)
      return `${nowTime.getFullYear()}/${nowTime.getMonth() + 1}/${nowTime.getDate()}`
    }
  },
  computed: {
    timeStamp: function () {
      const date = new Date(this.tempOrder.date)
      return date.getMilliseconds()
    }
  },
  watch: {
    order () {
      this.tempOrder = JSON.parse(JSON.stringify(this.order))
    }
  }
}
</script>

<style scoped>
.order_modal_container {
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
.order_modal_container.active {
  opacity: 1;
  pointer-events: auto;
}
.order_modal {
  width: 1000px;
  position: fixed;
  top: -150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
  transition: all 0.5s;
}
.order_modal.active {
  top: 50%;
}
.order_modal .header {
  background: #c2a09e;
  padding: 16px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order_modal .header h2 {
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}
.order_modal .header .leave {
  color: #ffffff;
}
.order_modal .body {
  background: #ffffff;
  padding: 16px;
}
.order_modal .footer {
  padding: 16px;
  background: #ffffff;
  border-top: 1px solid #dee2e6;
  text-align: right;
}
.order_modal .footer .update {
  background: #c2a09e;
  padding: 6px 10px;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
}
.order_block h3 {
  font-size: 24px;
  border-bottom: 2px solid #c2a09e;
  padding-bottom: 5px;
  margin: 20px 0;
}
.order_item_group {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.order_item_group label,
.order_item_group span:nth-child(1) {
  width: 40%;
}
.order_item_group input:not([type="checkbox"]),
.order_item_group span:nth-child(2) {
  width: 60%;
}
.order_product_list {
  width: 100%;
}
.order_product_list .thumbnail {
  height: 50px;
  width: 50px;
}
.order_product_list thead tr {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
}
.order_product_list thead tr th {
  padding: 3px;
}
.order_product_list tbody td {
  padding-top: 10px;
}
.product_price_total {
  border-top: 1px solid #dee2e6;
  margin-top: 10px;
  padding-top: 10px;
  text-align: right;
  padding-right: 20px;
}
</style>
