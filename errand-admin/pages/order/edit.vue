<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="uid" label="用户ID" required>
        <uni-easyinput placeholder="用户唯一标识" v-model="formData.uid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="order_type" label="订单类型" required>
        <uni-data-checkbox v-model="formData.order_type" :localdata="formOptions.order_type_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="status" label="订单状态">
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="create_time" label="创建时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.create_time"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="price" label="订单价格">
        <uni-easyinput placeholder="订单价格/配送费" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="rider_id" label="骑手ID">
        <uni-easyinput placeholder="接单骑手ID" v-model="formData.rider_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="rider_name" label="骑手姓名">
        <uni-easyinput placeholder="骑手姓名（可选）" v-model="formData.rider_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pickup_address" label="取货地址">
        <uni-easyinput placeholder="取货地址" v-model="formData.pickup_address"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="delivery_address" label="收货地址">
        <uni-easyinput placeholder="送货地址 / 收货地址" v-model="formData.delivery_address"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="item_type" label="物品种类">
        <uni-easyinput placeholder="物品种类（帮我送）" v-model="formData.item_type"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="item_weight" label="物品重量">
        <uni-easyinput placeholder="物品重量(kg)（帮我送）" type="number" v-model="formData.item_weight"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="remark" label="备注">
        <uni-easyinput placeholder="备注信息" v-model="formData.remark"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pickup_time" label="取件时间">
        <uni-easyinput placeholder="取件时间（帮我送）" v-model="formData.pickup_time"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="item_description" label="物品描述">
        <uni-easyinput placeholder="想买什么（帮我买）" v-model="formData.item_description"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="estimated_price" label="预估商品价格">
        <uni-easyinput placeholder="预估商品价格（帮我买）" type="number" v-model="formData.estimated_price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="delivery_fee" label="预计配送费">
        <uni-easyinput placeholder="预计配送费（帮我买）" type="number" v-model="formData.delivery_fee"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="purchase_mode" label="购买模式">
        <uni-data-checkbox v-model="formData.purchase_mode" :localdata="formOptions.purchase_mode_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/order.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'order';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "uid": "",
        "order_type": "",
        "status": "pending",
        "create_time": null,
        "price": null,
        "rider_id": "",
        "rider_name": "",
        "pickup_address": "",
        "delivery_address": "",
        "item_type": "",
        "item_weight": null,
        "remark": "",
        "pickup_time": "",
        "item_description": "",
        "estimated_price": null,
        "delivery_fee": null,
        "purchase_mode": ""
      }
      return {
        formData,
        formOptions: {
          "order_type_localdata": [
            {
              "value": "send",
              "text": "send"
            },
            {
              "value": "buy",
              "text": "buy"
            }
          ],
          "status_localdata": [
            {
              "value": "pending",
              "text": "pending"
            },
            {
              "value": "accepted",
              "text": "accepted"
            },
            {
              "value": "in_progress",
              "text": "in_progress"
            },
            {
              "value": "completed",
              "text": "completed"
            },
            {
              "value": "cancelled",
              "text": "cancelled"
            }
          ],
          "purchase_mode_localdata": [
            {
              "value": "near",
              "text": "near"
            },
            {
              "value": "fixed",
              "text": "fixed"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("uid,order_type,status,create_time,price,rider_id,rider_name,pickup_address,delivery_address,item_type,item_weight,remark,pickup_time,item_description,estimated_price,delivery_fee,purchase_mode").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>
