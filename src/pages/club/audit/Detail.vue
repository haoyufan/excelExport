<template>
  <ui-page v-loading="loading" hidden-breadcrumb>

    <template slot="header">
      <div class="page-head__detail">
        <h2 class="page-head__title">{{ clubApplyBill.clubName }}</h2>

        <div class="page-head__main clearfix" v-if="clubApplyBill.checkState === 1">
          <el-button-group class="pull-right" size="mini">
            <el-button type="success" @click="resolve()">通过</el-button>
            <el-button type="danger" @click="reject()">拒绝</el-button>
          </el-button-group>
        </div>
      </div>
    </template>

    <el-card class="no-border">
      <div slot="header">俱乐部信息</div>

      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="拥有者">
          <span>{{ clubApplyBill.cEOName }}</span>
        </el-form-item>
        <el-form-item label="性别" v-show="idCard.region">
          <span>{{ idCard.sex }}</span>
        </el-form-item>
        <el-form-item label="身份证" v-show="clubApplyBill.cEOIDNo">
          <span>{{ clubApplyBill.cEOIDNo }}</span>
        </el-form-item>
        <el-form-item label="所在地" v-show="idCard.region">
          <span>{{ idCard.region }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <span>{{ clubApplyBill.cEOMobile }}</span>
        </el-form-item>
        <el-form-item label="申请时间">
          <span>{{ clubApplyBill.createDate | timeAgo }}</span>
        </el-form-item>
        <el-form-item label="用户备注" v-show="clubApplyBill.applyRemark">
          <span>{{ clubApplyBill.applyRemark }}</span>
        </el-form-item>
        <el-form-item label="审核备注" v-show="clubApplyBill.checkRemark">
          <span>{{ clubApplyBill.checkRemark }}</span>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="no-border" v-if="images.length > 0">
      <div slot="header">证件资料</div>

      <el-carousel height="200px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <div class="picture"
               :style="{ backgroundImage: 'url(' + item.image + ')' }"
               @click="clickCarouselItem(item)">
            <div class="picture-desc">{{ item.title }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <el-card class="no-border" v-show="clubApplyBillDetailList.length > 0">
      <div slot="header">操作日志</div>

      <el-table :data="clubApplyBillDetailList">
        <el-table-column label="操作类型">
          <template slot-scope="scope">
            <span>入驻审核</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope">
            <span>管理员</span>
          </template>
        </el-table-column>
        <el-table-column label="执行结果">
          <template slot-scope="scope">
            <span class="dot" :class="scope.row.checkState | auditState('type')"></span>
            <span>{{ scope.row.checkState | auditState('label') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate | timeAgo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.checkRemark || '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <ui-window class="image-window" ref="win" modal>
      <img :src="image" alt="">
    </ui-window>
  </ui-page>
</template>

<script type="application/ecmascript">
  import { createEndpoint } from '@/lib/resetful'

  // 创建 resetful 请求端点
  const requisitionService = createEndpoint('club/requisitions')

  export default {
    props: ['billId', 'value'],
    data () {
      return {
        loading: false,
        image: null,
        clubApplyBill: Object.assign({}, this.value),
        clubApplyBillDetailList: []
      }
    },
    computed: {
      idCard () {
        if (!this.clubApplyBill.cEOIDNo) return {}
        return {
          region: '浙江 杭州',
          sex: '男',
          birthday: '1993-04-23'
        }
      },
      images () {
        if (this.clubApplyBill.billType !== 12) return []
        const items = []
        const {
          iDFrontPhoto,
          iDBackPhoto,
          businessLicensePhoto,
          travelAgencyCredentialPhoto,
          otherCredentialPhoto
        } = this.clubApplyBill

        if (iDFrontPhoto) {
          items.push({
            title: '身份证正面',
            image: iDFrontPhoto
          })
        }

        if (iDBackPhoto) {
          items.push({
            title: '身份证背面',
            image: iDBackPhoto
          })
        }

        if (businessLicensePhoto) {
          items.push({
            title: '身份证背面',
            image: businessLicensePhoto
          })
        }

        if (travelAgencyCredentialPhoto) {
          items.push({
            title: '旅行社资质',
            image: travelAgencyCredentialPhoto
          })
        }

        if (otherCredentialPhoto) {
          try {
            items.push(JSON.parse(otherCredentialPhoto))
          } catch (err) {}
        }

        return items
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      $route: 'fetchData',
      value () {
        this.clubApplyBill = Object.assign({}, this.value)
        this.clubApplyBillDetailList = []
        this.fetchData()
      }
    },
    methods: {
      getBillId () {
        return this.billId || this.clubApplyBill.billId
      },
      clickCarouselItem (item) {
        this.image = item.image
        this.$refs.win.show()
      },
      async fetchData () {
        if (this.loading) return

        const billId = this.getBillId()
        if (!billId) return

        this.loading = true

        try {
          const { clubApplyBill, clubApplyBillDetailList } = await requisitionService.one(billId)

          this.clubApplyBill = clubApplyBill
          this.clubApplyBillDetailList = clubApplyBillDetailList
        } catch (err) {
          this.clubApplyBill = null
          this.clubApplyBillDetailList = null
          this.$message.error(err.message)
        }

        this.loading = false
      },
      async resolve () {
        await this.$confirm('请仔细确认此俱乐部的各项信息是否达标', '确认提示', {
          confirmButtonText: '立即通过',
          cancelButtonText: '再检查一下',
          type: 'info'
        })

        try {
          await requisitionService.update(this.getBillId(), { checkState: 2 })
          this.$message.error('处理成功')
        } catch (error) {
          this.$message.error(error.message)
        }
      },
      async reject () {
        const { value } = await this.$prompt('这个俱乐部的信息不能达到通过标准，不允许通过审核？', '拒绝提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputPlaceholder: '请输入100字以内的内容',
          inputErrorMessage: '备注信息必填'
        })

        try {
          await requisitionService.update(this.getBillId(), { checkState: 3, checkRemark: value })
          this.$message.error('处理成功')
        } catch (error) {
          this.$message.error(error.message)
        }
      }
    },
    filters: {
      timeAgo (value) {
        return (new Date(value)).toLocaleDateString()
      }
    }
  }
</script>

<style scoped>
  .page-head__main {
    flex: auto;
    margin-bottom: 16px;
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

  .dot.info {
    background-color: #9E9E9E
  }

  .dot.success {
    background-color: #52c41a;
  }

  .dot.error {
    background-color: #f5222d;
  }

  .picture {
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 100%;
    color: #fff;
    font-weight: bold;
    background-position: center;
    background-size: 100% 100%;
  }

  .picture-desc {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    color: #333;
  }

  .image-window {
    top: 0;
    left: 0;
    max-width: 100%;
    height: 100%;
  }

  .image-window img {
    max-width: 100%;
    max-height: 100%;
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
