<template>
  <span class="header-search">
    <a-icon type="search" class="search-icon" @click="enterSearchMode"/>
    <!-- 根据模式切换搜索栏宽度，样式控制动画显示及自动获取焦点 -->
    <a-auto-complete
      ref="input"
      :dataSource="dataSource"
      :class="['search-input', searchMode ? 'enter' : 'leave']"
      placeholder="站内搜索"
      @blur="leaveSearchMode"
    >
    <!-- 失焦事件控制样式回收 -->
    </a-auto-complete>
  </span>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data () {
    return {
      dataSource: ['搜索提示一', '搜索提示二', '搜索提示三'],
      searchMode: false
    }
  },
  methods: {
    enterSearchMode () {
      this.searchMode = true
      setTimeout(() => this.$refs.input.focus(), 300)
    },
    leaveSearchMode () {
      this.searchMode = false
    }
  }
}
</script>

<style lang="less">
  .header-search{
    .search-icon{
      font-size: 16px;
      cursor: pointer;
    }
    .search-input{
      border: 0;
      border-bottom: 1px rgba(3, 5, 6, 0.23) solid;
      transition: width 0.3s ease-in-out;
      input{
        border: 0;
        box-shadow: 0 0 0 0;
      }
      &.leave{
        width: 0px;
        input{
          display: none;
        }
      }
      &.enter{
        width: 200px;
        input:focus{
          box-shadow: 0 0 0 0;
        }
      }
    }
  }
</style>
