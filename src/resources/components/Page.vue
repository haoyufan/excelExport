<template>
  <div class="page">

    <div class="page-head" v-show="!hiddenHeader">
      <el-breadcrumb class="page-head__breadcrumb" v-show="!hiddenBreadcrumb">
        <el-breadcrumb-item to="/">
          <span class="page-head__breadcrumb-item">控制台</span>
        </el-breadcrumb-item>

        <el-breadcrumb-item v-for="(route, index) in $route.matched" :key="index" :to="route">
          <span class="page-head__breadcrumb-item">{{ route | title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <slot name="header">
        <div class="page-head__detail">
          <h2 class="page-head__title">{{ $route | title }}</h2>
        </div>
      </slot>
    </div>

    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="application/ecmascript">
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'

  export default {
    name: 'ui-page',
    props: {
      'hidden-header': {
        type: Boolean,
        required: false
      },
      'hidden-breadcrumb': {
        type: Boolean,
        required: false
      }
    },
    filters: {
      title (route) {
        return route.meta && route.meta.title ? route.meta.title : route.name
      }
    },
    components: {
      [Breadcrumb.name]: Breadcrumb,
      [BreadcrumbItem.name]: BreadcrumbItem
    }
  }
</script>

<style scoped>
  .page {
    margin: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .page-head {
    background-color: #fff;
    padding: 16px 32px 0 32px;
    box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, .05);
  }

  .page-head__breadcrumb {
    font-size: 13px;
  }

  .page-head__breadcrumb-item {
    color: #5e5e5e;
  }

  [aria-current="page"] .page-head__breadcrumb-item {
    color: #7a7a7a;
  }

  .page-head__detail {
    display: flex;
  }

  .page-head__title {
    font-weight: 500;
    font-size: 28px;
    color: #6b6b6b;
    line-height: 36px;
  }

  /** todo: 因为不知道如何添加 slot 的 class，所以需要调用者手动添加class */
  .page-head__desc {
    margin-top: 0;
    font-size: 14px;
    color: #5e5e5e;
  }

  .page-content {
    padding: 24px 24px 0
  }

  .page-head__breadcrumb,
  .page-head__title,
  .page-head__desc {
    margin-bottom: 16px;
    box-sizing: border-box;
  }
</style>
