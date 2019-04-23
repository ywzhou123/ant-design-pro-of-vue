<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less">
:global{
  //拖拽控件全局样式
  .dragable-ghost{
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-chose{
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-drag{
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  //页面切换动画
  .page-toggle-enter-active{
    transition: all 0.2s ease-in 0.25s;
  }
  .page-toggle-leave-active{
    transition: all 0.2s ease-out 0s;
  }
  .page-toggle-enter, .page-toggle-leave-to{
    opacity: 0;
    padding: 0px;
  }
}
</style>
