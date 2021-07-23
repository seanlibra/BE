<template>
    <div class="header_tools_container">
        <h1>訂單列表</h1>
        <a class="del_all_orders" @click.prevent="DelAllOrder" href="#">刪除所有訂單</a>
    </div>
    <table class="order_list">
        <thead>
            <tr>
                <th><input type="checkbox"></th>
                <th>訂單建立時間</th>
                <th>訂單編號</th>
                <th>付款狀態</th>
                <th>總金額</th>
                <th>買家姓名</th>
                <th>編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id">
                <td><input type="checkbox"></td>
                <td>{{fix_time_format(item.create_at)}}</td>
                <td>{{item.id}}</td>
                <td>
                    <span class="text-success" v-if="item.is_paid">已付款</span>
                    <span class="text-danger" v-else>未付款</span>
                </td>
                <td>{{item.total}}</td>
                <td>{{item.user.name}}</td>
                <td>
                    <a @click.prevent="openModal(item)" href="#" class="edit">
                    <span class="material-icons">mode_edit</span>
                  </a>
                  <a @click.prevent="openDelModal(item)" href="#" class="remove">
                    <span class="material-icons">close</span>
                  </a>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example" class="mt-3" v-if="pagination.total > 1">
        <ul class="pagination justify-content-center custom_pagination">
          <li class="page-item" :class="{ disabled : !pagination.has_pre }"><a @click.prevent="getOrders( pagination.current_page - 1 )" class="page-link" href="#">Previous</a></li>
          <li :class="{ active:pagination.current_page == item }" v-for="(item,index) in pagination.total_pages" :key="index" class="page-item"><a @click.prevent="getOrders( index + 1 )" class="page-link" href="#">{{index + 1}}</a></li>
          <li class="page-item" :class="{ disabled : !pagination.has_next }"><a @click.prevent="getOrders( pagination.current_page + 1 )" class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    <OrderModal @bubble-open="bubbleTrigger" @emit-update="getOrders" ref="orderModal" :order="tempOrder"></OrderModal>
    <OrderDelModal @bubble-open="bubbleTrigger" @emit-delete="getOrders" ref="orderDelModal" :order="tempOrder" :isall="isAll"></OrderDelModal>
    <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
</template>

<script>
import OrderModal from '@/components/backend/OrderModal.vue'
import OrderDelModal from '@/components/backend/OrderDelModal.vue'
export default {
  data () {
    return {
      list: [],
      pagination: {},
      tempOrder: {
        user: {
          name: '',
          address: '',
          email: '',
          tel: ''
        }
      },
      isAll: false,
      bubbleText: ''
    }
  },
  methods: {
    getOrders (page = 1) {
      var vm = this
      vm.$store.commit('startLoading', true)
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then(function (res) {
          console.log(res)
          if (res.data.success) {
            vm.list = res.data.orders
            vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    fix_time_format (time) {
      var nowTime = new Date(time * 1000)
      // console.log(nowTime)
      return `${nowTime.getFullYear()}/${nowTime.getMonth() + 1}/${nowTime.getDate()}`
    },
    openModal (item) {
      this.$refs.orderModal.openModal()
      this.tempOrder = item
    },
    openDelModal (item) {
      this.$refs.orderDelModal.openModal()
      this.isAll = false
      this.tempOrder = item
    },
    DelAllOrder () {
      this.$refs.orderDelModal.openModal()
      this.isAll = true
    },
    bubbleTrigger (message) {
      var vm = this
      vm.bubbleText = message
      vm.$refs.bubble.bubbleACtive()
    }
  },
  created () {
    this.getOrders()
  },
  components: {
    OrderModal, OrderDelModal
  }
}
</script>

<style scoped>
  .header_tools_container {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .header_tools_container h1 {
    font-size: 24px;
    font-weight: bold;
  }
  .del_all_orders {
    background: #c2a09e;
    color:#ffffff;
    padding: 6px 16px;
    border-radius: 10px;
    text-decoration: none;
    transition: all .3s;
    border:1px solid #c2a09e;
  }
  .del_all_orders:hover{
  background: #ffffff;
  color:#c2a09e;
  }
  .order_list {
      width: 100%;
  }
  .order_list  td , .order_list th {
    padding: 15px;
  }
  .order_list  tbody tr:nth-child(odd) {
   background: #f1f2f6;
  }
  .edit span{
  color:#c2a09e;
}
  .remove span {
  color:#4a4a4a;
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
