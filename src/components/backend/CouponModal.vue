<template>
  <div class="coupon_modal_container" :class="{ active: modalStatus }">
    <div class="coupon_modal" :class="{ active: modalStatus }">
      <div class="header">
        <h2 v-if="isnew">新增優惠券</h2>
        <h2 v-else>更新優惠券</h2>
        <a @click.prevent="leaveModal" href="#" class="leave">
          <span class="material-icons">close</span>
        </a>
      </div>
      <div class="body">
        <div class="form-group mt-2">
          <label for="title">優惠券標題</label>
          <input
            v-model="couponDetail.title"
            type="text"
            class="form-control"
            name=""
          />
        </div>
        <div class="form-group mt-2">
          <label for="due">優惠券到期日</label>
          <input v-model="due_date" type="date" class="form-control" name="" />
        </div>
        <div class="form-group mt-2">
          <label for="percent">折扣 % 數</label>
          <input
            v-model.number="couponDetail.percent"
            min="0"
            max="100"
            type="number"
            class="form-control"
            name=""
          />
        </div>
        <div class="form-group">
          <label for="percent">折扣碼</label>
          <input
            v-model="couponDetail.code"
            type="text"
            class="form-control"
            name=""
          />
        </div>
        <div class="form-check">
          <input
            v-model="couponDetail.is_enabled"
            :true-value="1"
            :false-value="0"
            id="is_enabled"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="is_enabled">是否啟用</label>
        </div>
      </div>
      <div class="footer">
        <a @click.prevent="addCoupon" v-if="isnew" class="works_btn" href="#"
          >新增</a
        >
        <a @click.prevent="updateCoupon" v-else class="works_btn" href="#"
          >更新</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isnew: Boolean,
    coupon: Object
  },
  data () {
    return {
      couponDetail: {
        percent: 0,
        is_enabled: Boolean,
        due_date: 0
      },
      due_date: '',
      modalStatus: false,
      token: ''
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
    },
    leaveModal () {
      this.modalStatus = false
      this.due_date = ''
      this.couponDetail = JSON.parse(JSON.stringify(this.coupon))
    },
    addCoupon () {
      const vm = this
      const readyToAdd = { data: vm.couponDetail }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, readyToAdd)
        .then(function (res) {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.leaveModal()
            vm.$emit('emit-update')
          } else {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
        })
    },
    updateCoupon () {
      const vm = this
      const readyToUpdate = { data: vm.couponDetail }
      vm.$store.commit('startLoading', true)
      vm.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${vm.couponDetail.id}`, readyToUpdate)
        .then(function (res) {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.leaveModal()
            vm.$emit('emit-update')
          } else {
            vm.$emit('bubbleOpen', res.data.message)
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
    due_date () {
      this.couponDetail.due_date = Math.floor(new Date(this.due_date) / 1000)
    },
    coupon () {
      if (!this.isnew) {
        this.couponDetail = JSON.parse(JSON.stringify(this.coupon))
        const dateAndTime = new Date(this.couponDetail.due_date * 1000)
          .toISOString().split('T')
        this.due_date = dateAndTime[0]
      } else {
        this.couponDetail = {
          percent: 0,
          is_enabled: 0,
          due_date: 0
        }
      }
    }
  }
}
</script>

<style scoped>
.coupon_modal_container {
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
.coupon_modal_container.active {
  opacity: 1;
  pointer-events: auto;
}
.coupon_modal {
  width: 600px;
  position: fixed;
  top: -150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
  transition: all 0.5s;
}
.coupon_modal.active {
  top: 50%;
}
.coupon_modal .header {
  background: #c2a09e;
  padding: 16px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.coupon_modal .header h2 {
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}
.coupon_modal .header .leave {
  color: #ffffff;
}
.coupon_modal .body {
  background: #ffffff;
  padding: 16px;
}
.coupon_modal .footer {
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
</style>
