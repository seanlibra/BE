<template>
    <div :class="{ active : isShow }" class="bubble">{{bubbleText}}</div>
</template>

<script>
export default {
  props: {
    bubbleText: String
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    bubbleACtive () {
      var vm = this
      vm.isShow = true
      setTimeout(() => {
        vm.isShow = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.bubble {
  position:fixed;
  top:100px;
  right: 50px;
  background-color: #fe5252;
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 15px;
  box-shadow:0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
  letter-spacing: 1px;
  opacity: 0;
  transition: all .3s;
  color:#ffffff;
}
.bubble.active {
    opacity: 1;
}
.bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100%;
  left: 1.5em;
  border: 10px solid transparent;
  border-top:none;
  border-bottom-color: #fe5252;;
  filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, .1));
}
</style>
