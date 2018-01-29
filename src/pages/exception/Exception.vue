<template>
  <div class="exception">
    <div>
      <div :style="{backgroundImage:'url(' + img + ')' }">
      </div>
    </div>
    <div>
      <h1>{{ title }}</h1>
      <div>{{ desc }}</div>
      <div>
        <slot name="actions"></slot>
        <slot name="default">
          <el-button type="primary">返回首页</el-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="application/ecmascript">
  //  const statusEnum = [ '403', '404', '500' ]
  export default {
    props: ['status', 'title', 'desc', 'img', 'message']
  }
</script>

<style scoped>

</style>
