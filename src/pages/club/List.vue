<template>
  <ui-page>

    <el-card class="no-border">
      <div slot="header" class="clearfix">
        <span class="card-title">共有 {{ pagination.total }} 家俱乐部</span>
        <div class="pull-right">
          <el-input class="pull-right" style="width:260px"
                    placeholder="ID / 俱乐部 / 拥有者"
                    suffix-icon="el-icon-search"
                    v-model="filters.keywords"
                    @keyup.native.enter="fetchData"/>
        </div>
      </div>

      <el-table :data="items" v-loading="loading"
                element-loading-text="拼命加载中"
                @row-click="selectTableRow">
        <el-table-column type="index" :index="calcItemIndex" align="center"/>
        <el-table-column label="名称" prop="clubName" sortable/>
        <el-table-column label="管理员" prop="cEOName"/>
        <el-table-column label="所在地">
          <template slot-scope="scope">
            {{ scope.row.provinceName }}
            {{ scope.row.cityName !== scope.row.provinceName ? ' - ' + scope.row.cityName : '' }}
          </template>
        </el-table-column>
        <el-table-column label="有效期">
          <template slot-scope="scope">
            2018-11-05 ~ 2018-11-05
          </template>
        </el-table-column>
        <el-table-column label="续费状态" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">已过期</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="clearfix" style="margin: 18px 0 0;">
        <el-pagination align="right"
                       layout="prev, pager, next, sizes, jumper"
                       :page-sizes="[10, 25, 50]"
                       :current-page.async="pagination.page"
                       :page-size="pagination.pageSize"
                       :total="pagination.total"
                       @size-change="pageSizeChanged"
                       @current-change="currentPageChanged"/>
      </div>
    </el-card>


    <ui-window class="right-view" ref="window" title="详情">
      <club-detail v-model="selectItem"/>
    </ui-window>

  </ui-page>
</template>

<script type="application/ecmascript">
  import { createEndpoint } from '@/lib/resetful'
  import ClubDetail from './Detail.vue'

  const clubEndpoint = createEndpoint('clubs')

  export default {
    data () {
      return {
        // ajax 加载状态
        loading: false,

        // 表格数据
        items: [],

        // 过滤条件
        filters: {
          keywords: ''
        },

        // 分页数据
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        selectItem: null
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      calcItemIndex (index) {
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
        const { keywords } = this.filters
        const { page, pageSize } = this.pagination
        return { keywords, page, pageSize }
      },
      async fetchData () {
        if (this.loading) return
        this.loading = true

        try {
          const { items, page, pageSize, total } = await clubEndpoint.all(this.fetchParams())

          this.items = items
          this.pagination.page = page
          this.pagination.pageSize = pageSize
          this.pagination.total = total
        } catch (err) {
          this.items = []
          this.$message.error(err.message)
        }

        this.loading = false
      },
      selectTableRow (row, event, column) {
        if (column.type === 'expand' || column.label === '操作') return
        this.selectItem = row
        this.$refs.window.show()
      }
    },
    components: {
      'club-detail': ClubDetail
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
