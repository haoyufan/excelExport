<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: #f8f8f8;;
    font-family: 'microsoft yahei ui', 'microsoft yahei', PingFangSC-Light, 'helvetica neue', 'hiragino sans gb', arial, simsun, sans-serif;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .el-card {
    margin-bottom: 15px;
    border: none;
    box-shadow: none;
  }

  .el-card--hover:hover {
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  }

  .el-card.no-border .el-card__header {
    border: none !important;
    padding-bottom: 0;
    font-weight: bold;
  }

  .el-pagination[align="right"] {
    float: right;
  }

  .el-pagination[align="right"] .el-pagination__sizes {
    margin-left: 10px;
    margin-right: 0
  }

  .el-pagination[align="right"] .el-pagination__jump {
    margin-left: 0;
  }
</style>
