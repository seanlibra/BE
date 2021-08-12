<template>
  <div class="del_coupon_modal_container" :class="{ active: modalStatus }">
    <div class="del_coupon_modal" :class="{ active: modalStatus }">
      <div class="header">
        <h2>刪除優惠券</h2>
        <a href="#" class="leave" @click.prevent="leaveModal">
          <span class="material-icons">close</span>
        </a>
      </div>
      <div class="body">
        <div v-if="isall">
          是否確定刪除 <span class="text-danger">所有優惠券?</span>
        </div>
        <div v-else>
          是否確定刪除優惠券
          <span class="text-danger">{{ tempCoupon.title }}</span> ?
        </div>
      </div>
      <div class="footer">
        <a v-if="isall" class="comfirm" href="#">刪除所有優惠券</a>
        <a v-else @click.prevent="deleteCoupon" class="comfirm" href="#"
          >確定</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isall: Boolean,
    coupon: Object
  },
  data () {
    return {
      modalStatus: false,
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      token: '',
      tempCoupon: {}
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
    },
    leaveModal () {
      this.modalStatus = false
    },
    deleteCoupon () {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.delete(`${vm.url}/api/${vm.path}/admin/coupon/${vm.tempCoupon.id}`, {
        headers: {
          Authorization: vm.token
        }
      })
        .then(function (res) {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.leaveModal()
            vm.$emit('emit-update')
          } else {
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = { ...this.coupon }
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue_class\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.token = token
  }
}
</script>

<style scoped>
.del_coupon_modal_container {
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
.del_coupon_modal_container.active {
  opacity: 1;
  pointer-events: auto;
}
.del_coupon_modal {
  width: 600px;
  position: fixed;
  top: -150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
  transition: all 0.5s;
}
.del_coupon_modal .header h2 {
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}
.del_coupon_modal.active {
  top: 50%;
}
.del_coupon_modal .header {
  background: #c2a09e;
  padding: 16px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.del_coupon_modal .header .leave {
  color: #ffffff;
}
.del_coupon_modal .body {
  background: #ffffff;
  padding: 16px;
}
.del_coupon_modal .footer {
  padding: 16px;
  background: #ffffff;
  border-top: 1px solid #dee2e6;
  text-align: right;
}
.del_coupon_modal .footer .comfirm {
  background: #c2a09e;
  padding: 6px 10px;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
}
</style>
