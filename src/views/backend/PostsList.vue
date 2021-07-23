<template>
      <div class="header_tools_container">
        <h1>文章列表</h1>
        <a @click.prevent="openModal(true)" class="add_post" href="#">新增文章</a>
    </div>
    <table class="posts_list">
        <thead>
            <tr>
                <th>文章標題</th>
                <th>文章作者</th>
                <th>發佈日期</th>
                <th>文章標籤</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id">
                <td>{{item.title}}</td>
                <td>{{item.author}}</td>
                <td>{{fix_time_format(item.create_at)}}</td>
                <td>{{item.tag}}</td>
                <td>
                    <span class="text-success" v-if="item.isPublic">啟用</span>
                    <span class="text-danger" v-else>未啟用</span>
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
    <PostModal @bubble-open="bubbleTrigger" @delete="tempPost = {} " @update="getPosts" :isnew="isNew" ref="postModal" :edit-id="tempPost.id"></PostModal>
    <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
</template>

<script>
import PostModal from '@/components/backend/PostModal.vue'
export default {
  data () {
    return {
      list: [],
      pagination: {},
      tempPost: {},
      isNew: false,
      bubbleText: ''
    }
  },
  methods: {
    openModal (isNew, item) {
      const postModal = this.$refs.postModal
      if (isNew) {
        this.tempPost = {}
        this.isNew = true
        postModal.openModal()
      } else {
        this.tempPost = { ...item }
        this.isNew = false
        postModal.openModal()
      }
    },
    getPosts (page = 1) {
      var vm = this
      vm.$store.commit('startLoading', true)
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`)
        .then(function (res) {
          console.log(res)
          if (res.data.success) {
            vm.list = res.data.articles
            vm.pagination = res.data.pagination
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
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
  components: {
    PostModal
  },
  created () {
    this.getPosts()
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
.add_post {
  background: #c2a09e;
  color:#ffffff;
  padding: 6px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: all .3s;
  border:1px solid #c2a09e;
}
.add_post:hover{
  background: #ffffff;
  color:#c2a09e;
}
 .edit span{
  color:#c2a09e;
}
  .remove span {
  color:#4a4a4a;
}
.posts_list {
  width: 100%;
}
.posts_list  td , .posts_list th {
    padding: 15px;
  }
.posts_list tbody tr:nth-child(odd) {
 background: #f1f2f6;
}
</style>
