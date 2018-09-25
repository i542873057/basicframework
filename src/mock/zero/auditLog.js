import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    Id: '@increment',
    ExecutionTime: '@datetime',
    UserName: '@first',
    ClientName: '@title(5, 10)',
    ServiceName: '@title(5, 10)',
    MethodName: '@title(5, 10)',
    'ExecutionDuration|1-10': 1,
    BrowserInfo: '我是测试数据',
    'ClientIpAddress|1': ['CN', 'US', 'JP', 'EU'],
    'Exception|1': [false, true]
  }))
}

export default {
  getList: config => {
    const { UserName, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (UserName && item.UserName.indexOf(UserName) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
