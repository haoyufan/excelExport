const auditStates = [
  { value: 1, label: '待审核', type: 'info' },
  { value: 2, label: '已通过', type: 'success' },
  { value: 3, label: '已驳回', type: 'danger' }
]

const clubLevels = [
  { value: 10, label: '免费会员' },
  { value: 11, label: '组团会员' },
  { value: 12, label: '地接会员' }
]

const districts = []

export default {
  namespaced: true,
  state: { auditStates, clubLevels, districts }
}
