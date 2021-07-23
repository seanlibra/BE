<template>
  <div class="del_order_modal_container" :class="{ active : modalStatus }">
      <div class="del_order_modal" :class="{ active : modalStatus }">
          <div class="header">
                <h2>刪除訂單</h2>
                <a href="#" class="leave" @click.prevent = leaveModal>
                    <span class="material-icons">close</span>
                </a>
            </div>
            <div class="body">
                 <div v-if="isall">是否確定刪除 <span class="text-danger">所有訂單?</span></div>
                <div v-else>是否確定刪除訂單 <span class="text-danger">{{order.id}}</span> ? </div>
            </div>
            <div class="footer">
                <a v-if="isall" @click.prevent="delAllOrder" class="comfirm" href="#">刪除所有訂單</a>
                <a v-else @click.prevent="delOrder" class="comfirm" href="#">確定</a>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    isall: Boolean
  },
  data () {
    return {
      modalStatus: false,
      tempOrder: {}
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
    },
    leaveModal () {
      this.modalStatus = false
    },
    delOrder () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${vm.tempOrder.id}`)
        .then(function (res) {
          if (res.data.success) {
            // alert(res.data.message)
            vm.$emit('bubbleOpen', res.data.message)
            vm.$emit('emit-delete')
            vm.$store.commit('startLoading', false)
            vm.leaveModal()
          } else {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    delAllOrder () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`)
        .then(function (res) {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('emit-delete')
            vm.leaveModal()
          } else {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
    }
  }
}
</script>

<style scoped>
  .del_order_modal_container {
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
  .del_order_modal_container.active {
      opacity: 1;
      pointer-events: auto;
  }
  .del_order_modal {
        width:600px;
        position: fixed;
        top:-150%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
        box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
        transition: all .5s;
  }
  .del_order_modal.active {
      top:50%;
  }
  .del_order_modal .header {
        background:#c2a09e;
        padding: 16px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .del_order_modal .header h2 {
        font-size: 18px;
        color:#ffffff;
        margin: 0;
    }
    .del_order_modal .header .leave {
      color:#ffffff;
    }
    .del_order_modal .body {
        background: #ffffff;
        padding: 16px;
    }
    .del_order_modal .footer {
        padding: 16px;
        background: #ffffff;
        border-top:1px solid #dee2e6;
        text-align: right;
    }
    .del_order_modal .footer .comfirm {
        background: #c2a09e;
        padding: 6px 10px;
        color:#ffffff;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
