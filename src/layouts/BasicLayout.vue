<template>
  <el-container direction="horizontal">

    <!--S 侧边栏-->
    <el-aside class="sidebar" width="256px" :class="isCollapsed ? 'sidebar-collapsed' : ''">

      <!--S 品牌标志-->
      <div class="sidebar-brand">
        <a href="#">
          <img :src="siteInfo.logo" alt="logo">
          <span>{{ siteInfo.title }}</span>
        </a>
      </div>
      <!--E 品牌标志-->

      <!--S 菜单-->
      <el-menu class="sidebar-menu" :collapse="isCollapsed" router :default-active="$route.path">
        <template v-for="(menuItem, index) in menus">
          <template v-if="menuItem.children && menuItem.children.length > 0">
            <el-submenu :index="menuItem.path || index + ''" :key="index">
              <template slot="title">
                <i v-if="menuItem.icon" :class="menuItem.icon"></i>
                <span slot="title">{{ menuItem | title }}</span>
              </template>

              <el-menu-item v-for="subMenuItem in menuItem.children"
                            :index="subMenuItem.path"
                            :key="subMenuItem.path">
                {{ subMenuItem | title }}
              </el-menu-item>
            </el-submenu>
          </template>

          <el-menu-item :index="menuItem.path" :key="menuItem.path" v-else>
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            <span slot="title">{{ menuItem | title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <!--E 菜单-->
    </el-aside>
    <!--侧边栏-->

    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="12">
            <div class="action action-trigger pull-left" @click="isCollapsed = !isCollapsed">
              <i class="iconfont" :class="isCollapsed ? 'icon-menuon' : 'icon-menuoff'"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <el-dropdown class="action action-user pull-right" trigger="click">
              <a href="javascript:void(0);">
                <img class="action-user__avatar" :src="currentUserInfo.avatar" alt="avatar">
              </a>
              <el-dropdown-menu class="action-user__menu" slot="dropdown">
                <el-dropdown-item class="action-user__wrapper">
                  <div class="action-user__info">
                    <div class="action-user__name">{{ currentUserInfo.nickname }}</div>
                    <div class="action-user__position">{{ currentUserInfo.position }}</div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-mobile-phone"></i>
                  <span>账户</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-setting"></i>
                  <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-info"></i>
                  <span>注销</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-popover placement="bottom" width="300" trigger="click">
              <div slot="reference" class="action action-bell pull-right">
                <i class="iconfont icon-bell"></i>
              </div>

              <el-tabs value="first">
                <el-tab-pane label="通知" name="first">通知管理</el-tab-pane>
                <el-tab-pane label="消息" name="second">消息管理</el-tab-pane>
                <el-tab-pane label="待办" name="third">待办管理</el-tab-pane>
              </el-tabs>
            </el-popover>

          </el-col>
        </el-row>
      </el-header>

      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="application/ecmascript">
  import { mapState } from 'vuex'
  import { menus } from '@/router/routes'

  export default {
    props: ['collapsed'],
    data () {
      return {
        siteInfo: {
          logo: 'http://s.lxiaobao.com/@/monitor-web/static/res/efbbbbdb.png',
          title: '杭州驴帮科技有限公司'
        },
        isCollapsed: this.collapsed === true
      }
    },
    computed: {
      ...mapState('user', ['currentUserInfo']),
      menus () {
        return menus
          .map(route => {
            if (route.hasOwnProperty('children')) {
              route.children = route.children
                .filter(route => !route.hasOwnProperty('props'))
            }
            return route
          })
      }
    },
    filters: {
      title (route) {
        return route.meta && route.meta.title
          ? route.meta.title
          : route.title
      }
    }
  }
</script>

<style>
  .sidebar {
    width: 256px;
    max-width: 256px;
    min-width: 256px;
    min-height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #283593;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: all .3s;
    overflow: inherit;
  }

  .sidebar-brand {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    transition: all .3s;
    background: #1a237e;
    overflow: hidden;
  }

  .sidebar-brand a {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .sidebar-brand img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }

  .sidebar-brand span {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    margin: 0 0 0 8px;
    font-weight: 600
  }

  .sidebar-menu {
    border: none;
    background-color: transparent;
  }

  .sidebar-menu .el-menu-item,
  .sidebar-menu [class^=el-icon-],
  .sidebar-menu .el-submenu__title,
  .sidebar-menu .el-submenu__icon-arrow {
    color: #fff;
    background-color: transparent;
  }

  .sidebar-menu .el-submenu .el-menu {
    background-color: #303f9f;
    border: none;
    border-radius: 2px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  }

  .sidebar-menu .el-menu-item:hover,
  .sidebar-menu .el-menu-item:hover > [class^=el-icon-],
  .sidebar-menu .el-submenu__title:hover,
  .sidebar-menu .el-submenu__title:hover > [class^=el-icon-],
  .sidebar-menu .el-submenu__title:hover > .el-submenu__icon-arrow {
    color: #1890ff;
  }

  .sidebar-menu .el-menu-item.is-active,
  .sidebar-menu .el-submenu__title.is-active {
    color: #fff;
    background-color: #3f51b5;
    border-radius: 2px;
  }

  .sidebar-collapsed {
    max-width: 80px;
    min-width: 80px;
    width: 80px;
    transition: all .3s;
  }

  .sidebar-collapsed > .el-menu.el-menu--collapse {
    transition: all .3s;
    width: 80px;
  }

  .sidebar-collapsed .el-menu--collapse > .el-menu-item [class^=el-icon-],
  .sidebar-collapsed .el-menu--collapse > .el-submenu > .el-submenu__title [class^=el-icon-] {
    transition: all .3s;
    font-size: 24px;
    width: 40px;
  }

  .container {
    position: relative;
  }

  .header {
    position: absolute;
    width: 100%;
    z-index: 2;
    padding: 0 18px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #f3f3f3
  }

  .action {
    cursor: pointer;
    padding: 0 6px;
    height: 60px;
    line-height: 60px;
  }

  .action .iconfont {
    font-size: 20px;
  }

  .action-trigger {
    transition: all .3s;
  }

  .action-bell {
    margin-right: 8px;
  }

  .action-user {
    vertical-align: middle;
  }

  .action-user__avatar {
    width: 32px;
    height: 32px;
    border-radius: 12px;
    vertical-align: middle;
  }

  .action-user__menu {
    width: 200px;
    padding-top: 0;
    border: none;
    border-radius: 2px;
  }

  .action-user__wrapper,
  .action-user__wrapper:hover {
    border-radius: 2px 2px 0 0;
    background-color: #1890ff !important;
    color: #ffffff !important;
  }

  .action-user__menu .popper__arrow,
  .action-user__menu .popper__arrow::after {
    border-bottom-color: #1890ff !important;
  }

  .action-user__info {
    overflow: hidden;
    padding: 20px 0 14px;
    margin-bottom: 7px;
  }

  .action-user__name {
    display: block;
    font-size: 19px;
    line-height: 22px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

  }

  .action-user__position {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
  }

  .main {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    width: auto;
    padding: 0;
    overflow: auto;
  }
</style>
