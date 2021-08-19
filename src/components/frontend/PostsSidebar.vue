<template>
  <div class="posts_sidebar">
    <div class="sidebar_item_group">
      <h3>訂閱電子報</h3>
      <form action="#" class="newsletter">
        <input type="email" placeholder="E-mail" />
        <button type="submit">送出</button>
      </form>
    </div>
    <div class="sidebar_item_group">
      <h3>文章標籤</h3>
      <div class="tags_list">
        <router-link
          v-for="item in tags_list"
          :key="item"
          :to="`/blog/${item}`"
          >{{ item }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  data () {
    return {
      path: process.env.VUE_APP_PATH,
      url: process.env.VUE_APP_API,
      post: {}
    }
  },
  computed: {
    tags_list () {
      const list = JSON.parse(JSON.stringify(this.posts))
      const originCategoryList = []
      let newCategoryList = []
      if (list.length > 1) {
        list.forEach(item => {
          originCategoryList.push(item.tag)
        })
      }
      newCategoryList = originCategoryList.filter((item, index) => {
        return originCategoryList.indexOf(item) === index
      })
      return newCategoryList
    }
  }
}
</script>

<style scoped>
.posts_sidebar {
  width: 25%;
  border-left: 1px solid #f1f1f1;
  padding: 20px;
  font-family: "Noto Sans TC", sans-serif;
}
.sidebar_item_group {
  margin-bottom: 30px;
}
.sidebar_item_group h3 {
  border-left: 3px solid #fe5252;
  font-size: 18px;
  padding-left: 16px;
  margin-bottom: 20px;
  font-family: inherit;
  letter-spacing: 1px;
  font-family: "Noto Sans TC", sans-serif;
}
.tags_list a {
  text-decoration: none;
  color: #000000;
  background: #e9e9e9;
  padding: 4px 12px;
  margin: 0px 10px 16px 0;
  border-radius: 10px;
  display: inline-block;
  transition: all 0.3s;
  letter-spacing: 1px;
  font-family: inherit;
}
.tags_list a:hover {
  color: #fe5252;
}
.newsletter {
  display: flex;
}
.newsletter input {
  border: 1px solid #e9e9e9;
  padding: 5px 10px;
  width: calc(100% - 75px);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.newsletter button {
  width: 75px;
  border: 0;
  background: #fe5252;
  color: #f1f1f1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #fe5252;
  transition: all 0.3s;
}
.newsletter button:hover {
  background: #ffffff;
  color: #fe5252;
}
@media (max-width: 414px) {
  .posts_sidebar {
    width: 100%;
    border-left: 0;
    padding: 10px;
  }
  .sidebar_item_group h3 {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
