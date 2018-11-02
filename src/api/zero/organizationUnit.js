import request from '@/utils/request'

export function getOrganizationUnitList(query) {
  return request({
    url: '/zero/organizationUnit/list',
    method: 'get',
    params: query
  })
}
