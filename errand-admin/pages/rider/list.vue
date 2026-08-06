<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title">骑手管理</view>
      </view>
    </view>

    <view class="uni-container">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <input class="search-input" v-model="searchText" @confirm="search" placeholder="搜索骑手姓名或ID" />
        <button class="uni-button" type="primary" size="mini" @click="search">搜索</button>
      </view>

      <uni-table :loading="loading" border stripe emptyText="暂无骑手数据">
        <uni-tr>
          <uni-th align="center">序号</uni-th>
          <uni-th align="center">骑手ID</uni-th>
          <uni-th align="center">骑手姓名</uni-th>
          <uni-th align="center">总订单数</uni-th>
          <uni-th align="center">已完成</uni-th>
          <uni-th align="center">配送中</uni-th>
          <uni-th align="center">操作</uni-th>
        </uni-tr>
        <uni-tr v-for="(rider, index) in riders" :key="rider.id">
          <uni-td align="center">{{ index + 1 }}</uni-td>
          <uni-td align="center">{{ rider.id }}</uni-td>
          <uni-td align="center">{{ rider.name || '未知' }}</uni-td>
          <uni-td align="center">{{ rider.totalOrders }}</uni-td>
          <uni-td align="center">
            <uni-tag text="已完成" type="success" size="small" customStyle="margin-right: 4px;"></uni-tag>
            {{ rider.completedOrders }}
          </uni-td>
          <uni-td align="center">{{ rider.inProgressOrders }}</uni-td>
          <uni-td align="center">
            <button class="uni-button" size="mini" type="primary" @click="viewRiderOrders(rider.id)">查看订单</button>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script>
  const db = uniCloud.database()

  export default {
    data() {
      return {
        riders: [],
        allRiders: [],
        searchText: '',
        loading: false
      }
    },
    onReady() {
      this.loadRiders()
    },
    methods: {
      async loadRiders() {
        this.loading = true
        try {
          const res = await db.collection('order')
            .where({
              rider_id: db.command.exists(true)
            })
            .field('rider_id, rider_name, status')
            .get()

          const data = res.result.data || []
          const riderMap = {}

          data.forEach(order => {
            const rid = order.rider_id
            if (!rid) return
            if (!riderMap[rid]) {
              riderMap[rid] = {
                id: rid,
                name: order.rider_name || '',
                totalOrders: 0,
                completedOrders: 0,
                inProgressOrders: 0
              }
            }
            riderMap[rid].totalOrders++
            if (order.status === 'completed') riderMap[rid].completedOrders++
            if (order.status === 'in_progress') riderMap[rid].inProgressOrders++
          })

          this.allRiders = Object.values(riderMap).sort((a, b) => b.totalOrders - a.totalOrders)
          this.riders = this.allRiders
        } catch (e) {
          uni.showModal({ content: '加载失败: ' + e.message, showCancel: false })
        } finally {
          this.loading = false
        }
      },

      search() {
        const keyword = this.searchText.trim().toLowerCase()
        if (!keyword) {
          this.riders = this.allRiders
          return
        }
        this.riders = this.allRiders.filter(r =>
          r.name.toLowerCase().includes(keyword) || r.id.toLowerCase().includes(keyword)
        )
      },

      viewRiderOrders(riderId) {
        uni.navigateTo({ url: '/pages/order/list?riderId=' + riderId })
      }
    }
  }
</script>

<style>
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .search-input {
    flex: 1;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 13px;
  }
</style>
