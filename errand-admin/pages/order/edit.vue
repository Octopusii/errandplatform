<template>
  <view class="uni-container">
    <!-- 订单信息卡片 -->
    <view v-if="order._id" class="order-detail">
      <view class="card">
        <view class="card-header">
          <view class="card-title">订单信息</view>
          <uni-tag :text="statusText(order.status)" :type="statusTagType(order.status)" size="normal"></uni-tag>
        </view>
        <view class="info-grid">
          <view class="info-item">
            <view class="info-label">订单ID</view>
            <view class="info-value">{{ order._id }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">订单类型</view>
            <view class="info-value">{{ order.order_type === 'send' ? '帮我送' : '帮我买' }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">用户ID</view>
            <view class="info-value">{{ order.uid }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">创建时间</view>
            <view class="info-value">
              <uni-dateformat :date="order.create_time"></uni-dateformat>
            </view>
          </view>
          <view class="info-item">
            <view class="info-label">订单金额</view>
            <view class="info-value">¥{{ order.price || 0 }}</view>
          </view>
          <view class="info-item" v-if="order.order_type === 'buy'">
            <view class="info-label">预估商品价格</view>
            <view class="info-value">¥{{ order.estimated_price || 0 }}</view>
          </view>
          <view class="info-item" v-if="order.order_type === 'buy'">
            <view class="info-label">配送费</view>
            <view class="info-value">¥{{ order.delivery_fee || 0 }}</view>
          </view>
          <view class="info-item" v-if="order.order_type === 'buy'">
            <view class="info-label">购买模式</view>
            <view class="info-value">{{ order.purchase_mode === 'fixed' ? '指定商家' : '就近购买' }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">骑手</view>
            <view class="info-value">{{ order.rider_name || '未分配' }}{{ order.rider_id ? ' (' + order.rider_id + ')' : '' }}</view>
          </view>
        </view>
      </view>

      <!-- 配送信息卡片 -->
      <view class="card" v-if="order.order_type === 'send'">
        <view class="card-title">配送信息</view>
        <view class="info-grid">
          <view class="info-item info-item--full">
            <view class="info-label">取件地址</view>
            <view class="info-value">{{ order.pickup_address || '-' }}</view>
          </view>
          <view class="info-item info-item--full">
            <view class="info-label">收货地址</view>
            <view class="info-value">{{ order.delivery_address || '-' }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">物品类型</view>
            <view class="info-value">{{ order.item_type || '-' }}</view>
          </view>
          <view class="info-item">
            <view class="info-label">物品重量</view>
            <view class="info-value">{{ order.item_weight || '-' }} kg</view>
          </view>
          <view class="info-item">
            <view class="info-label">取件时间</view>
            <view class="info-value">{{ order.pickup_time || '-' }}</view>
          </view>
        </view>
      </view>

      <!-- 代购信息卡片 -->
      <view class="card" v-if="order.order_type === 'buy'">
        <view class="card-title">代购信息</view>
        <view class="info-grid">
          <view class="info-item info-item--full">
            <view class="info-label">物品描述</view>
            <view class="info-value">{{ order.item_description || '-' }}</view>
          </view>
          <view class="info-item info-item--full">
            <view class="info-label">收货地址</view>
            <view class="info-value">{{ order.delivery_address || '-' }}</view>
          </view>
          <view class="info-item info-item--full" v-if="order.remark">
            <view class="info-label">备注</view>
            <view class="info-value">{{ order.remark }}</view>
          </view>
        </view>
      </view>

      <!-- 配送信息补充 -->
      <view class="card" v-if="order.order_type === 'buy' && order.remark">
        <view class="card-title">备注</view>
        <view class="info-value" style="padding: 8px 0;">{{ order.remark }}</view>
      </view>

      <!-- 操作区 -->
      <view class="card" v-if="canChangeStatus(order.status)">
        <view class="card-title">订单操作</view>
        <view class="action-buttons">
          <button
            v-for="s in nextStatuses"
            :key="s.value"
            class="uni-button"
            :type="s.type"
            @click="changeStatus(s.value)"
          >标记为{{ s.label }}</button>
        </view>
        <view class="rider-form" style="margin-top: 16px;">
          <view class="form-row">
            <view class="form-label">骑手ID</view>
            <input class="form-input" v-model="riderId" placeholder="输入骑手ID" />
          </view>
          <view class="form-row">
            <view class="form-label">骑手姓名</view>
            <input class="form-input" v-model="riderName" placeholder="输入骑手姓名" />
          </view>
          <button class="uni-button" type="primary" size="mini" @click="assignRider">保存骑手信息</button>
        </view>
      </view>

      <view class="back-btn-wrap">
        <button class="uni-button" style="width: 100px;" @click="goBack">返回列表</button>
      </view>
    </view>

    <view v-else class="loading-state">加载中...</view>
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
  const STATUS_TRANSITION = {
    pending: ['accepted', 'cancelled'],
    accepted: ['in_progress', 'cancelled'],
    in_progress: ['completed', 'cancelled'],
    completed: [],
    cancelled: []
  }
  const NEXT_STATUS_META = {
    accepted: { label: '已接单', type: 'info' },
    in_progress: { label: '配送中', type: 'primary' },
    completed: { label: '已完成', type: 'success' },
    cancelled: { label: '已取消', type: 'warn' }
  }

  export default {
    data() {
      return {
        order: {},
        riderId: '',
        riderName: ''
      }
    },
    computed: {
      nextStatuses() {
        const current = this.order.status
        if (!current) return []
        const allowed = STATUS_TRANSITION[current] || []
        return allowed.map(v => ({ value: v, label: NEXT_STATUS_META[v].label, type: NEXT_STATUS_META[v].type }))
      }
    },
    onLoad(e) {
      if (e.id) {
        this.loadOrder(e.id)
      }
    },
    methods: {
      statusText(s) { return STATUS_MAP[s] || s },
      statusTagType(s) { return STATUS_TAG[s] || 'default' },
      canChangeStatus(s) { return s !== 'completed' && s !== 'cancelled' },

      async loadOrder(id) {
        uni.showLoading({ mask: true })
        try {
          const res = await db.collection('order').doc(id).get()
          if (res.result.data && res.result.data.length) {
            this.order = res.result.data[0]
            this.riderId = this.order.rider_id || ''
            this.riderName = this.order.rider_name || ''
          }
        } catch (e) {
          uni.showModal({ content: e.message, showCancel: false })
        } finally {
          uni.hideLoading()
        }
      },

      async changeStatus(newStatus) {
        uni.showLoading({ mask: true })
        try {
          await db.collection('order').doc(this.order._id).update({ status: newStatus })
          uni.showToast({ title: '状态已更新' })
          this.order.status = newStatus
          this.getOpenerEventChannel().emit('refreshData')
        } catch (e) {
          uni.showModal({ content: '更新失败: ' + e.message, showCancel: false })
        } finally {
          uni.hideLoading()
        }
      },

      async assignRider() {
        if (!this.riderId && !this.riderName) {
          uni.showToast({ title: '请填写骑手信息', icon: 'none' })
          return
        }
        uni.showLoading({ mask: true })
        try {
          await db.collection('order').doc(this.order._id).update({
            rider_id: this.riderId,
            rider_name: this.riderName
          })
          uni.showToast({ title: '骑手信息已更新' })
          this.order.rider_id = this.riderId
          this.order.rider_name = this.riderName
          this.getOpenerEventChannel().emit('refreshData')
        } catch (e) {
          uni.showModal({ content: '操作失败: ' + e.message, showCancel: false })
        } finally {
          uni.hideLoading()
        }
      },

      goBack() {
        this.getOpenerEventChannel().emit('refreshData')
        uni.navigateBack()
      }
    }
  }
</script>

<style>
  .order-detail {
    padding: 16px;
  }

  .card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 12px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .info-item--full {
    grid-column: span 2;
  }

  .info-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 2px;
  }

  .info-value {
    font-size: 14px;
    color: #303133;
    word-break: break-all;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .rider-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-row {
    display: flex;
    align-items: center;
  }

  .form-label {
    width: 80px;
    font-size: 13px;
    color: #606266;
    flex-shrink: 0;
  }

  .form-input {
    flex: 1;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 13px;
  }

  .back-btn-wrap {
    text-align: center;
    margin-top: 16px;
  }

  .loading-state {
    text-align: center;
    padding: 40px;
    color: #909399;
  }
</style>
