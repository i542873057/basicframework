import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    Id: '@increment',
    CreationTime: '@datetime',
    UserNameOrEmailAddress: '@first',
    ClientName: '@title(5, 10)',
    BrowserInfo: '我是测试数据',
    'ClientIpAddress|1': ['CN', 'US', 'JP', 'EU'],
    'Result|1': ['published', 'draft', 'deleted']
  }))
}

export default {
  getList: config => {
    const { UserNameOrEmailAddress, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (UserNameOrEmailAddress && item.UserNameOrEmailAddress.indexOf(UserNameOrEmailAddress) < 0) return false
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
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
