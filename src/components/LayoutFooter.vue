<template>
  <div>
    <a-layout-footer>
      <div class="footer-content">
        <div id="title">MONSTER DESIGN</div>
        <hr>
        <div class="footer-content-02">
          <span>首页</span>
          <span>案例</span>
          <span>关于我们</span>
          <span>联系我们</span>
          <span>© 2009-2019 Monster.com</span>
          <span>&nbsp;</span>
        </div>
      </div>
    </a-layout-footer>
  </div>
</template>

<script>

export default {
  name: 'LayoutFooter'
}
</script>
<style lang="less" scoped>
// 2.3 footer---------------start
.ant-layout-footer {
  background-color: @basecolor-gray-02;
  height: 300px;
  text-align: center;
}

//footer-content
.footer-content {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-family: @basefont-family;
  color: @basecolor-white-02;
}

//footer-content #title
.footer-content #title {
  font-size: @basefont-size-18;
  text-align: center;
}

//.footer-content hr
.footer-content hr {
  width: 50%;
  margin-bottom: 20px;
  border-color: @basecolor-gray-01;
}

//footer-content-02
.footer-content-02 {
  display: flex;
  justify-content: center;
}

//footer-content-02 span
.footer-content-02 span {
  font-size: @basefont-size-15;
  margin-left: 32px;
  cursor: pointer;
}

// 2.3 footer---------------end
</style>
