# 编码规范

## 云对象规范

1. 每个云对象必须有 `_before` 预处理器
2. 所有方法必须用 try-catch 捕获异常
3. 返回格式统一：`{ errCode: 0, errMsg: 'success', data: {} }`

## 数据库操作规范

1. 查询：`db.collection('order').where().get()`
2. 更新：`db.collection('order').doc(id).update()`
3. 原子操作：使用 `db.command.inc()` 或通过查询+更新结合条件判断

## 状态枚举

- pending: 待接单
- accepted: 已接单
- in\_progress: 配送中（取货中）
- completed: 已完成
- cancelled: 已取消

## 提交规范

- 骑手端：\[功能] 具体描述
- 骑手端：\[修复] 具体描述
- 骑手端：\[测试] 具体描述

