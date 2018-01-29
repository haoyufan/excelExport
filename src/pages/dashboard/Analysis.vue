<template>
  <ui-page hidden-header>


    <el-row :gutter="18">
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="chart-card el-card--hover">
          <div class="chart-card__meta">
            <span>总销售额</span>
            <span class="chart-card__actions">
              <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </span>
          </div>
          <div class="chart-card__number">
            ￥ 999.99
          </div>
          <div class="chart-card__content">

          </div>
          <div class="chart-card__footer">
            <span>日均销售额</span>
            <strong>￥12,423</strong>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="chart-card el-card--hover">
          <div class="chart-card__meta">
            <span>访问量</span>
            <span class="chart-card__actions">
              <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </span>
          </div>
          <div class="chart-card__number">
            8,846
          </div>
          <div class="chart-card__content">

          </div>
          <div class="chart-card__footer">
            <span>日访问量</span>
            <strong>1,234</strong>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="chart-card el-card--hover">
          <div class="chart-card__meta">
            <span>支付笔数</span>
            <span class="chart-card__actions">
              <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </span>
          </div>
          <div class="chart-card__number">
            6,560
          </div>
          <div class="chart-card__content">

          </div>
          <div class="chart-card__footer">
            <span>转化率</span>
            <strong>60%</strong>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="chart-card el-card--hover">
          <div class="chart-card__meta">
            <span>运营活动效果</span>
            <span class="chart-card__actions">
              <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </span>
          </div>
          <div class="chart-card__number">
            78%
          </div>
          <div class="chart-card__content">

          </div>
          <div class="chart-card__footer">
            <span>周同比</span>
            <strong>12% <i class="el-icon-caret-top" style="color: #f00;"></i></strong>
            &nbsp;&nbsp;
            <span>日环比</span>
            <strong>11%</strong>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="el-card--hover no-border">
      <el-tabs>
        <div>
          <el-tab-pane label="销售额">销售额</el-tab-pane>
          <el-tab-pane label="访问量">访问量</el-tab-pane>
        </div>
        <div class="cc">
          ss
        </div>
      </el-tabs>
    </el-card>

    <el-row :gutter="18">
      <el-col :xs="24" :md="24" :lg="24" :xl="12">
        <el-card class="el-card--hover no-border">
          <div slot="header" class="clearfix">
            <span>线上热门搜索</span>
            <el-dropdown class="pull-right" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>操作一</el-dropdown-item>
                <el-dropdown-item>操作二</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          这是内容

        </el-card>
      </el-col>
      <el-col :xs="24" :md="24" :lg="24" :xl="12">
        <el-card class="el-card--hover no-border">
          <div slot="header" class="clearfix">
            <span>销售额类别占比</span>

            <el-button-group class="pull-right">
              <el-button type="primary" size="mini">全部</el-button>
              <el-button type="primary" size="mini">门票</el-button>
              <el-button type="primary" size="mini">保险</el-button>
              <el-button type="primary" size="mini">装备</el-button>
            </el-button-group>
          </div>

          这是内容

        </el-card>
      </el-col>
    </el-row>

  </ui-page>
</template>

<script type="application/ecmascript">
  export default {}
</script>

<style scoped>
  .chart-card {
    position: relative;
  }

  .chart-card__meta {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    position: relative;
    line-height: 22px;
    height: 22px;
  }

  .chart-card__actions {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }

  .chart-card__number {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 4px;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
  }

  .chart-card__content {
    margin-bottom: 12px;
    position: relative;
    width: 100%;
  }

  .chart-card__footer {
    border-top: 1px solid #e8e8e8;
    padding-top: 9px;
    margin-top: 8px;
  }
</style>
