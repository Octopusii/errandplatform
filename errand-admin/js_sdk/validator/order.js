// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "uid": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "用户ID",
    "label": "用户ID"
  },
  "order_type": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "send",
            "text": "send"
          },
          {
            "value": "buy",
            "text": "buy"
          }
        ]
      }
    ],
    "title": "订单类型",
    "label": "订单类型"
  },
  "status": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
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
        ]
      }
    ],
    "title": "订单状态",
    "defaultValue": "pending",
    "label": "订单状态"
  },
  "create_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "创建时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "创建时间"
  },
  "price": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "订单价格",
    "label": "订单价格"
  },
  "rider_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "骑手ID",
    "label": "骑手ID"
  },
  "rider_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "骑手姓名",
    "label": "骑手姓名"
  },
  "pickup_address": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "取货地址",
    "label": "取货地址"
  },
  "delivery_address": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "收货地址",
    "label": "收货地址"
  },
  "item_type": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "物品种类",
    "label": "物品种类"
  },
  "item_weight": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "物品重量",
    "label": "物品重量"
  },
  "remark": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "备注",
    "label": "备注"
  },
  "pickup_time": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "取件时间",
    "label": "取件时间"
  },
  "item_description": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "物品描述",
    "label": "物品描述"
  },
  "estimated_price": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "预估商品价格",
    "label": "预估商品价格"
  },
  "delivery_fee": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "预计配送费",
    "label": "预计配送费"
  },
  "purchase_mode": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "near",
            "text": "near"
          },
          {
            "value": "fixed",
            "text": "fixed"
          }
        ]
      }
    ],
    "title": "购买模式",
    "label": "购买模式"
  }
}

const enumConverter = {
  "order_type_valuetotext": {
    "send": "send",
    "buy": "buy"
  },
  "status_valuetotext": {
    "pending": "pending",
    "accepted": "accepted",
    "in_progress": "in_progress",
    "completed": "completed",
    "cancelled": "cancelled"
  },
  "purchase_mode_valuetotext": {
    "near": "near",
    "fixed": "fixed"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
