<template>
    <div class="del_product_modal_container" :class="{ active : modalStatus }">
        <div class="del_product_modal" :class="{ active : modalStatus }">
            <div class="header">
                <h3>刪除產品</h3>
                <a href="#" class="leave" @click.prevent = leaveModal>
                    <span class="material-icons">close</span>
                </a>
            </div>
            <div class="body">是否確定刪除產品 <span class="text-danger">{{product.title}}</span> ? </div>
            <div class="footer">
                <a @click.prevent="delProduct" class="cofirm" href="#">確定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  data () {
    return {
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
    delProduct () {
      var vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${vm.product.id}`)
        .then(function (res) {
          if (res.data.success) {
            console.log(res)
            vm.$store.commit('startLoading', false)
            vm.$emit('bubbleOpen', res.data.message)
            vm.leaveModal()
            vm.$emit('emit-del')
          } else {
            console.log(res)
            alert(res.data.message)
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(function (err) {
          console.log(err)
          vm.$store.commit('startLoading', false)
          alert(err.data.message)
          vm.leaveModal()
        })
    }
  }
}
</script>

<style scoped>
  .del_product_modal_container {
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background-color: rgba(255,255,255,0.7);
      opacity: 0;
      pointer-events: none;
      transition: all .3s;
  }
  .del_product_modal_container.active {
      opacity: 1;
      pointer-events: auto;
  }
  .del_product_modal {
       /* max-height:500px; */
        width:500px;
        /* border:1px solid #000000; */
        position: fixed;
        top:-150%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
        box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
        transition: all .5s;
  }
  .del_product_modal.active {
      top:50%
  }
  .del_product_modal .header {
      background:#c2a09e;
      padding: 16px;
      font-size: 16px;
      color:#ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .del_product_modal .header .leave {
      color:#ffffff;
  }
  .del_product_modal .header h3 {
      font-size: 16px;
      color:#ffffff;
      margin: 0;
  }
  .del_product_modal .body {
      padding: 16px;
      background: #ffffff;
  }
  .del_product_modal .footer {
      padding: 16px;
      border-top:1px solid #dee2e6;
      background: #ffffff;
      text-align: right;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
  }
  .footer .cofirm {
        background: #c2a09e;
        padding: 6px 10px;
        color:#ffffff;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
