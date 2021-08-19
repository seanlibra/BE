<template>
  <div class="post_modal_container" :class="{ active: modalStatus }">
    <div class="post_modal" :class="{ active: modalStatus }">
      <div class="header">
        <h2 v-if="isnew">新增文章</h2>
        <h2 v-else>編輯文章</h2>
        <a @click.prevent="leaveModal" href="#" class="leave">
          <span class="material-icons">close</span>
        </a>
      </div>
      <div class="body">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label class="mb-2" for="imageUrl">特色圖片</label>
              <input
                v-model="tempPost.imageUrl"
                type="text"
                class="form-control mb-3"
                name="imageUrl"
                placeholder="請輸入圖片連結"
              />
            </div>
            <img class="img-fluid" :src="tempPost.imageUrl" alt="文章特色圖片" />
            <div class="form-group mt-2">
              <label class="my-1" for="title">文章標題</label>
              <input
                v-model="tempPost.title"
                type="text"
                class="form-control"
                name="title"
              />
            </div>
            <div class="form-group mt-2">
              <label class="my-1" for="due">發佈日期</label>
              <input
                v-model="due_date"
                type="date"
                class="form-control"
                name="due_date"
              />
            </div>
            <div class="form-group mt-2">
              <label class="my-1" for="author">文章作者</label>
              <input
                v-model="tempPost.author"
                type="text"
                class="form-control"
                name="author"
              />
            </div>
            <div class="form-group">
              <label class="my-1" for="tags">文章標籤</label>
              <input
                v-model="tempPost.tag"
                type="text"
                class="form-control"
                name="tags"
              />
            </div>
            <div class="form-check">
              <input
                v-model="isPublic"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
          <div class="col-8">
            <div class="form-group">
              <label class="my-1" for="content">文章內容</label>
              <div class="post_content_scroll">
                <ckeditor
                  :editor="editor"
                  v-model="tempPost.content"
                  class="form-control post_content"
                  name="content"
                ></ckeditor>
              </div>
            </div>
            <div class="form-group">
              <label class="my-1" for="excerpt">文章簡述</label>
              <textarea
                v-model="tempPost.description"
                class="form-control post_excerpt"
                name="excerpt"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <a @click.prevent="addPost" v-if="isnew" class="works_btn" href="#"
          >新增</a
        >
        <a @click.prevent="updatePost" v-else class="works_btn" href="#"
          >更新</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import ImageInsert from '@ckeditor/ckeditor5-image'
export default {
  props: {
    isnew: Boolean,
    editId: String
  },
  emits: [
    'bubbleOpen', 'update', 'delete_id'
  ],
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['bold', 'italic', '|', 'link']
      },
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      list: [],
      pagination: {},
      tempPost: {
        isPublic: false
      },
      isNew: false,
      due_date: '',
      isPublic: 0,
      modalStatus: false,
      edit_post_id: ''
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
      if (this.isnew) {
        this.tempPost = {
          isPublic: false
        }
        this.due_date = ''
      }
    },
    getEditPost () {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${vm.editId}`)
        .then(res => {
          if (res.data.success) {
            vm.tempPost = res.data.article
            const dateAndTime = new Date(vm.tempPost.create_at * 1000)
              .toISOString().split('T')
            vm.due_date = dateAndTime[0]
            vm.$store.commit('startLoading', false)
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
    updatePost () {
      const vm = this
      vm.$store.commit('startLoading', true)
      const readyToUpdate = { data: this.tempPost }
      vm.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${vm.editId}`, readyToUpdate)
        .then(res => {
          if (res.data.success) {
            vm.$store.commit('startLoading', false)
            vm.$emit('bubbleOpen', res.data.message)
            vm.$emit('update')
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
    leaveModal () {
      this.modalStatus = false
      this.$emit('delete_id')
    },
    addPost () {
      const vm = this
      const readToAdd = { data: this.tempPost }
      vm.$store.commit('startLoading', true)
      vm.$http.post(`${vm.url}/api/${vm.path}/admin/article`, readToAdd)
        .then(res => {
          if (res.data.success) {
            vm.$emit('bubbleOpen', res.data.message)
            vm.$store.commit('startLoading', false)
            vm.$emit('update')
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
    }
  },
  watch: {
    due_date () {
      if (!this.isnew) {
        this.tempPost.create_at = Math.floor(new Date(this.due_date) / 1000)
      }
    },
    isPublic (n, o) {
      if (this.isnew) {
        if (n === 1) {
          this.tempPost.isPublic = true
        } else {
          this.tempPost.isPublic = false
        }
      }
    },
    editId (n, o) {
      if (n) {
        this.getEditPost()
      }
    },
    isnew (n) {
      if (n) {
        this.tempPost = {
          isPublic: false
        }
      }
    }
  }
}
</script>

<style>
.post_modal_container {
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
.post_modal_container.active {
  opacity: 1;
  pointer-events: auto;
}
.post_modal {
  width: 1000px;
  position: fixed;
  top: -150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  box-shadow: 10px 10px 30px -10px rgb(0 0 0 / 25%);
  transition: all 0.5s;
}
.post_modal.active {
  top: 50%;
}
.post_modal .header {
  background: #c2a09e;
  padding: 16px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post_modal .header h2 {
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}
.post_modal .header .leave {
  color: #ffffff;
}
.post_modal .body {
  background: #ffffff;
  padding: 16px;
}
.post_modal .footer {
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
.post_content_scroll {
  overflow-y: auto;
  height: 600px;
}
.post_content {
  height: 350px;
}
.post_excerpt {
  height: 100px;
}
</style>
