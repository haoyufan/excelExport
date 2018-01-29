<template>
  <ui-page v-loading="loading" hidden-breadcrumb>

    <template slot="header">
      <div class="page-head__detail">
        <div class="page-head_logo">
          <!--<img alt="" :src="clubInfo.logo">-->
          <img src="http://s.lxiaobao.com/@/monitor-web/static/res/efbbbbdb.png" alt="club logo"/>
        </div>
        <div class="page-head__main">
          <el-row>
            <el-col :span="14">
              <h1 style="margin-bottom: 16px;">{{ clubInfo.clubName }}</h1>
            </el-col>
            <el-col :span="10" style="text-align: right">
              <el-button-group size="mini">
                <el-button>操作</el-button>
                <el-button>操作</el-button>
                <el-button><i class="el-icon-more"></i></el-button>
              </el-button-group>
              <el-button type="primary" size="mini">主要操作</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="14">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="拥有者">
                  <span>{{ clubInfo.cEOName }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>男</span>
                </el-form-item>
                <el-form-item label="身份证">
                  <span>3333</span>
                </el-form-item>
                <el-form-item label="所在地">
                  <span>sssssss</span>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="10">
              <ul class="list-extra">
                <li>
                  <p class="desc">续费状态</p>
                  <p class="text">已过期</p>
                </li>
                <li>
                  <p class="desc">现金账户</p>
                  <p class="text">¥ 568.08</p>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="el-tabs__nav-scroll">
        <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
          <div class="el-tabs__active-bar" style="width: 28px; transform: translateX(20px);"></div>
          <div class="el-tabs__item is-active">详情</div>
          <div class="el-tabs__item">保障服务</div>
          <div class="el-tabs__item">信息管理</div>
        </div>
      </div>
    </template>

    <el-card>
      <div slot="header">俱乐部信息</div>

      <el-row class="list-description">
        <el-col :xs="24" :sm="12" :md="8">
          <span>拥有者 : </span>高诗忆
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>性别 : </span>女
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>身份证 : </span> 3321944288191034921
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>联系方式 : </span>18112345678
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>所在地 : </span>浙江 杭州
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>创建时间 : </span>浙江 杭州
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <span>其他字段 : </span>~~~
        </el-col>
      </el-row>

    </el-card>

    <el-card>
      <div slot="header">数据统计</div>

      <p>这是一张图表</p>
    </el-card>

    <el-card>
      <div slot="header">用户近半年来电记录</div>
      <div class="text-center">
        <i class="el-icon-warning"></i> 暂无数据
      </div>
    </el-card>

    <el-card>
      <div slot="header">操作日志</div>

      <el-table :data="log">
        <el-table-column label="操作类型" prop="type" sortable/>
        <el-table-column label="操作人" prop="user" sortable/>
        <el-table-column label="执行结果" sortable>
          <template slot-scope="scope">
            <span class="dot" :class="scope.row.result ? 'dot-success' : 'dot-error'"></span>
            <span>{{ scope.row.result ? '成功' : '拒绝'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="time" sortable/>
        <el-table-column label="备注" prop="remark" sortable/>
      </el-table>
    </el-card>

  </ui-page>
</template>

<script type="application/ecmascript">
  import { createEndpoint } from '@/lib/resetful'

  const clubEndpoint = createEndpoint('clubs')

  export default {
    props: ['clubId', 'value'],
    data () {
      return {
        loading: false,
        clubInfo: {},
        log: [
          {
            type: '团票退款',
            user: '王大牛',
            result: false,
            time: '2017-10-03 19:23:12',
            remark: '过期门票拒绝退款'
          },
          {
            type: '团票购买',
            user: '王大牛',
            result: true,
            time: '2017-10-03 19:23:12',
            remark: '-'
          },
          {
            type: '申请提现',
            user: '王大牛',
            result: true,
            time: '2017-10-03 19:23:12',
            remark: '-'
          },
          {
            type: '申请会员',
            user: '王大牛',
            result: true,
            time: '2017-10-03 19:23:12',
            remark: '-'
          }
        ],
        analysis: {
          affordability: 2,
          consumption: 4,
          evaluate: 3,
          quality: 3
        }
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      $route: 'fetchData',
      value () {
//        this.clubInfo = Object.assign({}, this.value)
//        this.clubInfoDetailList = []
//        this.fetchData()
      }
    },
    methods: {
      fetchData () {
        console.log('sss')
      }
    }
  }
</script>

<style scoped>
  .page-head_logo {
    flex: 0 1 auto;
    margin-right: 16px;
    padding-top: 1px;
  }

  .page-head_logo {
    margin-bottom: 16px;
  }

  .page-head_logo img {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: block;
  }

  .page-head__main {
    flex: auto;
    margin-bottom: 16px;
  }

  .form-expand {
    font-size: 0;
  }

  .form-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .form-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  [role="slider"] {
    display: inline-block;
    vertical-align: middle;
  }

  .list-extra {
    position: relative;
    display: flex;
    margin: 0;
    font-size: 12px;
  }

  .list-extra li {
    position: relative;
    text-align: right;
    display: block;
    width: 100%;
    flex: 1;
  }

  .list-extra .desc {
    margin: 0;
    color: rgba(0, 0, 0, 0.45);
  }

  .list-extra .text {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    margin: 0;
  }

  .setps {
    padding: 18px 24px;
  }

  .setps + .setps {
    border-top: 1px dashed #e8e8e8
  }

  .list-description .el-col {
    margin-bottom: 18px;
  }

  .dot {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  .dot-success {
    background-color: #52c41a;
  }

  .dot-error {
    background-color: #f5222d;
  }


  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
