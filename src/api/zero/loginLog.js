import request from '@/utils/request'

export function getLoginLogList(query) {
  return request({
    url: '/zero/loginLog/list',
    method: 'get',
    params: query
  })
}
