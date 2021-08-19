<template>
  <div class="footer_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 mb-lg-0 mb-md-5">
          <div class="footer_block">
            <h2>聯絡資訊</h2>
            <ul class="footer_contact_list">
              <li>
                <span class="material-icons">location_on</span>
                <div class="footer_contact_item_group">
                  <span>地址:</span>
                  <a
                    target="_blank"
                    href="https://goo.gl/maps/qqP64jc4rS15mQep8"
                    >新北市中和區</a
                  >
                </div>
              </li>
              <li>
                <span class="material-icons">phone</span>
                <div class="footer_contact_item_group">
                  <span>電話:</span>
                  <a href="tel:+886-9-12345678">0912-345-678</a>
                </div>
              </li>
              <li>
                <span class="material-icons">email</span>
                <div class="footer_contact_item_group">
                  <span>電子郵件:</span>
                  <a href="mailto:contact@support.com">contact@support.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-lg-0 mb-md-5">
          <div class="footer_block">
            <h2>最新文章</h2>
            <ul class="news_list">
              <li v-for="item in display_news" :key="item.id">
                <router-link
                  :to="`/post/${item.id}`"
                  class="thumbnail"
                  :style="`background-image:url(${item.imageUrl})`"
                >
                  <div class="news_overlay"></div>
                </router-link>
                <div class="news_info">
                  <h3 class="title">
                    <router-link :to="`/post/${item.id}`">{{
                      item.title
                    }}</router-link>
                  </h3>
                  <div class="author">
                    <span class="material-icons"> account_circle </span>
                    <span class="mx-2">{{ item.author }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-lg-0 mb-md-5">
          <div class="footer_block">
            <h2>商品分類</h2>
            <ul class="category_list">
              <li v-for="item in category_list" :key="item.title">
                <router-link :to="item.link">
                  <span class="circle"></span>
                  <span class="title">{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-lg-0 mb-md-5">
          <div class="footer_block">
            <h2>快速連結</h2>
            <ul class="quick_link_list">
              <li>
                <router-link to="/shop/all">購物商城</router-link>
              </li>
              <li>
                <router-link to="/blog/all">部落格</router-link>
              </li>
              <li>
                <router-link to="/about">關於我們</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      news_list: [],
      category_list: [
        {
          title: '全部商品',
          link: '/shop/all'
        },
        {
          title: '夏季新品',
          link: '/shop/夏季新品'
        },
        {
          title: '男性服裝',
          link: '/shop/男性服裝'
        },
        {
          title: '女性服裝',
          link: '/shop/女性服裝'
        },
        {
          title: '男性配件',
          link: '/shop/男性配件'
        },
        {
          title: '女性配件',
          link: '/shop/女性配件'
        }
      ]
    }
  },
  methods: {
    getNews (page = 1) {
      const vm = this
      vm.$store.commit('startLoading', true)
      vm.$http.get(`${vm.url}/api/${vm.path}/articles?page=${page}`)
        .then(res => {
          if (res.data.success) {
            vm.news_list = res.data.articles
            vm.$store.commit('startLoading', false)
          } else {
            vm.$store.commit('startLoading', false)
          }
        })
        .catch(() => {
          vm.$store.commit('startLoading', false)
        })
    }
  },
  computed: {
    display_news () {
      const newArray = [...this.news_list]
      const result = []
      if (newArray.length > 3) {
        for (let i = 0; i < 3; i++) {
          result.push(newArray[i])
        }
      }
      return result
    }
  },
  created () {
    this.getNews()
  }
}
</script>

<style scoped>
.footer_wrapper {
  background: #322b2b;
  padding: 50px 0;
  font-family: "Noto Sans TC", sans-serif;
  letter-spacing: 1px;
}
.footer_block h2 {
  color: #ffffff;
  font-size: 16px;
  padding-left: 10px;
  border-left: 3px solid #fe5252;
  line-height: 16px;
  margin-bottom: 30px;
  letter-spacing: 1px;
  font-family: inherit;
}
.footer_block .material-icons {
  color: #fe5252;
  font-size: 18px;
}
.footer_contact_list {
  margin: 0;
  padding: 0;
}
.footer_contact_list li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.footer_contact_item_group {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.footer_contact_item_group span {
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 1px;
}
.footer_contact_item_group a {
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  opacity: 0.5;
  transition: all 0.3s;
}
.footer_contact_item_group a:hover {
  opacity: 1;
}
.news_list {
  margin: 0;
  padding: 0;
}
.news_list li {
  list-style: none;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px 0;
}
.news_list li:first-child {
  padding: 0 0 15px 0;
}
.news_list li:last-child {
  border-bottom: 0;
}
.news_list .thumbnail {
  height: 60px;
  width: 60px;
  background-size: cover;
  border-radius: 5px;
  margin-right: 10px;
  position: relative;
}
.news_list .thumbnail .news_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  opacity: 0;
  pointer-events: none;
}
.news_list .thumbnail:hover .news_overlay {
  opacity: 1;
}
.news_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.news_info .title {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1px;
}
.news_info .title a {
  transition: all 0.3s;
  text-decoration: none;
  color: #ffffff;
}
.news_info .title a:hover {
  color: #fe5252;
}
.news_info .author {
  color: #ffffff;
  display: flex;
  align-items: center;
}
.category_list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.category_list li {
  list-style: none;
  padding: 8px 8px 8px 0;
  width: 50%;
}
.category_list li a {
  text-decoration: none;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1px;
  position: relative;
  transition: all 0.3s;
  right: 0;
}
.category_list li a .circle {
  border: 1px solid #ffffff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  transition: all 0.3s;
}
.category_list li a .title {
  transition: all 0.3s;
}
.category_list li a:hover {
  right: -20px;
}
.category_list li a:hover .title {
  color: #fe5252;
}
.category_list li a:hover .circle {
  border: 1px solid #fe5252;
}
.quick_link_list {
  margin: 0;
  padding: 0;
}
.quick_link_list li {
  list-style: none;
  padding: 8px;
}
.quick_link_list li a {
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 1px;
  transition: all 0.3s;
}
.quick_link_list li a:hover {
  color: #fe5252;
}
@media (max-width: 414px) {
  .footer_block {
    margin-bottom: 30px;
  }
}
</style>
