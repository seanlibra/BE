<template>
  <div class="single_post">
    <Header :text-dark="true"></Header>
    <div class="container wrapper">
      <div class="content">
        <img class="thumbnail" :src="post.imageUrl" alt="" />
        <h2>{{ post.title }}</h2>
        <div class="post_info">
          <div class="info_group">
            <span class="material-icons"> person </span>
            <span>{{ post.author }}</span>
          </div>
          <div class="info_group time">
            <span class="material-icons"> schedule </span>
            <span>{{ fix_data_format() }}</span>
          </div>
          <div class="info_group">
            <span class="material-icons"> bookmark </span>
            <span>{{ post.tag }}</span>
          </div>
        </div>
        <div v-html="post.content" class="post_content"></div>
        <h4 class="share_this_post_title">分享這篇文章</h4>
        <div class="soical_media_container">
          <a
            target="_blank"
            style="background-image: url('https://i.imgur.com/sUM6rZ1.png')"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
          ></a>
          <a
            target="_blank"
            style="background-image: url('https://i.imgur.com/rxHpEdl.png')"
            :href="`http://www.twitter.com/share?url=${pageUrl}`"
          ></a>
          <a
            target="_blank"
            style="background-image: url('https://i.imgur.com/i9i9Hpf.png')"
            :href="`https://t.me/share/url?url=${pageUrl}&text=hey! check this out`"
          ></a>
          <a
            target="_blank"
            style="background-image: url('https://i.imgur.com/mQ6bpWS.png')"
            :href="`https://api.whatsapp.com/send?text=${pageUrl}`"
          ></a>
          <a
            style="background-image: url('https://i.imgur.com/jMyZwmb.png')"
            href="#"
          ></a>
        </div>
      </div>
      <Sidebar :posts="post_list"></Sidebar>
    </div>
    <Loading v-if="loading"></Loading>
    <Footer></Footer>
    <Bubble ref="bubble" :bubbleText="bubbleText"></Bubble>
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
import Sidebar from '@/components/frontend/PostsSidebar.vue'
import Loading from '@/components/Loading.vue'
export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      post: {},
      post_list: [],
      pageUrl: '',
      bubbleText: ''
    }
  },
  methods: {
    getPostList (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/articles?page=${page}`)
        .then(res => {
          if (res.data.success) {
            vm.post_list = res.data.articles
            vm.$store.commit('startLoading', false)
          } else {
            vm.bubbleText = res.data.message
            vm.$refs.bubble.bubbleACtive()
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(() => {
          vm.bubbleText = '連線錯誤'
          vm.$refs.bubble.bubbleACtive()
          vm.$store.commit('startLoading', false)
        })
    },
    getPost () {
      const vm = this
      const id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/article/${id}`)
        .then(res => {
          if (res.data.success) {
            vm.post = res.data.article
            vm.$store.commit('startLoading', false)
          } else {
            vm.bubbleText = res.data.message
            vm.$refs.bubble.bubbleACtive()
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(() => {
          vm.bubbleText = '連線錯誤'
          vm.$refs.bubble.bubbleACtive()
          vm.$store.commit('startLoading', false)
        })
    },
    fix_data_format () {
      if (this.post.create_at) {
        const dateAndTime = new Date(this.post.create_at * 1000)
          .toISOString().split('T')
        return dateAndTime[0]
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.getPost()
    this.getPostList()
    this.pageUrl = document.location.href
  },
  components: {
    Header, Footer, Sidebar, Loading
  },
  watch: {
    $route (to, from) {
      if (to.name === 'post') {
        this.getPost()
      }
    }
  }
}
</script>

<style>
.post_content {
  font-family: "Noto Sans TC", sans-serif;
}
.post_content p {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 26px;
}
.post_content h2 {
  font-size: 30px;
  color: #fe5252;
  letter-spacing: 1px;
}
.post_content img {
  max-width: 100%;
}
@media (max-width: 768px) {
  .post_content img {
    width: 100%;
  }
}
</style>

<style scoped>
.wrapper {
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
}
.content {
  width: 75%;
  padding: 20px;
}
.content .thumbnail {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  object-fit: cover;
}
.content h2 {
  letter-spacing: 1px;
  margin-bottom: 20px;
  font-family: "Noto Sans TC", sans-serif;
  font-size: 30px;
}
.post_info {
  font-family: "Noto Sans TC", sans-serif;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  padding: 15px 0;
  display: flex;
  margin-bottom: 20px;
}
.post_info .info_group {
  display: flex;
  align-items: center;
  margin: 0 10px;
}
.post_info .info_group span {
  margin-right: 5px;
}
.post_content {
  margin-bottom: 15px;
  border-bottom: 1px solid #e9e9e9;
}
.share_this_post_title {
  font-family: "Noto Sans TC", sans-serif;
  border-left: 3px solid #fe5252;
  padding-left: 16px;
  font-size: 18px;
  letter-spacing: 1px;
}
.soical_media_container {
  /* border-top:1px solid #e9e9e9; */
  padding-top: 5px;
}
.soical_media_container {
  display: flex;
}
.soical_media_container a {
  width: 30px;
  height: 30px;
  background-size: contain;
  margin-right: 15px;
  transition: all 0.3s;
}
.soical_media_container a:hover {
  opacity: 0.5;
}
img {
  width: 31%;
  margin: 0 1%;
  object-fit: cover;
}
@media(max-width:768px) {
  .content {
    width: 100%;
    padding: 10px;
  }
}
@media (max-width: 414px) {
  .wrapper {
    padding-top: 35px;
    padding-bottom: 35px;
  }
  .content h2 {
    font-size: 24px;
  }
  .share_this_post_title {
    font-size: 24px;
    font-weight: bold;
  }
  .post_info .info_group {
    font-size: 16px;
    margin: 0 5px;
    width: 45%;
  }
  .post_info .info_group.time {
    display: none;
  }
}
@media(max-width: 320px) {
  .post_info .info_group {
    font-size: 14px;
    margin: 0 3px;
  }
  .post_info .info_group .material-icons {
    font-size: 14px;
  }
}
</style>
