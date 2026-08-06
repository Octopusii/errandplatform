<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title">订单管理</view>
      </view>
    </view>

    <view class="uni-container">
      <!-- 状态筛选标签 -->
      <view class="status-tabs">
        <view
          v-for="tab in statusTabs"
          :key="tab.value"
          :class="['status-tab', { active: currentStatus === tab.value }]"
          @click="switchTab(tab.value)"
        >{{ tab.label }}</view>
      </view>

      <unicloud-db
        ref="udb"
        collection="order"
        :field="fieldList"
        :where="queryWhere"
        page-data="replace"
        :orderby="orderby"
        :getcount="true"
        :page-size="20"
        :page-current="1"
        v-slot:default="{ data, pagination, loading, error, options }"
        :options="options"
        loadtime="manual"
        @load="onqueryload"
      >
        <uni-table
          ref="table"
          :loading="loading"
          :emptyText="error.message || '暂无订单'"
          border stripe
        >
          <uni-tr>
            <uni-th align="center" style="width:60px">序号</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'uid')">用户ID</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.order_type_localdata" @filter-change="filterChange($event, 'order_type')">类型</uni-th>
            <uni-th align="center">状态</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'price')">金额</uni-th>
            <uni-th align="center">骑手</uni-th>
            <uni-th align="center">取件/取货地址</uni-th>
            <uni-th align="center">收货地址</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'create_time')">创建时间</uni-th>
            <uni-th align="center" style="width:200px">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, index) in data" :key="item._id">
            <uni-td align="center">{{ (pagination.current - 1) * pagination.size + index + 1 }}</uni-td>
            <uni-td align="center">{{ item.uid }}</uni-td>
            <uni-td align="center">
              <uni-tag :text="item.order_type === 'send' ? '帮我送' : '帮我买'" :type="item.order_type === 'send' ? 'primary' : 'success'" size="small"></uni-tag>
            </uni-td>
            <uni-td align="center">
              <uni-tag :text="statusText(item.status)" :type="statusTagType(item.status)" size="small"></uni-tag>
            </uni-td>
            <uni-td align="center">¥{{ item.price || 0 }}</uni-td>
            <uni-td align="center">{{ item.rider_name || '未分配' }}</uni-td>
            <uni-td align="center" class="td-address">{{ item.pickup_address || item.item_description || '-' }}</uni-td>
            <uni-td align="center" class="td-address">{{ item.delivery_address || '-' }}</uni-td>
            <uni-td align="center">
              <uni-dateformat :threshold="[0, 0]" :date="item.create_time"></uni-dateformat>
            </uni-td>
            <uni-td align="center">
              <view class="uni-group">
                <button class="uni-button" size="mini" type="primary" @click="goEdit(item._id)">详情</button>
                <button
                  v-if="canChangeStatus(item.status)"
                  class="uni-button"
                  size="mini"
                  type="warning"
                  @click="showStatusModal(item)"
                >状态</button>
                <button class="uni-button" size="mini" type="warn" @click="confirmDelete(item._id)">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count" @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>

    <!-- 状态变更弹窗 -->
    <uni-popup ref="statusPopup" type="center">
      <view class="popup-content">
        <view class="popup-title">变更订单状态</view>
        <view class="popup-body">
          <view class="current-status">
            当前状态：<uni-tag :text="statusText(editItem.status)" :type="statusTagType(editItem.status)" size="small"></uni-tag>
          </view>
          <view class="status-options">
            <view
              v-for="s in nextStatuses"
              :key="s.value"
              class="status-option"
              @click="changeStatus(s.value)"
            >
              <uni-tag :text="s.label" :type="s.type" size="normal" customStyle="padding: 8px 20px; cursor: pointer;"></uni-tag>
            </view>
          </view>
          <view class="status-divider">或</view>
          <view class="rider-assign">
            <view class="field-label">分配骑手</view>
            <input class="field-input" v-model="assignRiderName" placeholder="骑手姓名" />
            <input class="field-input" v-model="assignRiderId" placeholder="骑手ID" />
            <button class="uni-button" type="primary" size="mini" @click="assignRider">确认分配</button>
          </view>
        </view>
        <view class="popup-footer">
          <button class="uni-button" size="mini" @click="$refs.statusPopup.close()">关闭</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/order.js';

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
    cancelled: { label: '已取消', type: 'danger' }
  }
  const fieldList = 'uid,order_type,status,create_time,price,rider_id,rider_name,pickup_address,delivery_address,item_description'

  export default {
    data() {
      return {
        fieldList,
        currentStatus: '',
        queryWhere: '',
        orderby: 'create_time desc',
        statusTabs: [
          { label: '全部', value: '' },
          { label: '待接单', value: 'pending' },
          { label: '已接单', value: 'accepted' },
          { label: '配送中', value: 'in_progress' },
          { label: '已完成', value: 'completed' },
          { label: '已取消', value: 'cancelled' }
        ],
        options: {
          filterData: {
            order_type_localdata: [
              { value: 'send', text: '帮我送' },
              { value: 'buy', text: '帮我买' }
            ]
          },
          ...enumConverter
        },
        _filter: {},
        editItem: {},
        assignRiderName: '',
        assignRiderId: ''
      }
    },
    computed: {
      nextStatuses() {
        const current = this.editItem.status
        if (!current) return []
        const allowed = STATUS_TRANSITION[current] || []
        return allowed.map(v => ({ value: v, label: NEXT_STATUS_META[v].label, type: NEXT_STATUS_META[v].type }))
      }
    },
    onLoad() {
      this._filter = {}
    },
    onReady() {
      this.$refs.udb.loadData()
    },
    methods: {
      statusText(status) {
        return STATUS_MAP[status] || status
      },
      statusTagType(status) {
        return STATUS_TAG[status] || 'default'
      },
      canChangeStatus(status) {
        return status !== 'completed' && status !== 'cancelled'
      },
      switchTab(status) {
        this.currentStatus = status
        if (status) {
          this.queryWhere = { status }
        } else {
          this.queryWhere = ''
        }
        this.$refs.udb.loadData({ clear: true })
      },
      onqueryload(data) {},
      onPageChanged(e) {
        this.$refs.table.clearSelection()
        this.$refs.udb.loadData({ current: e.current })
      },
      goEdit(id) {
        uni.navigateTo({
          url: './edit?id=' + id,
          events: {
            refreshData: () => { this.$refs.udb.loadData() }
          }
        })
      },
      confirmDelete(id) {
        uni.showModal({
          title: '确认删除',
          content: '确定要删除该订单吗？此操作不可恢复。',
          success: (res) => {
            if (res.confirm) {
              db.collection('order').doc(id).remove().then(() => {
                uni.showToast({ title: '删除成功' })
                this.$refs.udb.loadData()
              })
            }
          }
        })
      },
      showStatusModal(item) {
        this.editItem = item
        this.assignRiderName = item.rider_name || ''
        this.assignRiderId = item.rider_id || ''
        this.$refs.statusPopup.open()
      },
      async changeStatus(newStatus) {
        uni.showLoading({ mask: true })
        try {
          await db.collection('order').doc(this.editItem._id).update({ status: newStatus })
          uni.showToast({ title: '状态已更新' })
          this.$refs.statusPopup.close()
          this.$refs.udb.loadData()
        } catch (e) {
          uni.showModal({ content: '更新失败: ' + e.message, showCancel: false })
        } finally {
          uni.hideLoading()
        }
      },
      async assignRider() {
        if (!this.assignRiderId && !this.assignRiderName) {
          uni.showToast({ title: '请输入骑手信息', icon: 'none' })
          return
        }
        uni.showLoading({ mask: true })
        try {
          await db.collection('order').doc(this.editItem._id).update({
            rider_id: this.assignRiderId,
            rider_name: this.assignRiderName
          })
          uni.showToast({ title: '骑手已分配' })
          this.$refs.statusPopup.close()
          this.$refs.udb.loadData()
        } catch (e) {
          uni.showModal({ content: '操作失败: ' + e.message, showCancel: false })
        } finally {
          uni.hideLoading()
        }
      },
      sortChange(e, name) {
        if (e.order) {
          this.orderby = name + ' ' + (e.order === 'ascending' ? 'asc' : 'desc')
        } else {
          this.orderby = 'create_time desc'
        }
        this.$refs.udb.loadData()
      },
      filterChange(e, name) {
        this._filter[name] = { type: e.filterType, value: e.filter }
        const newWhere = filterToWhere(this._filter, db.command)
        if (this.currentStatus) {
          newWhere.status = this.currentStatus
        }
        this.queryWhere = Object.keys(newWhere).length ? newWhere : (this.currentStatus ? { status: this.currentStatus } : '')
        this.$nextTick(() => { this.$refs.udb.loadData() })
      }
    }
  }
</script>

<style>
  .status-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .status-tab {
    padding: 6px 16px;
    border-radius: 4px;
    background: #f0f2f5;
    color: #606266;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .status-tab.active {
    background: #409eff;
    color: #fff;
  }

  .td-address {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popup-content {
    background: #fff;
    border-radius: 8px;
    width: 400px;
    max-width: 90vw;
    overflow: hidden;
  }

  .popup-title {
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ebeef5;
  }

  .popup-body {
    padding: 20px 16px;
  }

  .current-status {
    margin-bottom: 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-options {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .status-option {
    cursor: pointer;
  }

  .status-divider {
    text-align: center;
    color: #c0c4cc;
    margin: 16px 0;
    font-size: 13px;
  }

  .rider-assign {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-label {
    font-size: 13px;
    color: #606266;
    font-weight: 500;
  }

  .field-input {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 13px;
  }

  .popup-footer {
    padding: 12px 16px;
    border-top: 1px solid #ebeef5;
    text-align: right;
  }
</style>
