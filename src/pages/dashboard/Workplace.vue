<template>
  <ui-page hidden-breadcrumb>
    <div slot="header" class="page-head__detail">
      <div class="header-user">
        <div class="header-user__avatar">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png" alt="">
        </div>
        <div class="header-user__content">
          <h2>早安，xxx，祝你开心每一天！</h2>
          <p>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
        </div>
      </div>
      <div class="header-extra">
        <div>
          <p class="">项目数</p>
          <p>56</p>
        </div>
        <div>
          <p>团队内排名</p>
          <p>
            <span>8</span>
            /
            <span>24</span>
          </p>
        </div>
        <div>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    </div>

    <el-row :gutter="12" style="margin-left: -12px; margin-right: -12px;">
      <el-col :span="16">
        <el-card class="el-card--hover no-border">
          <div slot="header" class="clearfix">
            <span>进行中的项目</span>
            <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

        <el-card class="el-card--hover no-border">
          <div slot="header" class="clearfix">
            <span>动态</span>
            <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

      </el-col>
      <el-col :span="8">
        <el-card class="el-card--hover no-border">
          <div slot="header" class="clearfix">
            <span>快速开始 / 便捷导航</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </ui-page>
</template>

<script type="application/ecmascript">
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'

  export default {
    components: {
      [Breadcrumb.name]: Breadcrumb,
      [BreadcrumbItem.name]: BreadcrumbItem
    }
  }
</script>

<style lang="less" scoped>

  .header-user {
    display: flex;
  }

  .header-user__avatar {
    -webkit-box-flex: 0;
    -ms-flex: 0 1 72px;
    flex: 0 1 72px;
    margin-bottom: 8px;
  }

  .header-user__avatar img {
    border-radius: 72px;
    width: 72px;
    height: 72px;
  }

  .header-user__content {
    position: relative;
    top: 4px;
    margin-left: 24px;
    margin-bottom: 16px;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
  }

  .header-user__content > h2 {
    color: #000;
    margin-top: 0;
    margin-bottom: 12px;
  }

  .header-user__content > p {
    margin: 0;
  }

  .header-extra {
    margin-left: 88px;
    min-width: 242px;
    text-align: right;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .header-extra > div {
    padding: 0 32px;
    position: relative;
    float: left;
  }

  .header-extra > div > p:first-child {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    line-height: 22px;
    margin-bottom: 4px;
  }

  .header-extra > div > p {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
  }
</style>
