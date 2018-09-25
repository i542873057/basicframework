import request from '@/utils/request'

export function getAuditLogList(query) {
  return request({
    url: '/zero/auditLog/list',
    method: 'get',
    params: query
  })
}
