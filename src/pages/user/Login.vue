<template>
  <div class="page">

    <el-card class="login-card no-border">
      <template slot="header">
        密码登录
        <div class="login-switch">
          <i class="iconfont icon-diannao"></i>
          <!--<i class="iconfont icon-erweima"></i>-->
        </div>
      </template>

      <el-form label-width="80px" label-position="top" size="medium" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input prefix-icon="iconfont icon-phone" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input prefix-icon="iconfont icon-phone" v-model="form.password"/>
        </el-form-item>
        <br>
        <el-form-item class="text-center">
          <el-button type="primary" style="width: 100%"
                     native-type="submit"
                     :loading="this.loading">
            立即登录
          </el-button>
        </el-form-item>
        <el-form-item class="text-left" style="margin-bottom: 0">
          <el-button type="text">
            <i class="iconfont icon-weixin1"></i>
            微信登录
          </el-button>
          <el-button type="text">
            <i class="iconfont icon-dingding"></i>
            钉钉登录
          </el-button>
        </el-form-item>
        <el-form-item class="text-right" style="margin-bottom: 0">
          <el-button type="text">
            密码登录
          </el-button>
          <el-button type="text">
            免费注册
          </el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script type="application/ecmascript">
  import store from '@/store'

  export default {
    data () {
      return {
        loading: false,
        form: {
          username: 'superadmin',
          password: 'piB6EyJN64^5dQa3oIM0Eswe9#cLnb4#',
          rememberMe: false
        }
      }
    },
    methods: {
      async login () {
        try {
          this.loading = true
          await store.dispatch('user/login', this.form)
          this.$router.replace(this.$route.query.redirect || '/')
        } catch (error) {
          this.$message.error(error.message)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style scoped>
  .page {
    position: relative;
  }

  .login-card {
    position: absolute;
    top: 120px;
    right: 60px;
    width: 350px;
  }

  .login-switch {
    width: 52px;
    height: 52px;
    line-height: 52px;
    position: absolute;
    right: 5px;
    top: 8px;
  }

  .login-switch .iconfont {
    font-size: 52px;
    cursor: pointer;
    color: #f40;
  }
</style>
