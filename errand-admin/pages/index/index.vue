<template>
  <view class="dashboard">
    <view class="uni-container">
      <view class="stat-cards">
        <view class="stat-card">
          <view class="stat-card__value">{{ stats.total }}</view>
          <view class="stat-card__label">总订单数</view>
        </view>
        <view class="stat-card stat-card--warning">
          <view class="stat-card__value">{{ stats.pending }}</view>
          <view class="stat-card__label">待接单</view>
        </view>
        <view class="stat-card stat-card--info">
          <view class="stat-card__value">{{ stats.accepted }}</view>
          <view class="stat-card__label">已接单</view>
        </view>
        <view class="stat-card stat-card--primary">
          <view class="stat-card__value">{{ stats.in_progress }}</view>
          <view class="stat-card__label">配送中</view>
        </view>
        <view class="stat-card stat-card--success">
          <view class="stat-card__value">{{ stats.completed }}</view>
          <view class="stat-card__label">已完成</view>
        </view>
        <view class="stat-card stat-card--danger">
          <view class="stat-card__value">{{ stats.cancelled }}</view>
          <view class="stat-card__label">已取消</view>
        </view>
      </view>

      <view class="revenue-section">
        <view class="section-title">今日收入</view>
        <view class="revenue-value">¥{{ revenue.toFixed(2) }}</view>
      </view>

      <view class="recent-orders">
        <view class="section-header">
          <view class="section-title">最近订单</view>
          <view class="section-link" @click="goOrderList">查看全部</view>
        </view>
        <uni-table :loading="loading" border stripe emptyText="暂无订单数据">
          <uni-tr>
            <uni-th align="center">订单ID</uni-th>
            <uni-th align="center">类型</uni-th>
            <uni-th align="center">状态</uni-th>
            <uni-th align="center">金额</uni-th>
            <uni-th align="center">骑手</uni-th>
            <uni-th align="center">时间</uni-th>
          </uni-tr>
          <uni-tr v-for="item in recentOrders" :key="item._id">
            <uni-td align="center">
              <view class="order-id" @click="goOrderDetail(item._id)">{{ item._id }}</view>
            </uni-td>
            <uni-td align="center">{{ item.order_type === 'send' ? '帮我送' : '帮我买' }}</uni-td>
            <uni-td align="center">
              <uni-tag :type="statusTagType(item.status)" :text="statusText(item.status)" size="small"></uni-tag>
            </uni-td>
            <uni-td align="center">¥{{ item.price || 0 }}</uni-td>
            <uni-td align="center">{{ item.rider_name || '-' }}</uni-td>
            <uni-td align="center">
              <uni-dateformat :threshold="[0, 3600000]" :date="item.create_time"></uni-dateformat>
            </uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>
  </view>
</template>

<script>
  const db = uniCloud.database()
  const STATUS_MAP = {
    pending: '待接单',
    accepted: '已接单',
    in_progress: '配送中',
    completed: '已完成',
    cancelled: '已取消'
  }
  const STATUS_TAG = {
    pending: 'warning',
    accepted: 'info',
    in_progress: 'primary',
    completed: 'success',
    cancelled: 'danger'
  }

  export default {
    data() {
      return {
        stats: {
          total: 0,
          pending: 0,
          accepted: 0,
          in_progress: 0,
          completed: 0,
          cancelled: 0
        },
        revenue: 0,
        recentOrders: [],
        loading: false
      }
    },
    onReady() {
      this.loadData()
    },
    methods: {
      statusText(status) {
        return STATUS_MAP[status] || status
      },
      statusTagType(status) {
        return STATUS_TAG[status] || 'default'
      },
      async loadData() {
        this.loading = true
        try {
          await Promise.all([
            this.loadStats(),
            this.loadRevenue(),
            this.loadRecentOrders()
          ])
        } finally {
          this.loading = false
        }
      },
      async loadStats() {
        const statuses = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled']
        const counts = await Promise.all(
          statuses.map(s =>
            db.collection('order').where({ status: s }).count()
          )
        )
        let total = 0
        statuses.forEach((s, i) => {
          const c = counts[i].result ? counts[i].result.total : 0
          this.stats[s] = c
          total += c
        })
        this.stats.total = total
      },
      async loadRevenue() {
        const now = new Date()
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
        const res = await db.collection('order')
          .where({
            status: 'completed',
            create_time: db.command.gte(todayStart)
          })
          .field('price')
          .get()
        this.revenue = (res.result.data || []).reduce((sum, o) => sum + (o.price || 0), 0)
      },
      async loadRecentOrders() {
        const res = await db.collection('order')
          .orderBy('create_time', 'desc')
          .limit(10)
          .get()
        this.recentOrders = res.result.data || []
      },
      goOrderList() {
        uni.navigateTo({ url: '/pages/order/list' })
      },
      goOrderDetail(id) {
        uni.navigateTo({ url: '/pages/order/edit?id=' + id })
      }
    }
  }
</script>

<style>
  .dashboard {
    padding: 16px;
  }

  .stat-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px 16px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #909399;
  }

  .stat-card--warning {
    border-left-color: #e6a23c;
  }

  .stat-card--info {
    border-left-color: #909399;
  }

  .stat-card--primary {
    border-left-color: #409eff;
  }

  .stat-card--success {
    border-left-color: #67c23a;
  }

  .stat-card--danger {
    border-left-color: #f56c6c;
  }

  .stat-card__value {
    font-size: 28px;
    font-weight: 700;
    color: #303133;
    line-height: 1.2;
  }

  .stat-card__label {
    font-size: 13px;
    color: #909399;
    margin-top: 6px;
  }

  .revenue-section {
    background: linear-gradient(135deg, #409eff, #337ecc);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    color: #fff;
  }

  .revenue-section .section-title {
    font-size: 14px;
    opacity: 0.9;
  }

  .revenue-value {
    font-size: 32px;
    font-weight: 700;
    margin-top: 4px;
  }

  .recent-orders {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
  }

  .section-link {
    font-size: 13px;
    color: #409eff;
    cursor: pointer;
  }

  .order-id {
    color: #409eff;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
  }
</style>
