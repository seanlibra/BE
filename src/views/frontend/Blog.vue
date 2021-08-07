<template>
  <div class="Blog">
    <Header :text-dark="true"></Header>
      <div class="container wrapper">
          <div class="content">
              <ul class="post_list">
               <li v-for="post in current_category_post_list" :key="post.id">
                    <router-link :to="`/post/${post.id}`" class="thumbnail" :style="`background-image:url(${post.imageUrl})`" alt="">
                      <div class="thumbnail_overlay"></div>
                    </router-link>
                    <div class="post_info_container">
                      <h3>
                          <router-link :to="`/post/${post.id}`">{{post.title}}</router-link>
                    </h3>
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
                                <span>{{fix_data_format(post)}}</span>
                            </div>
                            <div class="info_group">
                                <span class="material-icons">
                                    bookmark
                                </span>
                                <span>{{post.tag}}</span>
                            </div>
                        </div>
                        <div v-html="post.description" class="post_content"></div>
                        <div class="read_more">
                            <router-link :to="`/post/${post.id}`">繼續閱讀..</router-link>
                        </div>
                    </div>
                  </li>
              </ul>
          </div>
          <Sidebar :posts="post_list"></Sidebar>
      </div>
      <Loading v-if="loading"></Loading>
      <Footer></Footer>
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
      post_list: []
    }
  },
  methods: {
    getPostList (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/articles?page=${page}`)
        .then(function (res) {
          // console.log(res)
          if (res.data.success) {
            vm.post_list = res.data.articles
            vm.$store.commit('startLoading', false)
            console.log(res)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    fix_data_format (post) {
      const dateAndTime = new Date(post.create_at * 1000)
        .toISOString().split('T')
      return dateAndTime[0]
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    },
    current_category_post_list () {
      const list = [...this.post_list]
      let newList = []
      const nowCategory = this.$route.params.tag || 'all'
      if (nowCategory !== 'all') {
        list.forEach(function (item) {
          console.log(item)
          if (item.tag === nowCategory) {
            newList.push(item)
          }
        })
      } else {
        newList = list
      }
      return newList
    }
  },
  components: {
    Header, Footer, Sidebar, Loading
  },
  created () {
    this.getPostList()
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    padding-top:75px;
    padding-bottom:75px;
    flex-wrap: wrap;
    font-family: 'Noto Sans TC', sans-serif;
    letter-spacing: 1px;
  }
  .content {
    width: 75%;
  }
  .post_list {
    margin: 0;
    padding: 0;
  }
  .post_list li {
    list-style: none;
    padding: 20px;
  }
  .post_list li .thumbnail {
      display: block;
      height:350px;
      background-size: cover;
      background-position:center ;
      margin-bottom: 20px;
      position: relative;
  }
   .post_list li .thumbnail_overlay {
       position: absolute;
       top:0;
       left:0;
       right: 0;
       bottom: 0;
       background: rgba(0,0,0,0.3);
       pointer-events: none;
       opacity: 0;
       transition: all .3s;
   }
  .post_list li .thumbnail:hover .thumbnail_overlay{
      opacity: 1;
  }
  .post_list li h3 {
    font-size: 30px;
    letter-spacing: 1px;
    margin: 15px 0;
    font-weight: bold;
  }
  .post_list li h3 a {
      text-decoration: none;
      color:#000000;
      transition: all .3s;
  }
  .post_list li h3 a:hover {
      color:#fe5252;
  }
.post_info {
  border-top:1px solid #f1f1f1;
  border-bottom:1px solid #f1f1f1;
  padding: 10px 0;
  display: flex;
  margin-bottom: 20px;
  font-size: 14px;
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
  margin-bottom: 25px;
  letter-spacing: 1px;
  font-size: 16px;
}
.read_more a{
  font-size: 16px;
  font-family: 'Noto Sans TC', sans-serif;
  letter-spacing: 1px;
  transition: all .3s;
  text-decoration: none;
  color:#000000
}
.read_more a:hover {
  color:#fe5252;
}
@media(max-width:768px) {
  /* .content {
    width: 100%;
  } */
  .post_list li .thumbnail {
    /* height:250px */
  }
  .post_list li h3 {
    /* font-size: 24px; */
  }
  .post_info_container {
    /* padding-bottom:20px ;
    border-bottom: 1px solid #e9e9e9; */
  }
}
@media(max-width:414px) {
  .wrapper {
    padding-top:35px;
    padding-bottom:35px;
    flex-direction: column-reverse;
  }
  .content {
    width: 100%;
  }
  .post_list li .thumbnail {
    height:250px
  }
  .post_list li h3 {
    font-size: 24px;
  }
  .post_info_container {
    padding-bottom:20px ;
    border-bottom: 1px solid #e9e9e9;
  }
  .post_list li {
    padding: 10px;
  }
}
</style>
