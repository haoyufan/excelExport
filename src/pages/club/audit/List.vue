<template>
  <ui-page>

    <el-card>
      <el-form :model="filters" label-position="left">
        <el-form-item label="资　　质 : ">
          <el-radio-group class="el-link-radio-group"
                          v-model="filters.billType"
                          size="mini"
                          @change="fetchData">
            <el-radio-button v-for="item in clubLevels"
                             :label="item.value"
                             :key="item.value">{{ item.label }}
            </el-radio-button>

          </el-radio-group>
        </el-form-item>

        <el-form-item label="状　　态 : " style="margin-bottom: 0">
          <el-radio-group class="el-link-radio-group"
                          v-model="filters.checkState"
                          size="mini"
                          @change="fetchData">
            <el-radio-button v-for="item in auditStates"
                             :label="item.value"
                             :key="item.value">{{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="no-border">

      <div slot="header" class="clearfix">
        <span class="card-title">共有 {{ pagination.total }} 家俱乐部</span>
        <!--<div class="pull-right">-->
        <!--<el-input placeholder="ID / 俱乐部 / 拥有者"-->
        <!--suffix-icon="el-icon-search"-->
        <!--size="mini"/>-->
        <!--</div>-->
      </div>

      <el-table class="table"
                :data="items"
                max-height="520"
                v-loading="loading"
                element-loading-text="拼命加载中"
                @row-click="selectTableRow">

        <el-table-column type="index" :index="calculateItemIndex" align="center"
        //>
        <el-table-column label="俱乐部" prop="clubName" sortable/>
        <el-table-column label="拥有者" prop="cEOName" sortable/>
        <el-table-column label="联系电话" prop="cEOMobile"/>

        <el-table-column label="支付年费">
          <template slot-scope="scope" sortable>
            <span v-if="scope.row.billType !== 10">
              {{ scope.row.paidState === 2 ? '已支付' : '待支付' }}
            </span>
            <span v-else>无需支付</span>
          </template>
        </el-table-column>

        <el-table-column label="申请时间" sortable align="center">
          <template slot-scope="scope">
            2018-11-05
          </template>
        </el-table-column>
      </el-table>

      <div class="clearfix" style="margin: 18px 0 0;">
        <el-pagination align="right"
                       layout="prev, pager, next, sizes, jumper"
                       :page-sizes="pagination.pageSizes"
                       :current-page.async="pagination.page"
                       :page-size="pagination.pageSize"
                       :total="pagination.total"
                       @size-change="pageSizeChanged"
                       @current-change="currentPageChanged"/>
      </div>
    </el-card>

    <ui-window class="right-view" ref="window" title="详情">
      <audit-detail v-model="selectItem"/>
    </ui-window>

  </ui-page>
</template>

<script type="application/ecmascript">
  import { mapState } from 'vuex'
  import { createEndpoint } from '@/lib/resetful'

  import AuditDetail from './Detail.vue'

  const requisitionService = createEndpoint('club/requisitions')

  export default {
    data () {
      return {
        loading: false,
        filters: {
          billType: 10,
          checkState: 1,
          keywords: ''
        },
        items: [],
        selectItem: null,
        pagination: {
          page: 1,
          pageSize: 10,
          pageSizes: [10, 25, 50],
          total: 0
        }
      }
    },
    computed: mapState('settings', ['auditStates', 'clubLevels']),
    methods: {
      calculateItemIndex (index) {
        return index + 1 + (this.pagination.page - 1) * this.pagination.pageSize
      },
      currentPageChanged (page) {
        this.pagination.page = page
        this.fetchData()
      },
      pageSizeChanged (pageSize) {
        this.pagination.pageSize = pageSize
        this.fetchData()
      },
      fetchParams () {
        const { billType, checkState, keywords = '' } = this.filters
        const { page, pageSize } = this.pagination
        return { billType, checkState, keywords, page, pageSize }
      },
      async fetchData () {
        if (this.loading) return
        if (this.$refs.window) {
          this.$refs.window.close()
        }

        try {
          this.loading = true

          const { items, page, pageSize, total } = await requisitionService.all(this.fetchParams())

          this.items = items
          this.pagination.page = page
          this.pagination.pageSize = pageSize
          this.pagination.total = total
        } catch (err) {
          this.items = []
          this.$message.error(err.message)
        } finally {
          this.loading = false
        }
      },
      selectTableRow (row, event, column) {
        if (column.type === 'expand' || column.label === '操作') return
        this.selectItem = row
        this.$refs.window.show()
      }
    },
    created () {
      this.fetchData()
    },
    components: {
      'audit-detail': AuditDetail
    }
  }
</script>

<style scoped>
  .right-view {
    width: 650px !important;
    height: 100% !important;
    right: 0;
    top: 0;
    left: auto;
    background-color: #f8f8f8 !important;
    box-shadow: 0 0 7px 0 rgba(119, 119, 119, 0.2);
  }
</style>
