/**
 * 获取用户唯一标识 uid
 * 优先从本地存储读取，若无则生成新的设备级 uid
 * @returns {string} uid
 */
export function getUid() {
	const key = 'device_uid'
	let uid = uni.getStorageSync(key)
	if (!uid) {
		uid = Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
		uni.setStorageSync(key, uid)
	}
	return uid
}
