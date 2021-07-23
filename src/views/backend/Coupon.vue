<template>
    <div class="header_tools_container">
        <h1>優惠券列表</h1>
        <div class="tools">
            <a class="add_coupon" href="#" @click.prevent="openModal(true)">新增優惠券</a>
            <a class="del_all_coupon" @click.prevent="openDelModal(true)"  href="#">刪除所有優惠券</a>
        </div>
    </div>
    <table class="coupons_list">
      <thead>
        <tr>
          <th>優惠券標題</th>
          <th>折扣百分比</th>
          <th>折扣碼</th>
          <th>到期日期</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.code}}</td>
          <td>{{fix_time_format(item.due_date)}}</td>
          <td>
            <div>
                <!-- <input  :true-value="1" :false-value="0"  id="is_enabled" class="form-check-input" type="checkbox"> -->
                <span v-if="item.is_enabled" class="text-success">已啟用</span>
                <span v-else class="text-danger">未啟用</span>
            </div>
          </td>
          <td>
             <a @click.prevent="openModal(false,item)" href="#" class="edit">
                    <span class="material-icons">mode_edit</span>
              </a>
              <a @click.prevent="openDelModal(false,item)" href="#" class="remove">
                    <span class="material-icons">close</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example" class="mt-3" >
        <ul class="pagination justify-content-center custom_pagination">
          <li class="page-item" :class="{ disabled : !pagination.has_pre }"><a @click.prevent="getCoupons( pagination.current_page - 1 )" class="page-link" href="#">Previous</a></li>
          <li :class="{ active:pagination.current_page == item }" v-for="(item,index) in pagination.total_pages" :key="index" class="page-item"><a @click.prevent="getCoupons( index + 1 )" class="page-link" href="#">{{index + 1}}</a></li>
          <li class="page-item" :class="{ disabled : !pagination.has_next }"><a @click.prevent="getCoupons( pagination.current_page + 1 )" class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    <CouponModal @bubble-open="bubbleTrigger" @emit-update="getCoupons" :isnew="isNew" :coupon="tempCoupon" ref="couponModal"></CouponModal>
    <CouponDelModal @bubble-open="bubbleTrigger" @emit-update="getCoupons  " :isall="isAll" :coupon="tempCoupon" ref="couponDelModal"></CouponDelModal>
     <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue'
import CouponDelModal from '@/components/backend/CouponDelModal.vue'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isAll: false,
      pagination: {},
      bubbleText: ''
    }
  },
  methods: {
    getCoupons (page = 1) {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then(function (res) {
          if (res.data.success) {
            vm.coupons = res.data.coupons
            vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        console.log(true)
      } else {
        this.tempCoupon = item
        this.isNew = false
        console.log(false)
      }
      this.$refs.couponModal.openModal()
    },
    openDelModal (isall, item) {
      if (isall) {
        this.isAll = true
        this.tempCoupon = {
          percent: 0,
          is_enabled: 0,
          due_date: 0
        }
      } else {
        this.isAll = false
        this.tempCoupon = item
      }
      this.$refs.couponDelModal.openModal()
    },
    fix_time_format (time) {
      const localDate = new Date(time * 1000)
      return localDate.toLocaleDateString()
    },
    bubbleTrigger (message) {
      var vm = this
      vm.bubbleText = message
      vm.$refs.bubble.bubbleACtive()
    }
  },
  created () {
    this.getCoupons()
  },
  components: {
    CouponModal, CouponDelModal
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
  .header_tools_container .tools a {
    background: #c2a09e;
    color:#ffffff;
    padding: 6px 16px;
    border-radius: 10px;
    text-decoration: none;
    transition: all .3s;
    border:1px solid #c2a09e;
    margin-left:15px;
  }
 .header_tools_container .tools a:hover {
  background: #ffffff;
  color:#c2a09e;
 }
  .coupons_list {
    width: 100%;
  }
  .coupons_list  td , .coupons_list th {
    padding: 15px;
  }
  .coupons_list  tbody tr:nth-child(odd) {
   background: #f1f2f6;
  }
 .edit span{
  color:#c2a09e;
}
  .remove span {
  color:#4a4a4a;
}
 .del_all_coupon {
   opacity: 0.5;
   pointer-events: none;
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
