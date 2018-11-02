import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    Id: '@increment',
    CreationTime: '@datetime',
    DisplayName: '@first',
    Type: '@title(5, 10)',
    'SortCode|1-10': 1,
    children: [{
      Id: '@increment',
      CreationTime: '@datetime',
      DisplayName: '@first',
      Type: '@title(5, 10)',
      'SortCode|1-10': 1
    }]
  }))
}

export default {
  getList: config => {
    const { DisplayName, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (DisplayName && item.DisplayName.indexOf(DisplayName) < 0) return false
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
