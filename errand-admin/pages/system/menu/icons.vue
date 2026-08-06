<template>
  <view class="icon-grid">
    <view
      v-for="name in iconList"
      :key="name"
      class="icon-item"
      @click="$emit('select', 'admin-icons-' + name)"
    >
      <view :class="['admin-icons-' + name, 'icon-display']"></view>
      <view class="icon-name">{{ name }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      tag: { type: Boolean, default: false },
      fixWindow: { type: Boolean, default: true }
    },
    emits: ['select'],
    data() {
      return {
        iconList: [
          'home', 'person', 'setting', 'order', 'file', 'image',
          'stat', 'tongji', 'yonghutongji', 'dashboard', 'qudaofenxi',
          'shebeitongji', 'xitongguanli', 'kaifashili', 'yonghutongji1',
          'shijianfenxi', 'ziyuan', 'cuowutongji', 'shijianfenxi1',
          'tongjishouye', 'yemiantongji', 'overview', 'activity',
          'trend', 'retention', 'comparison', 'stickiness', 'scene',
          'channel', 'help', 'icon', 'table', 'eco', 'doc', 'pulgin',
          'lang', 'user', 'safety', 'fl-xitong'
        ]
      }
    }
  }
</script>

<style scoped>
  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  .icon-item {
    width: 80px;
    padding: 10px 5px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .icon-item:hover {
    background: #f0f2f5;
  }

  .icon-display {
    font-size: 24px;
    color: #606266;
    margin-bottom: 4px;
  }

  .icon-name {
    font-size: 10px;
    color: #909399;
    word-break: break-all;
  }
</style>
