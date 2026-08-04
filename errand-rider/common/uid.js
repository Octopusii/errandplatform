/**
 * 获取骑手唯一标识 riderId
 * 优先从本地存储读取，若无则生成新的设备级 riderId
 * @returns {string} riderId
 */
export function getRiderId() {
	const key = 'rider_id'
	let riderId = uni.getStorageSync(key)
	if (!riderId) {
		riderId = 'r_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
		uni.setStorageSync(key, riderId)
	}
	return riderId
}
