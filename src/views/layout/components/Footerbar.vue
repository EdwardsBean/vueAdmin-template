<template>
  <div class="abso_bottom">
    <div class="ant-layout-footer" >
      <div class="globalFooter___3uaww">
        <div class="links___lgymZ"><router-link to="/dashboard/index" >Pro 首页&nbsp;&nbsp;</router-link>Vue Design</div>
        <div class="copyright___3hV2q">Copyright <i class="anticon anticon-copyright"></i> 2018 XX科技有限公司出品</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style>
  .abso_bottom{
    height: 120px;
    width: 100%;

  }
  .ant-layout-footer {
    background: #f0f2f5;
    padding: 0px 30px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    flex: 0 0 auto;
    position: absolute;
    bottom:0px;
    left:0%;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    padding-left: 5%;
  }

  .globalFooter___3uaww {
    padding: 0 16px;
    margin: 40px 0 40px;
    text-align: center;
  }

  .globalFooter___3uaww .links___lgymZ {
    margin-bottom: 8px;
  }

  .globalFooter___3uaww .copyright___3hV2q {
    color: rgba(0,0,0,.45);
    font-size: 14px;
  }

  .anticon {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
