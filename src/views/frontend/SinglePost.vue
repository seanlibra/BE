<template>
  <div class="single_post">
    <Header :text-dark="true"></Header>
      <div class="container wrapper">
           <div class="content">
               <img class="thumbnail" :src="post.imageUrl" alt="">
               <h2>{{post.title}}</h2>
               <div class="post_info">
                <div class="info_group">
                    <span class="material-icons">
                        person
                    </span>
                    <span>{{post.author}}</span>
                </div>
                <div class="info_group">
                    <span class="material-icons">
                    schedule
                    </span>
                    <span>{{fix_data_format()}}</span>
                </div>
                <div class="info_group">
                    <span class="material-icons">
                        bookmark
                    </span>
                    <span>{{post.tag}}</span>
                </div>
               </div>
               <div v-html="post.content" class="post_content"></div>
           </div>
           <div class="posts_sidebar"></div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/frontend/Header.vue'
import Footer from '@/components/frontend/Footer.vue'
export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      post: {}
    }
  },
  methods: {
    getPost () {
      var vm = this
      var id = vm.$route.params.id
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/article/${id}`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.post = res.data.article
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
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
  watch: {
    post () {

    }
  },
  created () {
    this.getPost()
  },
  components: {
    Header, Footer
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 70px;
  display: flex;
}
.content {
  width: 75%;
  padding: 20px;

}
.content .thumbnail {
  width: 100%;
  height:400px;
  margin-bottom: 20px;
}
.content h2 {
  letter-spacing: 1px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
}
.post_info {
  border-top:1px solid #f1f1f1;
  border-bottom:1px solid #f1f1f1;
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
.posts_sidebar {
  width: 25%;
  border-left:1px solid #f1f1f1
}
</style>
